"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Campo, campoInputClasses } from "@/components/ui/Campo";
import { CampoHoneypot } from "@/components/ui/CampoHoneypot";
import { Moldura } from "@/components/ui/Moldura";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";
import { submitRsvp, type RsvpState } from "./actions";

const rsvpInicial: RsvpState = { status: "idle" };

export function RsvpForm() {
  const [state, formAction, pending] = useActionState(submitRsvp, rsvpInicial);
  const [attending, setAttending] = useState(true);
  const [companions, setCompanions] = useState(0);

  if (state.status === "success" || state.status === "updated") {
    return (
      <Moldura className="mx-auto max-w-md text-center">
        <p className="font-display text-lg uppercase tracking-widest text-sepia">
          {state.status === "updated" ? "Resposta atualizada!" : "Presença confirmada!"}
        </p>
        <p className="mt-4 font-corpo text-base text-sepia/80">
          {attending
            ? "Contamos com você no dia 22 de agosto. Até lá!"
            : "Sentiremos sua falta, mas obrigado por avisar."}
        </p>
      </Moldura>
    );
  }

  return (
    <form action={formAction} className="mx-auto max-w-md space-y-6">
      <CampoHoneypot />

      <Campo label="Nome completo">
        <input
          type="text"
          name="name"
          required
          maxLength={120}
          className={campoInputClasses}
          placeholder="Seu nome"
        />
      </Campo>

      <Campo label="WhatsApp">
        <input
          type="tel"
          name="phone"
          required
          maxLength={20}
          className={campoInputClasses}
          placeholder="(00) 00000-0000"
        />
      </Campo>

      <div>
        <span className="mb-2 block font-corpo text-xs uppercase tracking-widest text-sepia/70">
          Você vai?
        </span>
        <input type="hidden" name="attending" value={attending ? "sim" : "nao"} />
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAttending(true)}
            aria-pressed={attending}
            className={`border py-3 font-corpo text-sm text-sepia ${
              attending ? "border-eucalipto bg-eucalipto/30" : "border-ouro/60"
            }`}
          >
            Sim, eu vou ✓
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            aria-pressed={!attending}
            className={`border py-3 font-corpo text-sm text-sepia ${
              !attending ? "border-eucalipto bg-eucalipto/30" : "border-ouro/60"
            }`}
          >
            Não vou conseguir
          </button>
        </div>
      </div>

      {attending && (
        <>
          <div>
            <span className="mb-2 block font-corpo text-xs uppercase tracking-widest text-sepia/70">
              Acompanhantes
            </span>
            <input type="hidden" name="companions" value={companions} />
            <div className="flex items-stretch border border-ouro/60">
              <button
                type="button"
                onClick={() => setCompanions((c) => Math.max(0, c - 1))}
                className="w-14 font-display text-lg text-sepia"
                aria-label="Diminuir acompanhantes"
              >
                −
              </button>
              <div className="flex flex-1 items-center justify-center border-x border-ouro/60 font-display text-lg text-sepia">
                {companions}
              </div>
              <button
                type="button"
                onClick={() => setCompanions((c) => Math.min(5, c + 1))}
                className="w-14 font-display text-lg text-sepia"
                aria-label="Aumentar acompanhantes"
              >
                +
              </button>
            </div>
          </div>

          {companions > 0 && (
            <Campo label="Nome do(s) acompanhante(s)">
              <input
                type="text"
                name="companionNames"
                maxLength={300}
                className={campoInputClasses}
                placeholder="Nomes separados por vírgula"
              />
            </Campo>
          )}

          <Campo label="Alguma restrição alimentar? (opcional)">
            <input
              type="text"
              name="dietaryNotes"
              maxLength={300}
              className={campoInputClasses}
              placeholder="vegetariano, sem lactose..."
            />
          </Campo>
        </>
      )}

      <Campo label="Recado para o casal (opcional)">
        <textarea
          name="note"
          maxLength={500}
          rows={3}
          className={campoInputClasses}
          placeholder="Deixe um recado, se quiser"
        />
      </Campo>

      <label className="flex items-start gap-3">
        <input type="checkbox" name="privacyConsent" required className="mt-1 h-4 w-4" />
        <span className="font-corpo text-sm text-sepia">
          Autorizo o uso dos meus dados para a organização do casamento.{" "}
          <Link href="/privacidade" className="underline underline-offset-4">
            Aviso de privacidade
          </Link>
          .
        </span>
      </label>

      <TurnstileWidget />

      {state.status === "error" && (
        <p className="font-corpo text-sm text-red-800">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-sepia py-4 text-center font-corpo text-sm uppercase tracking-widest text-linho disabled:opacity-60"
      >
        {pending ? "Enviando..." : "Confirmar presença"}
      </button>
    </form>
  );
}
