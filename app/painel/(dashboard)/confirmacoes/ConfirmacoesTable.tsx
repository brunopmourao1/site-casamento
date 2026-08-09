"use client";

import { useMemo, useState } from "react";
import { campoInputClasses } from "@/components/ui/Campo";

export type RsvpRow = {
  id: string;
  name: string;
  phone: string;
  attending: boolean;
  companions: number;
  companion_names: string | null;
  dietary_notes: string | null;
  note: string | null;
  created_at: string;
};

function paraCsv(linhas: RsvpRow[]): string {
  const cabecalho = [
    "Nome",
    "WhatsApp",
    "Vai",
    "Acompanhantes",
    "Nomes dos acompanhantes",
    "Restrição alimentar",
    "Recado",
    "Confirmado em",
  ];

  const escapar = (valor: string) => `"${valor.replace(/"/g, '""')}"`;

  const corpo = linhas.map((linha) =>
    [
      linha.name,
      linha.phone,
      linha.attending ? "Sim" : "Não",
      String(linha.companions),
      linha.companion_names ?? "",
      linha.dietary_notes ?? "",
      linha.note ?? "",
      new Date(linha.created_at).toLocaleString("pt-BR"),
    ]
      .map(escapar)
      .join(",")
  );

  return [cabecalho.map(escapar).join(","), ...corpo].join("\r\n");
}

function baixarCsv(conteudo: string) {
  const blob = new Blob([`﻿${conteudo}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `confirmacoes-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export function ConfirmacoesTable({ dados }: { dados: RsvpRow[] }) {
  const [busca, setBusca] = useState("");

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return dados;
    return dados.filter(
      (linha) => linha.name.toLowerCase().includes(termo) || linha.phone.includes(termo)
    );
  }, [dados, busca]);

  const totais = useMemo(() => {
    const confirmados = dados.filter((l) => l.attending);
    const recusados = dados.filter((l) => !l.attending);
    const totalPessoas = confirmados.reduce((soma, l) => soma + 1 + l.companions, 0);
    return { confirmados: confirmados.length, recusados: recusados.length, totalPessoas };
  }, [dados]);

  return (
    <div>
      <h1 className="mb-6 font-display text-xl uppercase tracking-widest text-sepia">
        Confirmações
      </h1>

      <div className="mb-6 grid grid-cols-3 divide-x divide-ouro/40 border border-ouro/40 text-center">
        <div className="p-4">
          <p className="font-display text-2xl text-sepia">{totais.confirmados}</p>
          <p className="font-corpo text-xs uppercase tracking-widest text-sepia/60">Confirmados</p>
        </div>
        <div className="p-4">
          <p className="font-display text-2xl text-sepia">{totais.recusados}</p>
          <p className="font-corpo text-xs uppercase tracking-widest text-sepia/60">Recusados</p>
        </div>
        <div className="p-4">
          <p className="font-display text-2xl text-sepia">{totais.totalPessoas}</p>
          <p className="font-corpo text-xs uppercase tracking-widest text-sepia/60">
            Total de pessoas
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <input
          type="search"
          placeholder="Buscar por nome ou telefone"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className={`${campoInputClasses} max-w-xs`}
        />
        <button
          type="button"
          onClick={() => baixarCsv(paraCsv(filtrados))}
          className="border border-ouro px-4 py-2 font-corpo text-xs uppercase tracking-widest text-sepia"
        >
          Exportar CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left font-corpo text-sm text-sepia">
          <thead>
            <tr className="border-b border-ouro/40 text-xs uppercase tracking-widest text-sepia/60">
              <th className="py-2 pr-4">Nome</th>
              <th className="py-2 pr-4">WhatsApp</th>
              <th className="py-2 pr-4">Vai?</th>
              <th className="py-2 pr-4">Acompanhantes</th>
              <th className="py-2 pr-4">Restrição</th>
              <th className="py-2 pr-4">Recado</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center text-sepia/60">
                  Nenhuma confirmação encontrada.
                </td>
              </tr>
            ) : (
              filtrados.map((linha) => (
                <tr key={linha.id} className="border-b border-ouro/20 align-top">
                  <td className="py-2 pr-4">{linha.name}</td>
                  <td className="py-2 pr-4">{linha.phone}</td>
                  <td className="py-2 pr-4">{linha.attending ? "Sim" : "Não"}</td>
                  <td className="py-2 pr-4">
                    {linha.attending
                      ? `${linha.companions}${
                          linha.companion_names ? ` (${linha.companion_names})` : ""
                        }`
                      : "—"}
                  </td>
                  <td className="py-2 pr-4">{linha.dietary_notes || "—"}</td>
                  <td className="py-2 pr-4">{linha.note || "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
