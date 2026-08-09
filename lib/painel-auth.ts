/**
 * Assinatura da sessão do painel via HMAC (Web Crypto — funciona tanto no
 * runtime edge do proxy.ts quanto no Node.js dos Server Actions).
 * docs/02-ARQUITETURA.md: cookie httpOnly, assinado, validade 7 dias.
 */

const encoder = new TextEncoder();

async function obterChave(segredo: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(segredo),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function paraBase64Url(bytes: ArrayBuffer): string {
  const binario = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(binario).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Compara duas strings sem atalho de tamanho variável (evita timing attack simples). */
export function compararConstante(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diferenca = 0;
  for (let i = 0; i < a.length; i++) {
    diferenca |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diferenca === 0;
}

async function assinar(payload: string): Promise<string> {
  const secret = process.env.PAINEL_COOKIE_SECRET;
  if (!secret) throw new Error("PAINEL_COOKIE_SECRET não definida");
  const chave = await obterChave(secret);
  const assinatura = await crypto.subtle.sign("HMAC", chave, encoder.encode(payload));
  return paraBase64Url(assinatura);
}

/** Gera o valor do cookie de sessão: `<expiraEmMs>.<assinatura>`. */
export async function assinarSessao(expiraEmMs: number): Promise<string> {
  const payload = String(expiraEmMs);
  const assinatura = await assinar(payload);
  return `${payload}.${assinatura}`;
}

/** Valida o cookie de sessão: assinatura correta e ainda dentro da validade. */
export async function sessaoValida(cookieValue: string | undefined | null): Promise<boolean> {
  if (!cookieValue) return false;
  const [payload, assinatura] = cookieValue.split(".");
  if (!payload || !assinatura) return false;

  const expiraEmMs = Number(payload);
  if (!Number.isFinite(expiraEmMs) || Date.now() > expiraEmMs) return false;

  try {
    const esperado = await assinar(payload);
    return compararConstante(esperado, assinatura);
  } catch {
    return false;
  }
}
