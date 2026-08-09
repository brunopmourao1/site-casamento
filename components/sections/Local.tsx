import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { evento } from "@/content/evento";

export function Local() {
  return (
    <section
      id="onde-e-quando"
      className="scroll-mt-[55px] bg-pergaminho px-4 py-16 text-center md:scroll-mt-20"
    >
      <h2 className="font-display text-lg uppercase tracking-[0.18em] text-sepia">
        {evento.local.nome}
      </h2>
      <DivisorOrnamento className="mb-6 mt-4" />
      <p className="font-corpo text-base text-sepia">{evento.local.endereco}</p>
      <p className="font-corpo text-base text-sepia">{evento.local.bairro}</p>
      <a
        href={evento.local.mapaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block border border-ouro px-6 py-3 font-corpo text-xs uppercase tracking-widest text-sepia"
      >
        Ver no mapa
      </a>
      <div className="mx-auto mt-8 max-w-sm space-y-2 font-corpo text-sm text-sepia/80">
        <p>
          {evento.horarioChegadaSugerido
            ? `Chegue por volta das ${evento.horarioChegadaSugerido} — a cerimônia começa às ${evento.horario}.`
            : "TODO: horário de chegada sugerido ainda não confirmado pelo casal."}
        </p>
        <p>{evento.avisoSinalFraco}</p>
      </div>
    </section>
  );
}
