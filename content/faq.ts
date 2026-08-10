export type FaqItem = {
  pergunta: string;
  resposta: string;
};

export const faq: FaqItem[] = [
  {
    pergunta: "Posso levar acompanhante?",
    resposta:
      "Pode! Ao confirmar presença, informe quantos acompanhantes vêm com você.",
  },
  {
    pergunta: "Até quando posso confirmar presença?",
    resposta:
      "Até terça-feira, 18 de agosto — precisamos fechar o número com o buffet a tempo.",
  },
  {
    pergunta: "Preciso ir à festa para presentear?",
    resposta:
      "Não. A lista de presentes fica disponível no site e pode ser acessada quando quiser, mesmo sem confirmar presença.",
  },
  {
    pergunta: "O que devo vestir?",
    resposta: "TODO: dress code ainda não definido pelo casal (docs/00-STATUS.md).",
  },
  {
    pergunta: "A que horas devo chegar?",
    resposta:
      "TODO: horário de chegada sugerido ainda não confirmado pelo casal (rascunho interno: 12h30, para a cerimônia às 13h).",
  },
];
