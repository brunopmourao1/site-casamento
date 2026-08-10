"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Campo, campoInputClasses } from "@/components/ui/Campo";
import { CampoHoneypot } from "@/components/ui/CampoHoneypot";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";
import { enviarRecado, type RecadoState } from "./actions";

const recadoInicial: RecadoState = { status: "idle" };

export function RecadoForm() {
  const [state, formAction, pending] = useActionState(enviarRecado, recadoInicial);

  if (state.status === "success") {
    return (
      <p className="mx-auto max-w-md text-center font-corpo text-base text-sepia">
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-6">
      <CampoHoneypot />

      <p className="text-center font-display text-sm uppercase tracking-[0.18em] text-sepia">
        Deixe o seu
      </p>

      <Campo label="Seu nome">
        <input
          type="text"
          name="name"
          required
          maxLength={120}
          className={campoInputClasses}
          placeholder="Como o casal te conhece"
        />
      </Campo>

      <Campo label="Mensagem">
        <textarea
          name="body"
          required
          minLength={2}
          maxLength={500}
          rows={4}
          className={campoInputClasses}
          placeholder="Escreva algo que eles vão querer guardar"
        />
      </Campo>

      <TurnstileWidget />

      {state.status === "error" && (
        <p className="font-corpo text-sm text-red-800">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-sepia py-4 text-center font-corpo text-sm uppercase tracking-widest text-linho disabled:opacity-60"
      >
        {pending ? "Enviando..." : "Enviar recado"}
      </button>

      <p className="text-center font-corpo text-xs text-sepia/60">
        Seu recado aparece no mural depois que o casal ler.
      </p>
      <p className="text-center font-corpo text-xs text-sepia/60">
        <Link href="/privacidade" className="underline underline-offset-4">
          Aviso de privacidade
        </Link>
      </p>
    </form>
  );
}
