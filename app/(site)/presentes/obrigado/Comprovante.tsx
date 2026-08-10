"use client";

import { useState } from "react";
import Link from "next/link";
import { Moldura } from "@/components/ui/Moldura";
import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { evento, formatarDataCurta } from "@/content/evento";
import { casal } from "@/content/casal";
import { centavosParaReais } from "@/lib/money";
import { rotuloMetodoPagamento } from "@/lib/pagamento";

export type DadosComprovante = {
  giftTitle: string;
  giftKind: "single" | "quota";
  quantity: number;
  totalCents: number;
  buyerName: string;
  message: string | null;
  paidMethod: string | null;
};

export function Comprovante({ dados }: { dados: DadosComprovante }) {
  const [salvando, setSalvando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState(false);

  const detalheQuantidade =
    dados.giftKind === "quota" ? `${dados.quantity} cota${dados.quantity > 1 ? "s" : ""} · ` : "";

  async function salvarImagem() {
    setErroSalvar(false);
    setSalvando(true);
    try {
      const elemento = document.getElementById("cartao-presente");
      if (!elemento) return;
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(elemento, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `cartao-de-presente-${evento.noiva.toLowerCase()}-e-${evento.noivo.toLowerCase()}.png`;
      link.click();
    } catch {
      setErroSalvar(true);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-eucalipto text-2xl text-eucalipto">
        ✓
      </div>
      <p className="font-display text-lg uppercase tracking-widest text-sepia">
        Presente confirmado!
      </p>
      <p className="mt-2 font-corpo text-sm text-sepia/80">
        Pagamento aprovado{dados.paidMethod ? ` por ${rotuloMetodoPagamento(dados.paidMethod)}` : ""}.
        O casal já foi avisado.
      </p>

      <div className="mt-8">
        <div id="cartao-presente" className="bg-linho">
          <Moldura>
            <p className="font-corpo text-xs uppercase tracking-widest text-sepia/70">
              Cartão de presente
            </p>
            <DivisorOrnamento className="my-4" />
            <p className="font-caligrafica text-4xl leading-tight text-sepia">
              {casal.noiva.nomeCompleto.split(" ")[0]}
              <br />
              <span className="font-corpo text-sm align-middle text-sepia/70">e</span>
              <br />
              {casal.noivo.nomeCompleto.split(" ")[0]}
            </p>
            <p className="mt-6 font-corpo text-xs uppercase tracking-widest text-sepia/70">
              Receberam de
            </p>
            <p className="mt-1 font-display text-lg uppercase tracking-widest text-sepia">
              {dados.buyerName}
            </p>

            <div className="my-6 border-t border-ouro/40" />

            <p className="font-display text-lg uppercase tracking-widest text-sepia">
              {dados.giftTitle}
            </p>
            <p className="mt-2 font-corpo text-sm text-sepia/70">
              {detalheQuantidade}
              {centavosParaReais(dados.totalCents)}
            </p>

            {dados.message && (
              <>
                <div className="my-6 border-t border-ouro/40" />
                <p className="font-corpo text-sm italic text-sepia/80">“{dados.message}”</p>
              </>
            )}

            <div className="my-6 border-t border-ouro/40" />

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-ouro/60 p-1">
              <div className="flex h-full w-full items-center justify-center rounded-full border border-ouro/60">
                <span className="font-caligrafica text-lg text-ouro">M&J</span>
              </div>
            </div>
            <p className="mt-3 font-corpo text-xs uppercase tracking-widest text-sepia/60">
              {formatarDataCurta(evento)}
            </p>
          </Moldura>
        </div>
      </div>

      <button
        type="button"
        onClick={salvarImagem}
        disabled={salvando}
        className="mt-6 w-full bg-cacau py-3 font-corpo text-sm uppercase tracking-widest text-linho disabled:opacity-60"
      >
        {salvando ? "Gerando imagem…" : "Salvar imagem"}
      </button>
      {erroSalvar && (
        <p className="mt-2 font-corpo text-xs text-red-800">
          Não foi possível gerar a imagem agora. Tente novamente.
        </p>
      )}

      <Link
        href="/presentes"
        className="mt-3 block border border-ouro px-6 py-3 font-corpo text-sm uppercase tracking-widest text-sepia"
      >
        Voltar para a lista
      </Link>
    </div>
  );
}
