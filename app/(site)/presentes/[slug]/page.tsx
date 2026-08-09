import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { Moldura } from "@/components/ui/Moldura";
import { centavosParaReais } from "@/lib/money";
import { supabaseServer } from "@/lib/supabase/server";
import { PresentearForm } from "./PresentearForm";

async function buscarGift(slug: string) {
  const { data } = await supabaseServer
    .from("gifts")
    .select("id, slug, title, description, price_cents, kind, quota_total, quota_sold, is_active")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  return data;
}

export async function generateMetadata(props: PageProps<"/presentes/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const gift = await buscarGift(slug);
  return { title: gift?.title ?? "Presente" };
}

export default async function PresenteDetalhePage(props: PageProps<"/presentes/[slug]">) {
  const { slug } = await props.params;
  const gift = await buscarGift(slug);

  if (!gift) notFound();

  return (
    <section className="px-4 py-16">
      <Link
        href="/presentes"
        className="mx-auto mb-8 block max-w-md font-corpo text-xs uppercase tracking-widest text-sepia/70"
      >
        ← Voltar para a lista
      </Link>

      <Moldura className="mx-auto mb-10 max-w-md text-center">
        <h1 className="font-display text-xl uppercase tracking-widest text-sepia">
          {gift.title}
        </h1>
        <DivisorOrnamento className="my-4" />
        <p className="font-corpo text-base text-sepia/80">{gift.description}</p>

        {gift.kind === "quota" && gift.quota_total && (
          <div className="mt-6">
            <div className="h-1.5 w-full bg-pergaminho">
              <div
                className="h-1.5 bg-musgo"
                style={{
                  width: `${Math.min(100, (gift.quota_sold / gift.quota_total) * 100)}%`,
                }}
              />
            </div>
            <p className="mt-2 font-corpo text-xs uppercase tracking-widest text-sepia/60">
              {gift.quota_sold} de {gift.quota_total} cotas já garantidas
            </p>
          </div>
        )}

        {gift.kind === "single" && (
          <p className="mt-6 font-display text-2xl text-sepia">
            {centavosParaReais(gift.price_cents)}
          </p>
        )}
      </Moldura>

      <PresentearForm
        gift={{
          id: gift.id,
          kind: gift.kind as "single" | "quota",
          priceCents: gift.price_cents,
          quotaTotal: gift.quota_total,
          quotaSold: gift.quota_sold,
        }}
      />
    </section>
  );
}
