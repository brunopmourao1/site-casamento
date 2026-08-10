"use server";

import { rsvpSchema } from "@/lib/validations";
import { normalizarTelefone } from "@/lib/telefone";
import { checkRateLimit } from "@/lib/rate-limit";
import { verificarTurnstile } from "@/lib/turnstile";
import { obterIp } from "@/lib/ip";
import { supabaseServer } from "@/lib/supabase/server";
import { enviarEmail } from "@/lib/resend";
import { emailNovaConfirmacaoPresenca } from "@/lib/emails";

export type RsvpState = {
  status: "idle" | "success" | "updated" | "error";
  message?: string;
};

export async function submitRsvp(_prev: RsvpState, formData: FormData): Promise<RsvpState> {
  // Honeypot: campo escondido que humano nunca preenche — bot que preenche é descartado
  // silenciosamente, sem avisar que foi barrado (docs/05-SEGURANCA-LGPD.md).
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success" };
  }

  const ip = await obterIp();
  const limite = checkRateLimit(`rsvp:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 });
  if (!limite.allowed) {
    return { status: "error", message: "Muitas tentativas. Tente novamente daqui a pouco." };
  }

  const attending = formData.get("attending") === "sim";

  const parsed = rsvpSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    attending,
    companions: attending ? formData.get("companions") : 0,
    companionNames: formData.get("companionNames") || undefined,
    dietaryNotes: formData.get("dietaryNotes") || undefined,
    note: formData.get("note") || undefined,
    privacyConsent: formData.get("privacyConsent") === "on",
  });

  if (!parsed.success) {
    return { status: "error", message: "Confira os campos destacados e tente de novo." };
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

  const phone = normalizarTelefone(parsed.data.phone);

  const { data: existente } = await supabaseServer
    .from("rsvps")
    .select("id")
    .eq("phone", phone)
    .maybeSingle();

  const { error } = await supabaseServer.from("rsvps").upsert(
    {
      name: parsed.data.name,
      phone,
      attending: parsed.data.attending,
      companions: parsed.data.attending ? parsed.data.companions : 0,
      companion_names: parsed.data.attending ? (parsed.data.companionNames ?? null) : null,
      dietary_notes: parsed.data.attending ? (parsed.data.dietaryNotes ?? null) : null,
      note: parsed.data.note ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "phone" }
  );

  if (error) {
    return {
      status: "error",
      message: "Não deu para salvar sua confirmação agora. Tente de novo em instantes.",
    };
  }

  const casalEmail = process.env.CASAL_EMAIL;
  if (casalEmail) {
    await enviarEmail({
      to: casalEmail,
      ...emailNovaConfirmacaoPresenca({
        name: parsed.data.name,
        attending: parsed.data.attending,
        companions: parsed.data.attending ? parsed.data.companions : 0,
        companionNames: parsed.data.attending ? (parsed.data.companionNames ?? null) : null,
        dietaryNotes: parsed.data.attending ? (parsed.data.dietaryNotes ?? null) : null,
        note: parsed.data.note ?? null,
        atualizada: Boolean(existente),
      }),
    });
  }

  return { status: existente ? "updated" : "success" };
}
