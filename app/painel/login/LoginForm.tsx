"use client";

import { useActionState } from "react";
import { campoInputClasses } from "@/components/ui/Campo";
import { TurnstileWidget } from "@/components/ui/TurnstileWidget";
import { entrarNoPainel, type LoginState } from "./actions";

const estadoInicial: LoginState = { status: "idle" };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(entrarNoPainel, estadoInicial);

  return (
    <form action={formAction} className="mx-auto max-w-sm space-y-6">
      <label className="block">
        <span className="mb-2 block font-corpo text-xs uppercase tracking-widest text-sepia/70">
          Senha do painel
        </span>
        <input
          type="password"
          name="password"
          required
          autoFocus
          className={campoInputClasses}
        />
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
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
