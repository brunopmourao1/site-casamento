export type Casal = {
  noiva: { nomeCompleto: string };
  noivo: { nomeCompleto: string };
  /** TODO: texto real do casal — bloqueador em docs/00-STATUS.md. Até 5 linhas, tom acolhedor. */
  historia: string[];
  /**
   * Recortes tratados em baixa resolução — ver assets/LEIA-ME.md.
   * TODO: substituir pelo arquivo original em alta (mín. 1600px no lado maior) antes do go-live.
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
    heroMobile: "/images/hero-placeholder.jpg",
    heroDesktop: "/images/hero-desktop-placeholder.jpg",
    historia: "/images/historia-placeholder.jpg",
  },
};
