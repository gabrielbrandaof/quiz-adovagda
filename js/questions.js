/**
 * questions.js
 * ============
 * Edite as perguntas e opções aqui.
 * Não precisa mexer em mais nada — o quiz.js lê este arquivo automaticamente.
 *
 * ESTRUTURA DE CADA PERGUNTA:
 * {
 *   category: "Categoria visível acima da pergunta",
 *   text: "Texto da pergunta",
 *   options: ["Opção A", "Opção B", "Opção C", "Opção D"]
 * }
 *
 * As respostas definem o resultado. Se o bebê nasceu há mais de 30 dias,
 * a pessoa nunca trabalhou e nunca contribuiu para o INSS, o quiz agradece
 * a participação e informa o foco atual do atendimento.
 */

const QUESTIONS = [
  {
    id: "baby-status",
    category: "Situação do bebê",
    text: "Você está grávida ou o bebê já nasceu?",
    options: [
      "Estou grávida",
      "Meu bebê já nasceu"
    ],
    next: ["pregnancy-duration", "baby-age"]
  },
  {
    id: "pregnancy-duration",
    category: "Gestação",
    text: "De quantos meses você está?",
    options: [
      "De 1 a 3 meses",
      "De 4 a 6 meses",
      "De 7 a 9 meses"
    ],
    next: "employment"
  },
  {
    id: "baby-age",
    category: "Situação do bebê",
    text: "Há quanto tempo o seu bebê nasceu?",
    options: [
      "Há até 30 dias",
      "Há mais de 30 dias"
    ],
    next: "employment"
  },
  {
    id: "employment",
    category: "Vínculo empregatício",
    text: "Qual era a sua situação de trabalho quando engravidou?",
    options: [
      "Trabalhava com carteira assinada (CLT)",
      "Era MEI ou autônoma",
      "Estava desempregada",
      "Trabalhava sem carteira assinada",
      "Nunca trabalhei"
    ],
    next: "inss"
  },
  {
    id: "inss",
    category: "INSS",
    text: "Você contribuía para o INSS antes ou durante a gravidez?",
    options: [
      "Sim, pelo emprego com carteira",
      "Sim, contribuía como autônoma",
      "Não contribuía",
      "Não sei informar",
      "Nunca contribuí para o INSS"
    ],
    next: "benefit"
  },
  {
    id: "benefit",
    category: "Benefício",
    text: "Você já recebeu ou solicitou o salário-maternidade?",
    options: [
      "Não, não sabia que tinha direito",
      "Tentei solicitar mas tive dificuldades",
      "Recebi menos do que deveria",
      "Fui demitida durante a gravidez"
    ],
    next: "impact"
  },
  {
    id: "impact",
    category: "Seus planos",
    text: "Se você soubesse hoje que pode receber até R$ 6.484, o que mudaria na sua vida?",
    options: [
      "Quitaria dívidas e organizaria as contas",
      "Investiria no futuro do meu bebê",
      "Ajudaria nas despesas de casa",
      "Faria diferença, mas ainda não sei como"
    ]
  }

];
