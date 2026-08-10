export type Casal = {
  noiva: { nomeCompleto: string };
  noivo: { nomeCompleto: string };
  /** TODO: texto real do casal — bloqueador em docs/00-STATUS.md. Até 5 linhas, tom acolhedor. */
  historia: string[];
  /**
   * heroMobile/heroDesktop: foto real do casal na estrada do eucaliptal — a mesma
   * escolhida no doc 07, agora em 1280×854px (era 591×386 no placeholder).
   * Ainda abaixo do mínimo de 1600px no lado maior recomendado pelo doc 07 para
   * hero em tela cheia, mas já dá para publicar.
   * historia: recorte tratado em baixa resolução — ver assets/LEIA-ME.md.
   */
  fotos: {
    heroMobile: string;
    heroDesktop: string;
    historia: string;
  };
};

export const casal: Casal = {
  noiva: { nomeCompleto: "Mayara Ketlin" },
  noivo: { nomeCompleto: "Jhonatan Alves" },
  historia: [
    "TODO: história do casal — aguardando texto do casal (docs/00-STATUS.md).",
  ],
  fotos: {
    heroMobile: "/images/casal-hero.jpg",
    heroDesktop: "/images/casal-hero.jpg",
    historia: "/images/historia-placeholder.jpg",
  },
};
