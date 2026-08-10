"use client";

import { useMemo, useState } from "react";
import { campoInputClasses } from "@/components/ui/Campo";
import { centavosParaReais } from "@/lib/money";
import { rotuloMetodoPagamento } from "@/lib/pagamento";

export type OrderRow = {
  id: string;
  quantity: number;
  total_cents: number;
  status: "pending" | "paid" | "failed" | "expired" | "refunded";
  buyer_name: string;
  buyer_email: string | null;
  message: string | null;
  show_name: boolean;
  paid_method: string | null;
  paid_at: string | null;
  created_at: string;
  gift: { title: string; slug: string } | null;
};

const STATUS_LABEL: Record<OrderRow["status"], string> = {
  pending: "Pendente",
  paid: "Pago",
  failed: "Falhou",
  expired: "Expirado",
  refunded: "Estornado",
};

export function PresentesTable({ dados }: { dados: OrderRow[] }) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return dados;
    return dados.filter(
      (linha) =>
        linha.buyer_name.toLowerCase().includes(termo) ||
        (linha.gift?.title.toLowerCase().includes(termo) ?? false)
    );
  }, [dados, busca]);

  const totais = useMemo(() => {
    const pagos = dados.filter((l) => l.status === "paid");
    const pendentes = dados.filter((l) => l.status === "pending");
    const totalArrecadadoCents = pagos.reduce((soma, l) => soma + l.total_cents, 0);
    return { pagos: pagos.length, pendentes: pendentes.length, totalArrecadadoCents };
  }, [dados]);

  return (
    <div>
      <h1 className="mb-6 font-display text-xl uppercase tracking-widest text-sepia">
        Presentes
      </h1>

      <div className="mb-6 grid grid-cols-3 divide-x divide-ouro/40 border border-ouro/40 text-center">
        <div className="p-4">
          <p className="font-display text-2xl text-sepia">{totais.pagos}</p>
          <p className="font-corpo text-xs uppercase tracking-widest text-sepia/60">Pagos</p>
        </div>
        <div className="p-4">
          <p className="font-display text-2xl text-sepia">{totais.pendentes}</p>
          <p className="font-corpo text-xs uppercase tracking-widest text-sepia/60">Pendentes</p>
        </div>
        <div className="p-4">
          <p className="font-display text-2xl text-sepia">
            {centavosParaReais(totais.totalArrecadadoCents)}
          </p>
          <p className="font-corpo text-xs uppercase tracking-widest text-sepia/60">
            Total arrecadado
          </p>
        </div>
      </div>

      <input
        type="search"
        placeholder="Buscar por quem presenteou ou pelo presente"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className={`${campoInputClasses} mb-4 max-w-xs`}
      />

      <div className="overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left font-corpo text-sm text-sepia">
          <thead>
            <tr className="border-b border-ouro/40 text-xs uppercase tracking-widest text-sepia/60">
              <th className="py-2 pr-4">Presente</th>
              <th className="py-2 pr-4">Quem presenteou</th>
              <th className="py-2 pr-4">Qtd.</th>
              <th className="py-2 pr-4">Valor</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Método</th>
              <th className="py-2 pr-4">Recado</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-6 text-center text-sepia/60">
                  Nenhum presente encontrado.
                </td>
              </tr>
            ) : (
              filtrados.map((linha) => (
                <tr key={linha.id} className="border-b border-ouro/20 align-top">
                  <td className="py-2 pr-4">{linha.gift?.title ?? "—"}</td>
                  <td className="py-2 pr-4">
                    {linha.buyer_name}
                    {!linha.show_name && (
                      <span className="ml-1 text-xs text-sepia/60">(anônimo no site)</span>
                    )}
                  </td>
                  <td className="py-2 pr-4">{linha.quantity}</td>
                  <td className="py-2 pr-4">{centavosParaReais(linha.total_cents)}</td>
                  <td className="py-2 pr-4">{STATUS_LABEL[linha.status]}</td>
                  <td className="py-2 pr-4">
                    {linha.paid_method ? rotuloMetodoPagamento(linha.paid_method) : "—"}
                  </td>
                  <td className="py-2 pr-4">{linha.message || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
