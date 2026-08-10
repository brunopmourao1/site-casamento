"use client";

import { useEffect, useState } from "react";
import { TrioItem } from "@/components/ui/Trio";
import { evento } from "@/content/evento";

type Restante = { dias: number; horas: number; minutos: number; segundos: number };

function calcularRestante(alvoIso: string): Restante {
  const diffMs = Math.max(0, new Date(alvoIso).getTime() - Date.now());
  const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diffMs / (1000 * 60)) % 60);
  const segundos = Math.floor((diffMs / 1000) % 60);
  return { dias, horas, minutos, segundos };
}

/** Contagem regressiva — calculada só no cliente para não divergir do render do servidor. */
export function Contagem() {
  const [restante, setRestante] = useState<Restante | null>(null);

  useEffect(() => {
    function atualizar() {
      setRestante(calcularRestante(evento.dataIso));
    }
    atualizar();
    const id = setInterval(atualizar, 1_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-pergaminho px-4 py-10 md:flex md:items-center md:justify-between md:px-16">
      <p className="text-center font-corpo text-xs uppercase tracking-widest text-sepia/70 md:text-left">
        Faltam
      </p>
      <div className="mx-auto mt-4 flex max-w-sm items-stretch justify-center divide-x divide-ouro md:mx-0 md:mt-0">
        <div className="flex-1 px-3">
          <TrioItem value={restante?.dias ?? "—"} label="dias" />
        </div>
        <div className="flex-1 px-3">
          <TrioItem value={restante?.horas ?? "—"} label="horas" />
        </div>
        <div className="flex-1 px-3">
          <TrioItem value={restante?.minutos ?? "—"} label="minutos" />
        </div>
        <div className="flex-1 px-3">
          <TrioItem value={restante?.segundos ?? "—"} label="segundos" />
        </div>
      </div>
      <p className="mt-6 text-center font-corpo text-xs uppercase tracking-widest text-sepia/70 md:mt-0 md:text-right">
        Confirme até {evento.rsvpFechaEmTexto}
      </p>
    </section>
  );
}
