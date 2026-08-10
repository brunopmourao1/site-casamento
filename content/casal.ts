export type Casal = {
  noiva: { nomeCompleto: string };
  noivo: { nomeCompleto: string };
  /** Texto real enviado pelo casal em 09/08 — ver mockups/historia.md. */
  historiaTitulo: string;
  historia: string[];
  /**
   * Fotos reais enviadas pelo casal em 09/08 (IMG_4232 e IMG_8012 — HEIC
   * convertido para JPEG, 1500×2000px, acima do mínimo de 1600px no lado
   * maior recomendado pelo doc 07).
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
  historiaTitulo: "Nossa história de amor 💍❤️",
  historia: [
    "Nossa história teve início em 2016, quando nossos caminhos se encontraram e começamos a escrever, juntos, uma história que se tornaria uma das mais bonitas das nossas vidas.",
    "Ao longo desses anos, descobrimos que, para definir um relacionamento verdadeiro, três palavras fazem toda a diferença: cumplicidade, amor e respeito. Foram elas que nos ensinaram a caminhar lado a lado, a celebrar as alegrias, enfrentar os desafios e, acima de tudo, escolher um ao outro todos os dias.",
    "Vivemos momentos inesquecíveis, construímos sonhos, aprendemos juntos e crescemos como casal. O tempo passou, mas o sentimento se fortaleceu, mostrando que quando existe amor verdadeiro, a caminhada se torna ainda mais especial.",
    "Hoje, depois de tantos capítulos vividos, chegamos a um dos momentos mais esperados das nossas vidas: vamos nos casar! 💍",
    "E agora, diante de tudo o que vivemos e de tudo o que ainda está por vir, temos a certeza de que este é apenas o começo de um novo capítulo — o mais bonito de todos.",
    "Estamos felizes por celebrar esse amor ao lado das pessoas que amamos e que fazem parte da nossa história.",
    "E agora, vamos escrever juntos o nosso “para sempre”. ❤️",
  ],
  fotos: {
    heroMobile: "/images/casal-hero.jpg",
    heroDesktop: "/images/casal-hero.jpg",
    historia: "/images/casal-historia.jpg",
  },
};
