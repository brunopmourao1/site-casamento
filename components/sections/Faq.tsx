"use client";

import { useState } from "react";
import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { faq } from "@/content/faq";

export function Faq() {
  const [abertoIndex, setAbertoIndex] = useState<number | null>(null);

  return (
    <section className="bg-linho px-4 py-16">
      <h2 className="text-center font-display text-lg uppercase tracking-[0.18em] text-sepia">
        Dúvidas
      </h2>
      <DivisorOrnamento className="mb-8 mt-4" />
      <div className="mx-auto max-w-md divide-y divide-ouro/40">
        {faq.map((item, index) => {
          const expandido = abertoIndex === index;
          return (
            <div key={item.pergunta}>
              <button
                type="button"
                onClick={() => setAbertoIndex(expandido ? null : index)}
                aria-expanded={expandido}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-corpo text-sm uppercase tracking-wide text-sepia"
              >
                <span>{item.pergunta}</span>
                <span aria-hidden="true" className="text-ouro">
                  {expandido ? "−" : "+"}
                </span>
              </button>
              {expandido && (
                <p className="pb-4 font-corpo text-sm leading-relaxed text-sepia/80">
                  {item.resposta}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
