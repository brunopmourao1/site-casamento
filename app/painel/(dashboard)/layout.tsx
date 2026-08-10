import Link from "next/link";
import { sairDoPainel } from "../login/actions";

const ABAS = [
  { href: "/painel/confirmacoes", label: "Confirmações" },
  { href: "/painel/presentes", label: "Presentes" },
  { href: "/painel/recados", label: "Recados" },
];

export default function DashboardLayout({ children }: LayoutProps<"/painel">) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between border-b border-ouro/40 pb-4">
        <nav className="flex gap-6">
          {ABAS.map((aba) => (
            <Link
              key={aba.href}
              href={aba.href}
              className="font-display text-sm uppercase tracking-widest text-sepia"
            >
              {aba.label}
            </Link>
          ))}
        </nav>
        <form action={sairDoPainel}>
          <button
            type="submit"
            className="font-corpo text-xs uppercase tracking-widest text-sepia/60 underline underline-offset-4"
          >
            Sair
          </button>
        </form>
      </div>
      {children}
    </div>
  );
}
