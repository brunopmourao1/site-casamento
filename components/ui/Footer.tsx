import Link from "next/link";
import { evento, formatarDataCurta } from "@/content/evento";

export function Footer() {
  return (
    <footer className="bg-cacau px-6 py-12 text-center text-linho">
      <p className="font-caligrafica text-3xl leading-none">
        {evento.noiva} <span className="font-corpo text-base align-middle">e</span>{" "}
        {evento.noivo}
      </p>
      <p className="mt-3 font-corpo text-xs uppercase tracking-widest text-linho/70">
        {formatarDataCurta(evento)} · {evento.local.nome}
      </p>
      <Link
        href="/privacidade"
        className="mt-6 inline-block font-corpo text-xs uppercase tracking-widest text-linho/70 underline underline-offset-4"
      >
        Aviso de privacidade
      </Link>
    </footer>
  );
}
