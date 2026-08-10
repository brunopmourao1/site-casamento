const ROTULOS: Record<string, string> = {
  pix: "Pix",
  credit_card: "cartão de crédito",
  debit_card: "cartão de débito",
};

/** Traduz o `paid_method` gravado pelo webhook (docs/04-PAGAMENTOS.md) para exibição. */
export function rotuloMetodoPagamento(metodo: string | null): string {
  if (!metodo) return "";
  return ROTULOS[metodo] ?? metodo;
}
