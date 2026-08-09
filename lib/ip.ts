import "server-only";
import { headers } from "next/headers";

/** IP do visitante a partir do `x-forwarded-for` (Vercel) — usado no rate limit. */
export async function obterIp(): Promise<string> {
  const lista = (await headers()).get("x-forwarded-for");
  return lista?.split(",")[0]?.trim() || "desconhecido";
}
