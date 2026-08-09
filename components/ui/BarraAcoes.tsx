import Link from "next/link";

/** Barra fixa de ações no mobile — docs/07-DESIGN.md ("topo é para navegar, rodapé é para agir"). */
export function BarraAcoes() {
  return (
    <nav
      aria-label="Ações rápidas"
      className="fixed inset-x-0 bottom-0 z-40 flex divide-x divide-ouro bg-cacau text-linho md:hidden"
    >
      <Link
        href="/presenca"
        className="flex-1 py-4 text-center font-corpo text-sm uppercase tracking-widest"
      >
        Confirmar presença
      </Link>
      <Link
        href="/presentes"
        className="flex-1 py-4 text-center font-corpo text-sm uppercase tracking-widest"
      >
        Presentes
      </Link>
    </nav>
  );
}
