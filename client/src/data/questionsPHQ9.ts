export const PHQ9_QUESTIONS = [
  "Peu d'intérêt ou de plaisir à faire les choses",
  "Se sentir abattu(e), déprimé(e) ou désespéré(e)",
  "Difficultés à s'endormir, à rester endormi(e) ou sommeil excessif",
  "Se sentir fatigué(e) ou sans énergie",
  "Perte d'appétit ou excès de nourriture",
  "Se sentir mauvais(e) ou comme un échec",
  "Difficultés de concentration",
  "Être agité(e) ou très lent(e)",
  "Pensées suicidaires ou d'automutilation",
];

export const calculatePHQ9 = (answers: number[]) => {
  const total = answers.reduce((a, b) => a + b, 0);
  let severity = "";
  if (total <= 4) severity = "Aucun ou minime";
  else if (total <= 9) severity = "Léger";
  else if (total <= 14) severity = "Modéré";
  else if (total <= 19) severity = "Modérément sévère";
  else severity = "Sévère";

  return { score: total, severity, urgent: total >= 15 || answers[8] > 0 };
};
