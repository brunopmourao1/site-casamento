"use client";

import { useState } from "react";
import { GiftCard, type Gift } from "./GiftCard";

type GiftComCategoria = Gift & { category: string | null };

const CATEGORIAS = [
  { valor: "simbolico", label: "Simbólicos" },
  { valor: "lua_de_mel", label: "Lua de mel" },
  { valor: "casa_nova", label: "Casa nova" },
];

export function ListaPresentes({ gifts }: { gifts: GiftComCategoria[] }) {
  const [categoria, setCategoria] = useState("simbolico");

  const filtrados = gifts.filter((g) => g.category === categoria);
  const livres = gifts.filter((g) => g.category === "livre");

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.valor}
            type="button"
            onClick={() => setCategoria(cat.valor)}
            className={`border px-4 py-2 font-corpo text-xs uppercase tracking-widest ${
              categoria === cat.valor
                ? "border-eucalipto bg-eucalipto/30 text-sepia"
                : "border-ouro/60 text-sepia"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-md space-y-6">
        {filtrados.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
        ))}
        {livres.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
        ))}
      </div>
    </div>
  );
}
