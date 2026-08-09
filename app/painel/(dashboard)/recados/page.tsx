import type { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import { aprovarRecado, excluirRecado, ocultarRecado } from "./actions";

export const metadata: Metadata = { title: "Recados" };
// Painel sempre mostra dado ao vivo — nunca cachear estático.
export const dynamic = "force-dynamic";

type Recado = {
  id: string;
  name: string;
  body: string;
  approved: boolean;
  hidden: boolean;
  created_at: string;
};

async function buscarTodosRecados(): Promise<Recado[]> {
  const { data, error } = await supabaseServer
    .from("messages")
    .select("id, name, body, approved, hidden, created_at")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

function status(recado: Recado): string {
  if (recado.hidden) return "Oculto";
  if (recado.approved) return "Publicado";
  return "Pendente";
}

export default async function RecadosPainelPage() {
  const recados = await buscarTodosRecados();

  return (
    <div>
      <h1 className="mb-6 font-display text-xl uppercase tracking-widest text-sepia">Recados</h1>

      {recados.length === 0 ? (
        <p className="font-corpo text-sm text-sepia/60">Nenhum recado recebido ainda.</p>
      ) : (
        <div className="space-y-4">
          {recados.map((recado) => (
            <div key={recado.id} className="border border-ouro/40 p-4">
              <div className="mb-2 flex items-center justify-between gap-4">
                <p className="font-corpo text-sm font-semibold text-sepia">{recado.name}</p>
                <span className="font-corpo text-xs uppercase tracking-widest text-sepia/60">
                  {status(recado)}
                </span>
              </div>
              <p className="mb-4 font-corpo text-sm text-sepia">{recado.body}</p>
              <div className="flex flex-wrap gap-3">
                {!recado.approved && (
                  <form action={aprovarRecado}>
                    <input type="hidden" name="id" value={recado.id} />
                    <button
                      type="submit"
                      className="border border-eucalipto px-3 py-1.5 font-corpo text-xs uppercase tracking-widest text-sepia"
                    >
                      Aprovar
                    </button>
                  </form>
                )}
                <form action={ocultarRecado}>
                  <input type="hidden" name="id" value={recado.id} />
                  <input type="hidden" name="hidden" value={String(recado.hidden)} />
                  <button
                    type="submit"
                    className="border border-ouro px-3 py-1.5 font-corpo text-xs uppercase tracking-widest text-sepia"
                  >
                    {recado.hidden ? "Reexibir" : "Ocultar"}
                  </button>
                </form>
                <form action={excluirRecado}>
                  <input type="hidden" name="id" value={recado.id} />
                  <button
                    type="submit"
                    className="border border-red-800/60 px-3 py-1.5 font-corpo text-xs uppercase tracking-widest text-red-800"
                  >
                    Excluir
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
