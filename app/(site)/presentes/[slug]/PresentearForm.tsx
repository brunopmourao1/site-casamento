"use client";

import { useState } from "react";
import { Campo, campoInputClasses } from "@/components/ui/Campo";
import { CampoHoneypot } from "@/components/ui/CampoHoneypot";
import { centavosParaReais } from "@/lib/money";

type Gift = {
  id: string;
  kind: "single" | "quota";
  priceCents: number;
  quotaTotal: number | null;
  quotaSold: number;
};

export function PresentearForm({ gift }: { gift: Gift }) {
  const [quantidade, setQuantidade] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const cotasRestantes =
    gift.kind === "quota" && gift.quotaTotal !== null
      ? gift.quotaTotal - gift.quotaSold
      : Infinity;

  async function aoEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro(null);

    const formData = new FormData(e.currentTarget);
    if (formData.get("website")) return; // honeypot

    setEnviando(true);
    try {
      const resposta = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          giftId: gift.id,
          quantity: gift.kind === "quota" ? quantidade : 1,
          buyerName: formData.get("buyerName"),
          buyerEmail: formData.get("buyerEmail") || "",
          message: formData.get("message") || "",
          showName: formData.get("showName") === "on",
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.error ?? "Não foi possível continuar. Tente de novo.");
        setEnviando(false);
        return;
      }

      window.location.href = dados.init_point;
    } catch {
      setErro("Não foi possível continuar. Tente de novo.");
      setEnviando(false);
    }
  }

  const total = gift.priceCents * (gift.kind === "quota" ? quantidade : 1);

  return (
    <form onSubmit={aoEnviar} className="mx-auto max-w-md space-y-6">
      <CampoHoneypot />

      {gift.kind === "quota" && (
        <div className="flex items-center justify-between">
          <div>
            <span className="mb-2 block font-corpo text-xs uppercase tracking-widest text-sepia/70">
              Quantas cotas
            </span>
            <div className="flex items-stretch border border-ouro/60">
              <button
                type="button"
                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                className="w-14 font-display text-lg text-sepia"
                aria-label="Diminuir cotas"
              >
                −
              </button>
              <div className="flex w-14 items-center justify-center border-x border-ouro/60 font-display text-lg text-sepia">
                {quantidade}
              </div>
              <button
                type="button"
                onClick={() => setQuantidade((q) => Math.min(10, cotasRestantes, q + 1))}
                className="w-14 font-display text-lg text-sepia"
                aria-label="Aumentar cotas"
              >
                +
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="font-corpo text-xs uppercase tracking-widest text-sepia/70">Total</p>
            <p className="font-display text-2xl text-sepia">{centavosParaReais(total)}</p>
          </div>
        </div>
      )}

      <Campo label="Seu nome">
        <input
          type="text"
          name="buyerName"
          required
          maxLength={120}
          className={campoInputClasses}
          placeholder="Seu nome"
        />
      </Campo>

      <Campo label="E-mail (opcional)">
        <input
          type="email"
          name="buyerEmail"
          maxLength={200}
          className={campoInputClasses}
          placeholder="Para receber o comprovante"
        />
      </Campo>

      <Campo label="Um recado para o casal">
        <textarea
          name="message"
          maxLength={300}
          rows={3}
          className={campoInputClasses}
          placeholder="Se quiser, deixe uma mensagem"
        />
      </Campo>

      <label className="flex items-center gap-3">
        <input type="checkbox" name="showName" defaultChecked className="h-4 w-4" />
        <span className="font-corpo text-sm text-sepia">
          Mostrar meu nome na lista de quem presenteou
        </span>
      </label>

      {erro && <p className="font-corpo text-sm text-red-800">{erro}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-sepia py-4 text-center font-corpo text-sm uppercase tracking-widest text-linho disabled:opacity-60"
      >
        {enviando ? "Preparando pagamento..." : "Ir para o pagamento"}
      </button>

      <p className="text-center font-corpo text-xs text-sepia/60">
        Pix ou cartão de crédito · pagamento processado pelo Mercado Pago
      </p>
    </form>
  );
}
