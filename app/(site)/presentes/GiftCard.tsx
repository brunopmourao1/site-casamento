import Link from "next/link";
import { Moldura } from "@/components/ui/Moldura";
import { centavosParaReais } from "@/lib/money";

export type Gift = {
  id: string;
  slug: string;
  title: string;
  description: string;
  price_cents: number;
  kind: "single" | "quota";
  quota_total: number | null;
  quota_sold: number;
  jaPresenteado: boolean;
};

export function GiftCard({ gift }: { gift: Gift }) {
  const esgotado =
    gift.kind === "single" ? gift.jaPresenteado : (gift.quota_total ?? 0) <= gift.quota_sold;

  return (
    <Moldura>
      <h2 className="font-display text-lg uppercase tracking-widest text-sepia">{gift.title}</h2>
      <p className="mt-3 font-corpo text-sm text-sepia/80">{gift.description}</p>

      {gift.kind === "quota" && gift.quota_total && (
        <div className="mt-4">
          <div className="h-1.5 w-full bg-pergaminho">
            <div
              className="h-1.5 bg-musgo"
              style={{
                width: `${Math.min(100, (gift.quota_sold / gift.quota_total) * 100)}%`,
              }}
            />
          </div>
          <p className="mt-2 font-corpo text-xs uppercase tracking-widest text-sepia/60">
            {gift.quota_sold} de {gift.quota_total} cotas · cota de{" "}
            {centavosParaReais(gift.price_cents)}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-end justify-between">
        <p className="font-display text-2xl text-sepia">{centavosParaReais(gift.price_cents)}</p>
        {esgotado ? (
          <span className="font-corpo text-xs uppercase tracking-widest text-sepia/50">
            Já presenteado ✓
          </span>
        ) : (
          <Link
            href={`/presentes/${gift.slug}`}
            className="font-corpo text-xs uppercase tracking-widest text-sepia underline underline-offset-4"
          >
            Presentear
          </Link>
        )}
      </div>
    </Moldura>
  );
}
