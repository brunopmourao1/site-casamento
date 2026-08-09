import type { ElementType, ReactNode } from "react";

type MolduraProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/**
 * Filete duplo dourado — docs/07-DESIGN.md.
 * Duas linhas finas em `--ouro`, 1px cada, a 3px de distância.
 * Recipiente padrão de cartão de presente, caixa de recado, formulário e comprovante.
 */
export function Moldura({ children, className = "", as: Tag = "div" }: MolduraProps) {
  return (
    <Tag className={`border border-ouro p-[3px] ${className}`}>
      <div className="border border-ouro p-6 h-full">{children}</div>
    </Tag>
  );
}
