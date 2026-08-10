import "server-only";
import { Resend } from "resend";

// Uso exclusivo em servidor — nunca importar em Client Component.

function obterClienteResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY não definida.");
  }
  return new Resend(apiKey);
}

const REMETENTE = process.env.RESEND_FROM ?? "onboarding@resend.dev";

type EnviarEmailParams = {
  to: string;
  subject: string;
  html: string;
};

/**
 * Nunca lança — e-mail é um efeito colateral do webhook/cron, não pode derrubar
 * a confirmação do pagamento nem o digest. Falha vira log genérico (regra do
 * CLAUDE.md: nada de dado de convidado/pagamento em log de produção).
 */
export async function enviarEmail({ to, subject, html }: EnviarEmailParams): Promise<void> {
  try {
    const resend = obterClienteResend();
    const { error } = await resend.emails.send({ from: REMETENTE, to, subject, html });
    if (error) {
      console.error("Falha ao enviar e-mail (Resend):", error.name);
    }
  } catch {
    console.error("Falha ao enviar e-mail (Resend): erro inesperado.");
  }
}
