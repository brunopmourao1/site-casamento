/** Dinheiro sempre em centavos no banco e no código — formatação só na apresentação. */
export function centavosParaReais(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
