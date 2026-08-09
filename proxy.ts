import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sessaoValida } from "@/lib/painel-auth";

// Next.js 16 renomeou middleware.ts para proxy.ts (mesmo comportamento) —
// docs/02-ARQUITETURA.md ainda cita "middleware.ts", este arquivo é o equivalente atual.
export async function proxy(request: NextRequest) {
  const cookie = request.cookies.get("painel_sessao")?.value;
  const valido = await sessaoValida(cookie);
  const noLogin = request.nextUrl.pathname === "/painel/login";

  if (!valido && !noLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/painel/login";
    return NextResponse.redirect(url);
  }

  if (valido && noLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/painel";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/painel", "/painel/:path*"],
};
