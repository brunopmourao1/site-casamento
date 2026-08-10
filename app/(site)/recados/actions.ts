"use server";

import { revalidatePath } from "next/cache";
import { recadoSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";
import { verificarTurnstile } from "@/lib/turnstile";
import { obterIp } from "@/lib/ip";
import { supabaseServer } from "@/lib/supabase/server";
import { enviarEmail } from "@/lib/resend";
import { emailNovoRecado } from "@/lib/emails";

export type RecadoState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function enviarRecado(_prev: RecadoState, formData: FormData): Promise<RecadoState> {
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success", message: "Recebemos! Seu recado aparece no mural depois que o casal ler." };
  }

  const ip = await obterIp();
  const limite = checkRateLimit(`recado:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 });
  if (!limite.allowed) {
    return { status: "error", message: "Muitas tentativas. Tente novamente daqui a pouco." };
  }

  const parsed = recadoSchema.safeParse({
    name: formData.get("name"),
    body: formData.get("body"),
  });
  if (!parsed.success) {
    return { status: "error", message: "Confira o nome e a mensagem." };
  }

  const turnstileToken = formData.get("cf-turnstile-response");
  const turnstileOk = await verificarTurnstile(
    typeof turnstileToken === "string" ? turnstileToken : null,
    ip
  );
  if (!turnstileOk) {
    return {
      status: "error",
      message: "Não foi possível confirmar que você não é um robô. Tente de novo.",
    };
  }

  const { error } = await supabaseServer.from("messages").insert({
    name: parsed.data.name,
    body: parsed.data.body,
    approved: false,
  });

  if (error) {
    return { status: "error", message: "Não deu para enviar agora. Tente de novo em instantes." };
  }

  const casalEmail = process.env.CASAL_EMAIL;
  if (casalEmail) {
    await enviarEmail({
      to: casalEmail,
      ...emailNovoRecado({ name: parsed.data.name, body: parsed.data.body }),
    });
  }

  revalidatePath("/recados");
  return {
    status: "success",
    message: "Recebemos! Seu recado aparece no mural depois que o casal ler.",
  };
}
