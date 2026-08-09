import type { Metadata } from "next";
import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { RamoEucalipto } from "@/components/ui/RamoEucalipto";
import { evento } from "@/content/evento";
import { RsvpForm } from "./RsvpForm";

export const metadata: Metadata = {
  title: "Confirmar presença",
};

export default function PresencaPage() {
  return (
    <section className="relative overflow-hidden px-4 py-16">
      <RamoEucalipto className="pointer-events-none absolute -right-6 top-0 h-32 w-32 text-eucalipto opacity-15" />
      <h1 className="text-center font-display text-2xl uppercase tracking-[0.18em] text-sepia">
        Confirmar presença
      </h1>
      <DivisorOrnamento className="mb-8 mt-4" />
      <p className="mx-auto mb-10 max-w-md text-center font-corpo text-base text-sepia">
        Contamos com a sua presença! Confirme até{" "}
        <strong className="font-semibold">{evento.rsvpFechaEmTexto}</strong>, que é quando
        fechamos o número com o buffet.
      </p>
      <RsvpForm />
    </section>
  );
}
