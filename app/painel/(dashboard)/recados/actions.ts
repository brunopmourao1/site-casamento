"use server";

import { revalidatePath } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";

async function revalidarMural() {
  revalidatePath("/recados");
  revalidatePath("/painel/recados");
}

export async function aprovarRecado(formData: FormData) {
  const id = String(formData.get("id"));
  await supabaseServer.from("messages").update({ approved: true }).eq("id", id);
  await revalidarMural();
}

export async function ocultarRecado(formData: FormData) {
  const id = String(formData.get("id"));
  const hidden = formData.get("hidden") === "true";
  await supabaseServer.from("messages").update({ hidden: !hidden }).eq("id", id);
  await revalidarMural();
}

export async function excluirRecado(formData: FormData) {
  const id = String(formData.get("id"));
  await supabaseServer.from("messages").delete().eq("id", id);
  await revalidarMural();
}
