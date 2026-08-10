import type { Metadata } from "next";
import { DivisorOrnamento } from "@/components/ui/DivisorOrnamento";
import { Moldura } from "@/components/ui/Moldura";

export const metadata: Metadata = {
  title: "Aviso de privacidade",
};

export default function PrivacidadePage() {
  return (
    <section className="px-4 py-16">
      <h1 className="text-center font-display text-2xl uppercase tracking-[0.18em] text-sepia">
        Aviso de privacidade
      </h1>
      <DivisorOrnamento className="mb-10 mt-4" />

      <Moldura className="mx-auto max-w-2xl">
        <div className="space-y-6 font-corpo text-base leading-relaxed text-sepia/90">
          <p>
            Este site foi feito para organizar o casamento de Mayara e Jhonatan. Os dados que
            você preenche aqui — para confirmar presença, deixar um recado ou escolher um
            presente — pertencem a você. Este aviso explica de um jeito simples o que
            coletamos, para quê, e como pedir para apagar.
          </p>

          <div>
            <h2 className="mb-2 font-display text-lg uppercase tracking-widest text-sepia">
              O que coletamos
            </h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Confirmar presença:</strong> nome, WhatsApp, quantidade de
                acompanhantes convidados, restrição alimentar e recado — todos opcionais, exceto
                nome e WhatsApp.
              </li>
              <li>
                <strong>Deixar um recado:</strong> nome e a mensagem que você escrever.
              </li>
              <li>
                <strong>Presentear:</strong> nome, e-mail (opcional, só se quiser receber o
                comprovante) e uma mensagem opcional para o casal. O pagamento em si é feito
                direto no Mercado Pago — nenhum dado de cartão passa por este site.
              </li>
            </ul>
            <p className="mt-2 text-sm text-sepia/70">
              Não pedimos CPF, endereço nem data de nascimento — não precisamos disso para
              organizar o casamento.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg uppercase tracking-widest text-sepia">
              Para que usamos
            </h2>
            <p>
              Só para organizar o casamento: fechar o número de convidados com o buffet, saber
              quem vem e quantos acompanhantes, publicar recados no mural (depois de aprovados
              pelo casal) e registrar quem presenteou o quê.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg uppercase tracking-widest text-sepia">
              Com quem compartilhamos
            </h2>
            <p>
              Com prestadores de serviço que dão suporte ao site: <strong>Mercado Pago</strong>{" "}
              (processamento do pagamento dos presentes), <strong>Vercel</strong> (hospedagem) e{" "}
              <strong>Supabase</strong> (banco de dados). Nenhum deles usa seus dados para nada
              além de fazer o site funcionar. Não vendemos nem compartilhamos dados com
              ninguém fora disso.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg uppercase tracking-widest text-sepia">
              Por quanto tempo guardamos
            </h2>
            <p>
              Depois do casamento, os dados de convidado não servem mais para nada. O plano é
              apagar confirmações de presença e dados de contato até 30 dias após a festa. O
              casal pode optar por guardar os recados do mural como recordação, sem o vínculo
              com seu contato.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-display text-lg uppercase tracking-widest text-sepia">
              Como pedir para apagar
            </h2>
            <p>
              É só chamar o casal pelo mesmo canal que você já usa para falar com eles (por
              exemplo, o WhatsApp) e pedir a remoção dos seus dados. Eles repassam o pedido para
              quem cuida do site.
            </p>
          </div>
        </div>
      </Moldura>
    </section>
  );
}
