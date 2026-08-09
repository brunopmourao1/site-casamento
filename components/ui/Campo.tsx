import type { ReactNode } from "react";

export const campoInputClasses =
  "w-full border border-ouro/60 bg-linho px-4 py-3 font-corpo text-base text-sepia placeholder:text-sepia/40 focus:border-ouro focus:outline-none";

type CampoProps = {
  label: string;
  children: ReactNode;
  className?: string;
  erro?: string;
};

/** Label em caixa alta + campo — padrão dos formulários públicos (mockups/06, 07). */
export function Campo({ label, children, className = "", erro }: CampoProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block font-corpo text-xs uppercase tracking-widest text-sepia/70">
        {label}
      </span>
      {children}
      {erro ? <span className="mt-1 block font-corpo text-xs text-red-800">{erro}</span> : null}
    </label>
  );
}
