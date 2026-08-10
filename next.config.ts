import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// docs/05-SEGURANCA-LGPD.md: CSP restritiva liberando só o necessário
// (Turnstile). O checkout do Mercado Pago é redirect de página inteira
// (window.location.href), não iframe/form-action — não precisa entrar na CSP.
const cspHeader = `
  default-src 'self';
  script-src 'self' https://challenges.cloudflare.com${isDev ? " 'unsafe-eval' 'unsafe-inline'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self' https://challenges.cloudflare.com;
  frame-src https://challenges.cloudflare.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};

export default nextConfig;
