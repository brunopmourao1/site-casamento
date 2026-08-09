import { BarraAcoes } from "@/components/ui/BarraAcoes";
import { Footer } from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";

/** Chrome público: header + footer + barra fixa mobile. Não se aplica a /painel. */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-full flex-1 flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BarraAcoes />
    </div>
  );
}
