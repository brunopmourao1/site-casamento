import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { enviarEmail } from "@/lib/resend";
import { emailDigestConfirmacoes } from "@/lib/emails";

/**
 * T26: digest diário de confirmações. Agendado via vercel.json (crons),
 * que autentica com "Authorization: Bearer $CRON_SECRET".
 */
export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && request.headers.get("authorization") !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const casalEmail = process.env.CASAL_EMAIL;
  if (!casalEmail) {
    return NextResponse.json({ sent: false, reason: "CASAL_EMAIL não configurado" });
  }

  const desde = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: novas } = await supabaseServer
    .from("rsvps")
    .select("name, attending, companions")
    .gte("created_at", desde)
    .order("created_at", { ascending: false });

  if (!novas || novas.length === 0) {
    return NextResponse.json({ sent: false, reason: "sem novidades nas últimas 24h" });
  }

  const { data: todas } = await supabaseServer.from("rsvps").select("attending, companions");
  const confirmados = (todas ?? []).filter((r) => r.attending);

  const { subject, html } = emailDigestConfirmacoes({
    novas,
    totalConfirmados: confirmados.length,
    totalRecusados: (todas ?? []).length - confirmados.length,
    totalPessoas: confirmados.reduce((soma, r) => soma + 1 + r.companions, 0),
  });

  await enviarEmail({ to: casalEmail, subject, html });

  return NextResponse.json({ sent: true, novas: novas.length });
}
