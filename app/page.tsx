import { Contagem } from "@/components/sections/Contagem";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Historia } from "@/components/sections/Historia";
import { Local } from "@/components/sections/Local";

export default function Home() {
  return (
    <>
      <Hero />
      <Contagem />
      <Historia />
      <Local />
      <Faq />
    </>
  );
}
