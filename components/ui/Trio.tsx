import type { ReactNode } from "react";

type TrioProps = {
  columns: [ReactNode, ReactNode, ReactNode];
  className?: string;
};

/**
 * Bloco de três colunas com divisória vertical — docs/07-DESIGN.md.
 * Ex.: "DIA 22 | ÀS 13H | AMOR, UNIÃO E UM NOVO COMEÇO" no convite.
 * Reaparece na contagem regressiva, nas informações do dia e no progresso das cotas.
 */
export function Trio({ columns, className = "" }: TrioProps) {
  return (
    <div className={`flex items-stretch justify-center divide-x divide-ouro ${className}`}>
      {columns.map((coluna, i) => (
        <div key={i} className="flex-1 flex flex-col items-center justify-center px-3 text-center">
          {coluna}
        </div>
      ))}
    </div>
  );
}

type TrioItemProps = {
  value: ReactNode;
  label: string;
  valueClassName?: string;
};

/** Coluna padrão do Trio: número grande em Cormorant light + rótulo em caixa alta. */
export function TrioItem({ value, label, valueClassName = "text-2xl" }: TrioItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={`font-display font-light text-sepia leading-none ${valueClassName}`}>
        {value}
      </span>
      <span className="font-corpo text-xs uppercase tracking-widest text-sepia/80">
        {label}
      </span>
    </div>
  );
}
