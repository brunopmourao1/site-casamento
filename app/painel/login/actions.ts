"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkRateLimit } from "@/lib/rate-limit";
import { verificarTurnstile } from "@/lib/turnstile";
import { obterIp } from "@/lib/ip";
import { assinarSessao } from "@/lib/painel-auth";

export type LoginState = { status: "idle" | "error"; message?: string };

const SESSAO_DIAS = 7;

/** Compara hashes SHA-256 em tempo constante — evita vazar tamanho/conteúdo da senha. */
function senhaCorresponde(informada: string, correta: string): boolean {
  const hashInformada = createHash("sha256").update(informada).digest();
  const hashCorreta = createHash("sha256").update(correta).digest();
  return timingSafeEqual(hashInformada, hashCorreta);
}

export async function entrarNoPainel(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const ip = await obterIp();
  const limite = checkRateLimit(`painel-login:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000 });
  if (!limite.allowed) {
    return { status: "error", message: "Muitas tentativas. Aguarde alguns minutos e tente de novo." };
  }

  const turnstileToken = formData.get("cf-turnstile-response");
  const turnstileOk = await verificarTurnstile(
    typeof turnstileToken === "string" ? turnstileToken : null,
    ip
  );
  if (!turnstileOk) {
    return { status: "error", message: "Não foi possível confirmar que você não é um robô." };
  }

  const senhaInformada = String(formData.get("password") ?? "");
  const senhaCorreta = process.env.PAINEL_PASSWORD ?? "";

  if (!senhaCorreta || !senhaCorresponde(senhaInformada, senhaCorreta)) {
    return { status: "error", message: "Senha incorreta." };
  }

  const expiraEmMs = Date.now() + SESSAO_DIAS * 24 * 60 * 60 * 1000;
  const tokenAssinado = await assinarSessao(expiraEmMs);

  (await cookies()).set("painel_sessao", tokenAssinado, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: new Date(expiraEmMs),
    path: "/",
  });

  redirect("/painel");
}

export async function sairDoPainel() {
  (await cookies()).delete("painel_sessao");
  redirect("/painel/login");
}
