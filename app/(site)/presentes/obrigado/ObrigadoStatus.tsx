"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { Moldura } from "@/components/ui/Moldura";

type Estado = "confirmando" | "confirmado" | "erro";

const INTERVALO_MS = 3000;
const TIMEOUT_MS = 60000;

const BotaoVoltar = () => (
  <Link
    href="/presentes"
    className="mt-6 inline-block border border-ouro px-6 py-3 font-corpo text-sm uppercase tracking-widest text-sepia"
  >
    Voltar para a lista
  </Link>
);

export function ObrigadoStatus({ orderId }: { orderId: string | null }) {
  const [estado, setEstado] = useState<Estado>(orderId ? "confirmando" : "erro");
  const [expirou, setExpirou] = useState(false);

  useEffect(() => {
    if (!orderId) return;

    let ativo = true;
    const inicio = Date.now();

    async function consultar() {
      try {
        const resposta = await fetch(`/api/orders/${orderId}`);
        if (resposta.ok) {
          const dados = await resposta.json();
          if (dados.status === "paid") {
            if (ativo) setEstado("confirmado");
            return;
          }
          if (["failed", "expired", "refunded"].includes(dados.status)) {
            if (ativo) setEstado("erro");
            return;
          }
        }
      } catch {
        // erro transitório de rede — tenta de novo no próximo intervalo
      }

      if (Date.now() - inicio >= TIMEOUT_MS) {
        if (ativo) {
          setExpirou(true);
          setEstado("erro");
        }
        return;
      }

      if (ativo) setTimeout(consultar, INTERVALO_MS);
    }

    consultar();
    return () => {
      ativo = false;
    };
  }, [orderId]);

  if (estado === "confirmando") {
    return (
      <Moldura className="mx-auto max-w-md text-center">
        <p className="font-display text-lg uppercase tracking-widest text-sepia">
          Confirmando pagamento
        </p>
        <DivisorOrnamento className="my-4" />
        <p className="font-corpo text-base text-sepia/80">
          Recebemos! Estamos confirmando com o banco. Pix costuma confirmar em segundos — cartão
          às vezes leva um pouco mais.
        </p>
      </Moldura>
    );
  }

  if (estado === "confirmado") {
    return (
      <Moldura className="mx-auto max-w-md text-center">
        <p className="font-display text-lg uppercase tracking-widest text-sepia">
          Presente confirmado!
        </p>
        <DivisorOrnamento className="my-4" />
        <p className="font-corpo text-base text-sepia/80">
          Muito obrigado! O casal já foi avisado.
        </p>
        <BotaoVoltar />
      </Moldura>
    );
  }

  return (
    <Moldura className="mx-auto max-w-md text-center">
      <p className="font-display text-lg uppercase tracking-widest text-sepia">Algo deu errado</p>
      <DivisorOrnamento className="my-4" />
      <p className="font-corpo text-base text-sepia/80">
        {!orderId
          ? "Não encontramos os dados desse pagamento."
          : expirou
            ? "Ainda não conseguimos confirmar seu pagamento. Se o valor foi debitado, fique tranquilo — o casal recebe a confirmação assim que o banco processar. Qualquer dúvida, chame o casal."
            : "Não conseguimos confirmar seu pagamento. Se o valor foi debitado, entre em contato com o casal."}
      </p>
      <BotaoVoltar />
    </Moldura>
  );
}
