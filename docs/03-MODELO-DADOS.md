# 03 — Modelo de dados

Postgres (Supabase). Dinheiro **sempre em centavos** (`integer`). Timestamps em `timestamptz`.

## Diagrama

```
gifts (catálogo)         orders (pedidos)        payments (eventos MP)
  id  ────────────────────  gift_id
  slug                      id ─────────────────── order_id
  title                     status                  mp_payment_id
  price_cents               buyer_name              status
  kind (single|quota)       buyer_email             amount_cents
  quota_total               show_name               method
  quota_sold                message                 raw (jsonb)
  is_active                 mp_preference_id
                            mp_payment_id

rsvps                    messages                webhook_events
  id                       id                      id
  name                     name                    mp_id (unique)
  phone (unique)           body                    received_at
  attending                approved                processed
  companions               created_at              raw (jsonb)
  companion_names
  dietary_notes
```

## SQL de criação

```sql
-- === CATÁLOGO DE PRESENTES ===
create table gifts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  description   text not null,
  image_url     text,
  price_cents   integer not null check (price_cents >= 500),
  kind          text not null default 'single' check (kind in ('single','quota')),
  quota_total   integer,
  quota_sold    integer not null default 0,
  sort_order    integer not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  constraint quota_coerente check (
    (kind = 'single' and quota_total is null) or
    (kind = 'quota'  and quota_total is not null and quota_total > 0)
  )
);

-- === PEDIDOS ===
create table orders (
  id                uuid primary key default gen_random_uuid(),
  gift_id           uuid not null references gifts(id),
  quantity          integer not null default 1 check (quantity between 1 and 10),
  unit_price_cents  integer not null,       -- congelado no momento do pedido
  total_cents       integer not null,
  status            text not null default 'pending'
                      check (status in ('pending','paid','failed','expired','refunded')),
  buyer_name        text not null,
  buyer_email       text,
  message           text,
  show_name         boolean not null default true,
  mp_preference_id  text,
  mp_payment_id     text,
  paid_method       text,                   -- 'pix' | 'credit_card'
  paid_at           timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);
create index orders_status_idx on orders(status);
create unique index orders_mp_payment_uidx on orders(mp_payment_id) where mp_payment_id is not null;

-- === PAGAMENTOS (histórico bruto, para conciliação) ===
create table payments (
  id             uuid primary key default gen_random_uuid(),
  order_id       uuid references orders(id),
  mp_payment_id  text not null unique,
  status         text not null,
  status_detail  text,
  amount_cents   integer,
  method         text,
  raw            jsonb,
  created_at     timestamptz not null default now()
);

-- === IDEMPOTÊNCIA DO WEBHOOK ===
create table webhook_events (
  id           uuid primary key default gen_random_uuid(),
  mp_id        text not null unique,   -- data.id da notificação
  received_at  timestamptz not null default now(),
  processed    boolean not null default false,
  raw          jsonb
);

-- === CONFIRMAÇÕES DE PRESENÇA ===
create table rsvps (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  phone           text not null unique,   -- só dígitos, com DDD
  attending       boolean not null,
  companions      integer not null default 0 check (companions between 0 and 5),
  companion_names text,
  dietary_notes   text,
  note            text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- === MURAL DE RECADOS ===
create table messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  body        text not null check (char_length(body) between 2 and 500),
  approved    boolean not null default false,
  hidden      boolean not null default false,
  created_at  timestamptz not null default now()
);
create index messages_public_idx on messages(approved, hidden, created_at desc);
```

## Row Level Security

O site acessa o banco **só pelo servidor**, com a service role key. Mesmo assim, ligue RLS em todas as tabelas: se um dia a chave `anon` vazar em algum lugar, ela não lê nada.

```sql
alter table gifts          enable row level security;
alter table orders         enable row level security;
alter table payments       enable row level security;
alter table webhook_events enable row level security;
alter table rsvps          enable row level security;
alter table messages       enable row level security;

-- Nenhuma policy para a role anon = ninguém lê nada pelo client.
-- A service role usada no servidor ignora RLS por natureza.
```

Se em algum momento quiser ler o catálogo direto do browser, crie **uma** policy só de leitura em `gifts` (`is_active = true`) e mais nada. `orders`, `rsvps` e `payments` nunca ficam legíveis publicamente — são nome, telefone e e-mail de convidados.

## Regras de integridade que ficam no código

- `unit_price_cents` e `total_cents` são copiados de `gifts` **no servidor**, no momento da criação do pedido.
- Presente `single` sai da lista quando existe uma order `paid` para ele.
- Presente `quota`: `quota_sold` só é incrementado quando o pagamento é confirmado, dentro da mesma transação que marca a order como `paid`. Antes disso, a cota não é reservada — em um casamento de porte pequeno o risco de dois pagarem a última cota ao mesmo tempo é baixo, e o tratamento é humano (o casal devolve ou converte em outro presente).
- Order `pending` com mais de 24h vira `expired` (limpeza no painel ou cron simples).

## Retenção

Depois do casamento os dados de convidado não servem mais para nada. Ver `05-SEGURANCA-LGPD.md` — há um script de expurgo previsto para ~30 dias após o evento.
