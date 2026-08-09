import type { Metadata } from "next";
import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { supabaseServer } from "@/lib/supabase/server";
import { ListaPresentes } from "./ListaPresentes";

export const metadata: Metadata = { title: "Lista de presentes" };

async function buscarGifts() {
  const { data: gifts, error } = await supabaseServer
    .from("gifts")
    .select("id, slug, title, description, price_cents, kind, quota_total, quota_sold, category")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !gifts) return [];

  const { data: pedidosPagos } = await supabaseServer
    .from("orders")
    .select("gift_id")
    .eq("status", "paid");

  const idsPresenteados = new Set((pedidosPagos ?? []).map((o) => o.gift_id));

  return gifts.map((gift) => ({
    ...gift,
    jaPresenteado: idsPresenteados.has(gift.id),
  }));
}

export default async function PresentesPage() {
  const gifts = await buscarGifts();

  return (
    <section className="px-4 py-16">
      <h1 className="text-center font-display text-2xl uppercase tracking-[0.18em] text-sepia">
        Lista de presentes
      </h1>
      <DivisorOrnamento className="mb-6 mt-4" />
      <p className="mx-auto mb-10 max-w-md text-center font-corpo text-base text-sepia">
        A sua presença já é o presente. Mas se quiser exagerar, escolhemos algumas coisas — e nem
        todas são sérias.
      </p>
      <ListaPresentes gifts={gifts} />
    </section>
  );
}
