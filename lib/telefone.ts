/** Normaliza telefone para só dígitos — chave de upsert do RSVP, docs/03-MODELO-DADOS.md. */
export function normalizarTelefone(valor: string): string {
  return valor.replace(/\D/g, "");
}
