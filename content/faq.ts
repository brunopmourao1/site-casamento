export type FaqItem = {
  pergunta: string;
  resposta: string;
};

export const faq: FaqItem[] = [
  {
    pergunta: "Posso levar acompanhante?",
    resposta:
      "Só se o acompanhante também tiver sido convidado pelos noivos — não é possível levar quem não recebeu convite. Ao confirmar presença, informe quantos acompanhantes convidados vêm com você.",
  },
  {
    pergunta: "Até quando posso confirmar presença?",
    resposta:
      "Até domingo, 16 de agosto — precisamos fechar o número com o buffet a tempo.",
  },
  {
    pergunta: "Preciso ir à festa para presentear?",
    resposta:
      "Não. A lista de presentes fica disponível no site e pode ser acessada quando quiser, mesmo sem confirmar presença.",
  },
  {
    pergunta: "Preciso seguir a lista de presentes?",
    resposta: "Não, pode presentear como desejar.",
  },
  {
    pergunta: "O que devo vestir?",
    resposta: "Traje esporte fino.",
  },
  {
    pergunta: "A que horas devo chegar?",
    resposta: "Chegue no máximo até as 13h, para recepcionar os noivos.",
  },
];
