"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { Moldura } from "@/components/ui/Moldura";
import { RamoEucalipto } from "@/components/ui/RamoEucalipto";
import { evento, formatarDataCurta } from "@/content/evento";

const DESTINOS_MOBILE = [
  { href: "/", label: "Início" },
  { href: "/#onde-e-quando", label: "Onde e quando" },
  { href: "/presenca", label: "Confirmar presença" },
  { href: "/presentes", label: "Lista de presentes" },
  { href: "/recados", label: "Recados" },
];

const DESTINOS_DESKTOP = [
  { href: "/", label: "Início" },
  { href: "/#onde-e-quando", label: "Onde e quando" },
  { href: "/recados", label: "Recados" },
  { href: "/presentes", label: "Presentes" },
];

/**
 * Barra superior + painel de menu — docs/07-DESIGN.md.
 * Transparente sobre o hero, sólida ao rolar; painel mobile em tela cheia;
 * versão desktop com nav horizontal e botão de confirmar presença.
 * Alvo visual: mockups/08-menu.png e mockups/09-desktop.png.
 */
export function Header() {
  const pathname = usePathname();
  const [rolado, setRolado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    function aoRolar() {
      setRolado(window.scrollY > 8);
    }
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuAberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAberto]);

  useEffect(() => {
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuAberto(false);
    }
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, []);

  const fundoSolido = rolado || menuAberto;

  return (
    <>
      <header
        className={`sticky top-0 z-40 flex h-[55px] items-center justify-between px-4 transition-colors md:h-20 md:px-8 ${
          fundoSolido
            ? "border-b border-ouro bg-linho"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="font-caligrafica text-2xl text-cacau md:text-3xl"
          aria-label="Início — Mayara e Jhonatan"
          onClick={() => setMenuAberto(false)}
        >
          M&amp;J
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
          {DESTINOS_DESKTOP.map((destino) => {
            const ativo = pathname === destino.href;
            return (
              <Link
                key={destino.href}
                href={destino.href}
                className={`border-b-2 pb-1 font-display text-sm uppercase tracking-[0.18em] text-sepia ${
                  ativo ? "border-ouro" : "border-transparent"
                }`}
              >
                {destino.label}
              </Link>
            );
          })}
          <Link
            href="/presenca"
            className="border border-ouro px-5 py-2 font-corpo text-xs uppercase tracking-widest text-sepia"
          >
            Confirmar presença
          </Link>
        </nav>

        <button
          type="button"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="menu-principal"
          onClick={() => setMenuAberto((aberto) => !aberto)}
          className="flex h-8 w-8 items-center justify-end md:hidden"
        >
          {menuAberto ? (
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span className="absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 rotate-45 bg-cacau" />
              <span className="absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 -rotate-45 bg-cacau" />
            </span>
          ) : (
            <span className="flex flex-col items-end justify-center gap-1.5" aria-hidden="true">
              <span className="h-px w-6 bg-cacau" />
              <span className="h-px w-4 bg-cacau" />
            </span>
          )}
        </button>
      </header>

      {menuAberto && (
        <div
          id="menu-principal"
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          className="fixed inset-x-0 bottom-0 top-[55px] z-30 flex flex-col justify-between overflow-y-auto bg-linho px-6 py-10 md:hidden"
        >
          <Moldura>
            <ul className="divide-y divide-ouro/60">
              {DESTINOS_MOBILE.map((destino) => (
                <li key={destino.href}>
                  <Link
                    href={destino.href}
                    onClick={() => setMenuAberto(false)}
                    className="block py-5 text-center font-display text-lg uppercase tracking-[0.18em] text-sepia"
                  >
                    {destino.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Moldura>

          <div className="relative mt-10 text-center">
            <p className="font-caligrafica text-3xl leading-none text-sepia">
              {evento.noiva}{" "}
              <span className="font-corpo text-base align-middle">e</span> {evento.noivo}
            </p>
            <DivisorOrnamento className="mt-4" />
            <p className="mt-4 font-corpo text-xs uppercase tracking-widest text-sepia/70">
              {formatarDataCurta(evento)} · {evento.local.nome}
            </p>
            <RamoEucalipto className="pointer-events-none absolute -bottom-4 right-0 h-24 w-24 text-eucalipto opacity-15" />
          </div>
        </div>
      )}
    </>
  );
}
