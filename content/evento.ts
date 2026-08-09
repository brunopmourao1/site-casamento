export type Evento = {
  noiva: string;
  noivo: string;
  /** ISO 8601 com offset de America/Sao_Paulo — nunca usar Date sem timezone explícito. */
  dataIso: string;
  diaSemana: string;
  diaMes: number;
  mesExtenso: string;
  ano: number;
  horario: string;
  timezone: "America/Sao_Paulo";
  local: {
    nome: string;
    endereco: string;
    bairro: string;
    mapaUrl: string;
  };
  /** Rascunho do doc 01 (12h30), nunca confirmado pelo casal. TODO: confirmar antes do go-live. */
  horarioChegadaSugerido: string | null;
  avisoSinalFraco: string;
  /** TODO: dress code — bloqueador em docs/00-STATUS.md, casal ainda não definiu. */
  dressCode: string | null;
  convite: {
    saudacao: string;
    frase: string;
    chamada: string;
  };
  /** Fechamento do RSVP definido no cronograma (docs/08-ROADMAP.md), não depende do casal. */
  rsvpFechaEm: string;
  rsvpFechaEmTexto: string;
};

export const evento: Evento = {
  noiva: "Mayara",
  noivo: "Jhonatan",
  dataIso: "2026-08-22T13:00:00-03:00",
  diaSemana: "sábado",
  diaMes: 22,
  mesExtenso: "agosto",
  ano: 2026,
  horario: "13h",
  timezone: "America/Sao_Paulo",
  local: {
    nome: "Portal do Valle",
    endereco: "Estrada Municipal Benedito Antônio Regagnin, 3480",
    bairro: "Bairro dos Pontos",
    mapaUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(
        "Portal do Valle, Estrada Municipal Benedito Antônio Regagnin, 3480, Bairro dos Pontos"
      ),
  },
  horarioChegadaSugerido: null,
  avisoSinalFraco:
    "O Portal do Valle fica em estrada municipal e o sinal de celular pode falhar por lá — confirme presença e escolha o presente antes do dia.",
  dressCode: null,
  convite: {
    saudacao: "Com muita alegria, convidamos você para o nosso",
    frase: "Amor, união e um novo começo",
    chamada: "Contamos com a sua presença!",
  },
  rsvpFechaEm: "2026-08-18T23:59:59-03:00",
  rsvpFechaEmTexto: "18 de agosto",
};

/** "22 . 08 . 2026" — formato usado no rodapé e no painel de menu, docs/07-DESIGN.md. */
export function formatarDataCurta(e: Evento): string {
  const dia = String(e.diaMes).padStart(2, "0");
  const mes = e.dataIso.slice(5, 7);
  const ano = e.dataIso.slice(0, 4);
  return `${dia} . ${mes} . ${ano}`;
}
