const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifica o token do Cloudflare Turnstile.
 * Se `TURNSTILE_SECRET_KEY` não estiver configurada (conta ainda não criada —
 * docs/00-STATUS.md), a verificação é pulada e sempre passa: Zod + honeypot +
 * rate limit continuam obrigatórios e já cobrem a regra inegociável do CLAUDE.md.
 * Ativa sozinha assim que a chave for cadastrada no ambiente.
 */
export async function verificarTurnstile(token: string | null, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const resposta = await fetch(SITEVERIFY_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });

  if (!resposta.ok) return false;
  const dados = (await resposta.json()) as { success?: boolean };
  return dados.success === true;
}
