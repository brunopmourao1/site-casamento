type DivisorOrnamentoProps = {
  className?: string;
};

/** Filete — coração — filete, em ouro. Usado sob os nomes e nos títulos de seção. */
export function DivisorOrnamento({ className = "" }: DivisorOrnamentoProps) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-ouro" />
      <span className="text-ouro" aria-hidden="true">
        ♥
      </span>
      <span className="h-px w-10 bg-ouro" />
    </div>
  );
}
