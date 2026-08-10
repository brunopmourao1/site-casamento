import { centavosParaReais } from "./money";
import { rotuloMetodoPagamento } from "./pagamento";

// Paleta do doc 07-DESIGN.md — e-mail não lê Tailwind, então tudo aqui é inline.
const COR_FUNDO = "#f4ede0";
const COR_CARTAO = "#fbf7ef";
const COR_TEXTO = "#4a3728";
const COR_OURO = "#b08d57";
const COR_ESCURO = "#2c1f16";

function moldura(tituloEmoji: string, titulo: string, corpoHtml: string): string {
  return `
  <div style="background:${COR_FUNDO};padding:32px 16px;font-family:Georgia,'Times New Roman',serif;color:${COR_TEXTO};">
    <div style="max-width:480px;margin:0 auto;background:${COR_CARTAO};border:1px solid ${COR_OURO};padding:28px 24px;">
      <p style="margin:0 0 4px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:${COR_OURO};">
        ${tituloEmoji} Mayara e Jhonatan
      </p>
      <h1 style="margin:0 0 20px;font-size:20px;letter-spacing:1px;text-transform:uppercase;color:${COR_TEXTO};">
        ${titulo}
      </h1>
      ${corpoHtml}
    </div>
  </div>`;
}

type DadosPresente = {
  giftTitle: string;
  quantity: number;
  giftKind: "single" | "quota";
  totalCents: number;
  buyerName: string;
  message: string | null;
  paidMethod: string | null;
};

export function emailReciboConvidado(dados: DadosPresente): { subject: string; html: string } {
  const detalheQuantidade = dados.giftKind === "quota" ? `${dados.quantity} cota · ` : "";
  const html = moldura(
    "♥",
    "Presente confirmado!",
    `
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
        Obrigado, ${dados.buyerName}! Seu pagamento${
          dados.paidMethod ? ` por ${rotuloMetodoPagamento(dados.paidMethod)}` : ""
        } foi aprovado e o casal já foi avisado.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;color:${COR_TEXTO}99;">Presente</td>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;text-align:right;">${dados.giftTitle}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;color:${COR_TEXTO}99;">Valor</td>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;text-align:right;">${detalheQuantidade}${centavosParaReais(dados.totalCents)}</td>
        </tr>
      </table>
      ${
        dados.message
          ? `<p style="margin:20px 0 0;font-size:14px;font-style:italic;color:${COR_TEXTO}cc;">“${dados.message}”</p>`
          : ""
      }
    `
  );
  return { subject: "Recebemos seu presente para Mayara e Jhonatan 💍", html };
}

export function emailAvisoPresenteCasal(dados: DadosPresente): { subject: string; html: string } {
  const detalheQuantidade = dados.giftKind === "quota" ? `${dados.quantity} cota · ` : "";
  const html = moldura(
    "🎁",
    "Vocês receberam um presente!",
    `
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;color:${COR_TEXTO}99;">Quem deu</td>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;text-align:right;">${dados.buyerName}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;color:${COR_TEXTO}99;">Presente</td>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;text-align:right;">${dados.giftTitle}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;color:${COR_TEXTO}99;">Valor</td>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;text-align:right;">${detalheQuantidade}${centavosParaReais(dados.totalCents)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;color:${COR_TEXTO}99;">Método</td>
          <td style="padding:10px 0;border-top:1px solid ${COR_OURO}55;text-align:right;">${dados.paidMethod ? rotuloMetodoPagamento(dados.paidMethod) : "—"}</td>
        </tr>
      </table>
      ${
        dados.message
          ? `<p style="margin:20px 0 0;font-size:14px;font-style:italic;color:${COR_TEXTO}cc;">“${dados.message}”</p>`
          : ""
      }
      <p style="margin:24px 0 0;font-size:12px;color:${COR_TEXTO}88;">Confira todos os presentes no painel do site.</p>
    `
  );
  return { subject: `Novo presente de ${dados.buyerName} 🎁`, html };
}

type NovaConfirmacao = {
  name: string;
  attending: boolean;
  companions: number;
};

type DadosDigest = {
  novas: NovaConfirmacao[];
  totalConfirmados: number;
  totalRecusados: number;
  totalPessoas: number;
};

export function emailDigestConfirmacoes(dados: DadosDigest): { subject: string; html: string } {
  const linhas = dados.novas
    .map(
      (n) => `
        <tr>
          <td style="padding:8px 0;border-top:1px solid ${COR_OURO}55;">${n.name}</td>
          <td style="padding:8px 0;border-top:1px solid ${COR_OURO}55;text-align:right;">
            ${n.attending ? `Vai${n.companions > 0 ? ` +${n.companions}` : ""}` : "Não vai"}
          </td>
        </tr>`
    )
    .join("");

  const html = moldura(
    "📋",
    "Confirmações das últimas 24h",
    `
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${linhas}
      </table>
      <p style="margin:20px 0 0;font-size:12px;color:${COR_ESCURO}99;">
        Total até agora: ${dados.totalConfirmados} confirmados, ${dados.totalRecusados} recusados,
        ${dados.totalPessoas} pessoas.
      </p>
    `
  );
  return {
    subject: `${dados.novas.length} nova(s) confirmação(ões) de presença`,
    html,
  };
}
