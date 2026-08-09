"use client";

import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Renderização implícita do Turnstile: o script injeta sozinho o input
 * escondido `cf-turnstile-response` dentro da div, sem callback JS —
 * funciona direto com Server Actions via FormData.
 * Some da tela até `NEXT_PUBLIC_TURNSTILE_SITE_KEY` ser configurada.
 */
export function TurnstileWidget() {
  if (!SITE_KEY) return null;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div className="cf-turnstile" data-sitekey={SITE_KEY} data-theme="light" />
    </>
  );
}
