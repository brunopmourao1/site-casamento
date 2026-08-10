import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";

const idSchema = z.string().uuid();

/**
 * Só leitura — usado pela tela de retorno para consultar status.
 * Nunca escreve no banco (docs/04-PAGAMENTOS.md): quem confirma pagamento é o webhook.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const parsed = idSchema.safeParse(id);
  if (!parsed.success) {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  const { data: order } = await supabaseServer
    .from("orders")
    .select("status")
    .eq("id", parsed.data)
    .maybeSingle();

  if (!order) {
    return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ status: order.status });
}
