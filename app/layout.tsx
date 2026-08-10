import type { Metadata } from "next";
import { Cormorant_Garamond, Karla, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { evento } from "@/content/evento";

// Caligráfica: só os nomes do casal e no máximo dois títulos — docs/07-DESIGN.md
const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Display/estrutura: títulos de seção e números grandes
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: false,
});

// Corpo e interface: texto corrido, formulários, botões
const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

const titulo = `${evento.noiva} e ${evento.noivo}`;
const descricao = `${evento.noiva} e ${evento.noivo} se casam em ${evento.diaMes} de ${evento.mesExtenso} de ${evento.ano}, às ${evento.horario}, no ${evento.local.nome}. Confirme presença e escolha um presente.`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${titulo} · ${evento.diaMes} de ${evento.mesExtenso} de ${evento.ano}`,
    template: `%s · ${titulo}`,
  },
  description: descricao,
  openGraph: {
    title: titulo,
    description: descricao,
    url: "/",
    siteName: titulo,
    images: ["/images/casal-hero.jpg"],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${pinyonScript.variable} ${cormorantGaramond.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
