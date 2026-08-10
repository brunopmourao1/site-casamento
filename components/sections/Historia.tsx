import Image from "next/image";
import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { RamoEucalipto } from "@/components/ui/RamoEucalipto";
import { casal } from "@/content/casal";

export function Historia() {
  return (
    <section className="relative overflow-hidden bg-linho px-4 py-16 md:px-16">
      <RamoEucalipto className="pointer-events-none absolute -right-6 top-0 h-32 w-32 text-eucalipto opacity-15" />
      <h2 className="text-center font-display text-lg uppercase tracking-[0.18em] text-sepia">
        {casal.historiaTitulo}
      </h2>
      <DivisorOrnamento className="mb-10 mt-4" />
      <div className="mx-auto max-w-md">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={casal.fotos.historia}
            alt="Mayara e Jhonatan"
            fill
            sizes="(min-width: 768px) 448px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-8 space-y-4 font-corpo text-base leading-relaxed text-sepia">
          {casal.historia.map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
