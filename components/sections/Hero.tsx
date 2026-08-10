import Image from "next/image";
import Link from "next/link";
import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { Moldura } from "@/components/ui/Moldura";
import { RamoEucalipto } from "@/components/ui/RamoEucalipto";
import { Trio, TrioItem } from "@/components/ui/Trio";
import { casal } from "@/content/casal";
import { evento } from "@/content/evento";

function Botoes({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Link
        href="/presenca"
        className="flex-1 bg-sepia py-4 text-center font-corpo text-sm uppercase tracking-widest text-linho"
      >
        Confirmar presença
      </Link>
      <Link
        href="/presentes"
        className="flex-1 border border-ouro py-4 text-center font-corpo text-sm uppercase tracking-widest text-sepia"
      >
        Lista de presentes
      </Link>
    </div>
  );
}

/** Hero — reproduz o cartão do convite. Alvo visual: mockups/01-home.png e mockups/09-desktop.png. */
export function Hero() {
  return (
    <>
      {/* Mobile: foto de fundo com o cartão do convite sobreposto */}
      <div className="relative min-h-[100svh] md:hidden">
        <Image
          src={casal.fotos.heroMobile}
          alt="Mayara e Jhonatan"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-4 bottom-6">
          <Moldura className="bg-linho/95">
            <p className="text-center font-corpo text-xs uppercase tracking-widest text-sepia/70">
              {evento.convite.saudacao}
            </p>
            <DivisorOrnamento className="my-4" />
            <p className="text-center font-caligrafica text-4xl leading-tight text-sepia">
              {evento.noiva}
              <br />
              <span className="font-corpo text-lg">e</span>
              <br />
              {evento.noivo}
            </p>
            <DivisorOrnamento className="my-4" />
            <Trio
              columns={[
                <TrioItem key="dia" value={evento.diaMes} label={evento.mesExtenso} />,
                <TrioItem key="hora" value={evento.horario} label={evento.diaSemana} />,
                <span
                  key="local"
                  className="font-display text-lg leading-tight text-sepia"
                >
                  {evento.local.nome}
                </span>,
              ]}
            />
          </Moldura>
        </div>
      </div>
      <div className="bg-linho px-4 py-6 md:hidden">
        <Botoes />
      </div>

      {/* Desktop: hero dividido em duas colunas */}
      <div className="relative hidden bg-linho md:grid md:min-h-[90svh] md:grid-cols-2">
        <div className="relative flex flex-col items-center justify-center gap-6 px-16 py-16 text-center">
          <RamoEucalipto className="pointer-events-none absolute bottom-8 left-8 h-20 w-20 -scale-x-100 text-eucalipto opacity-15" />
          <p className="font-corpo text-xs uppercase tracking-widest text-sepia/70">
            {evento.convite.saudacao}
          </p>
          <DivisorOrnamento />
          <p className="font-caligrafica text-6xl leading-[1.1] text-sepia">
            {evento.noiva}
            <br />
            <span className="ml-2 font-corpo text-xl">e</span>
            <br />
            {evento.noivo}
          </p>
          <Trio
            className="max-w-md"
            columns={[
              <TrioItem key="dia" value={evento.diaMes} label={evento.mesExtenso} />,
              <TrioItem key="hora" value={evento.horario} label={evento.diaSemana} />,
              <span key="local" className="font-display text-lg leading-tight text-sepia">
                {evento.local.nome}
              </span>,
            ]}
          />
          <Botoes className="max-w-md sm:flex-row" />
        </div>
        <div className="relative">
          <Image
            src={casal.fotos.heroDesktop}
            alt="Mayara e Jhonatan"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-4 border border-ouro">
            <div className="absolute inset-[3px] border border-ouro" />
          </div>
        </div>
      </div>
    </>
  );
}
