import type { Metadata } from "next";
import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { Moldura } from "@/components/ui/Moldura";
import { supabaseServer } from "@/lib/supabase/server";
import { RecadoForm } from "./RecadoForm";

export const metadata: Metadata = {
  title: "Recados",
};

type Recado = {
  id: string;
  name: string;
  body: string;
};

async function buscarRecadosAprovados(): Promise<Recado[]> {
  const { data, error } = await supabaseServer
    .from("messages")
    .select("id, name, body")
    .eq("approved", true)
    .eq("hidden", false)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export default async function RecadosPage() {
  const recados = await buscarRecadosAprovados();

  return (
    <section className="px-4 py-16">
      <h1 className="text-center font-display text-2xl uppercase tracking-[0.18em] text-sepia">
        Recados
      </h1>
      <DivisorOrnamento className="mb-10 mt-4" />

      <div className="mx-auto mb-12 max-w-md space-y-6">
        {recados.length === 0 ? (
          <p className="text-center font-corpo text-base text-sepia/70">
            Ainda não há recados publicados. Seja o primeiro a deixar um!
          </p>
        ) : (
          recados.map((recado) => (
            <Moldura key={recado.id}>
              <p className="text-center font-corpo text-base italic leading-relaxed text-sepia">
                &ldquo;{recado.body}&rdquo;
              </p>
              <p className="mt-4 text-center font-caligrafica text-2xl text-musgo">
                {recado.name}
              </p>
            </Moldura>
          ))
        )}
      </div>

      <RecadoForm />
    </section>
  );
}
