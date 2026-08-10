import type { Metadata } from "next";
import { ObrigadoStatus } from "./ObrigadoStatus";

export const metadata: Metadata = {
  title: "Obrigado",
};

export default async function ObrigadoPage(props: PageProps<"/presentes/obrigado">) {
  const searchParams = await props.searchParams;
  const order = searchParams.order;
  const orderId = typeof order === "string" ? order : null;

  return (
    <section className="px-4 py-16">
      <ObrigadoStatus orderId={orderId} />
    </section>
  );
}
