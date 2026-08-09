import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { ConfirmacoesTable, type RsvpRow } from "./ConfirmacoesTable";

export const metadata: Metadata = { title: "Confirmações" };
// Painel sempre mostra dado ao vivo — nunca cachear estático.
export const dynamic = "force-dynamic";

async function buscarRsvps(): Promise<RsvpRow[]> {
  const { data, error } = await supabaseServer
    .from("rsvps")
    .select(
      "id, name, phone, attending, companions, companion_names, dietary_notes, note, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export default async function ConfirmacoesPage() {
  const rsvps = await buscarRsvps();
  return <ConfirmacoesTable dados={rsvps} />;
}
