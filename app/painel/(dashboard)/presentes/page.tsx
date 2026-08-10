import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { PresentesTable, type OrderRow } from "./PresentesTable";

export const metadata: Metadata = { title: "Presentes" };
// Painel sempre mostra dado ao vivo — nunca cachear estático.
export const dynamic = "force-dynamic";

async function buscarOrders(): Promise<OrderRow[]> {
  const { data, error } = await supabaseServer
    .from("orders")
    .select(
      "id, quantity, total_cents, status, buyer_name, buyer_email, message, show_name, paid_method, paid_at, created_at, gift:gifts(title, slug)"
    )
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data ?? []) as unknown as OrderRow[];
}

export default async function PresentesPainelPage() {
  const orders = await buscarOrders();
  return <PresentesTable dados={orders} />;
}
