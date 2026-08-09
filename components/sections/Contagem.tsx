"use client";

import { useEffect, useState } from "react";
import { Trio, TrioItem } from "@/components/ui/Trio";
import { evento } from "@/content/evento";

type Restante = { dias: number; horas: number; minutos: number };

function calcularRestante(alvoIso: string): Restante {
  const diffMs = Math.max(0, new Date(alvoIso).getTime() - Date.now());
  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diffMs / (1000 * 60)) % 60);
  return { dias, horas, minutos };
}

/** Contagem regressiva — calculada só no cliente para não divergir do render do servidor. */
export function Contagem() {
  const [restante, setRestante] = useState<Restante | null>(null);

  useEffect(() => {
    function atualizar() {
      setRestante(calcularRestante(evento.dataIso));
    }
    atualizar();
    const id = setInterval(atualizar, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-pergaminho px-4 py-10 md:flex md:items-center md:justify-between md:px-16">
      <p className="text-center font-corpo text-xs uppercase tracking-widest text-sepia/70 md:text-left">
        Faltam
      </p>
      <Trio
        className="mx-auto mt-4 max-w-xs md:mx-0 md:mt-0"
        columns={[
          <TrioItem key="d" value={restante?.dias ?? "—"} label="dias" />,
          <TrioItem key="h" value={restante?.horas ?? "—"} label="horas" />,
          <TrioItem key="m" value={restante?.minutos ?? "—"} label="minutos" />,
        ]}
      />
      <p className="mt-6 text-center font-corpo text-xs uppercase tracking-widest text-sepia/70 md:mt-0 md:text-right">
        Confirme até 18 de agosto
      </p>
    </section>
  );
}
