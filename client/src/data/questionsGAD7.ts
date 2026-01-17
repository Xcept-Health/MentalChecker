export const GAD7_QUESTIONS = [
  "Vous sentir nerveux(se), anxieux(se) ou tendu(e)",
  "Ne pas réussir à arrêter ou à contrôler vos inquiétudes",
  "Vous inquiéter trop au sujet de choses différentes",
  "Avoir des difficultés à vous détendre",
  "Être si agité(e) qu'il est difficile de rester tranquille",
  "Devenir facilement énervé(e) ou irritable",
  "Ressentir de la peur comme si quelque chose de terrible pouvait arriver",
];

export const calculateGAD7 = (answers: number[]) => {
  const total = answers.reduce((a, b) => a + b, 0);
  let severity = "";
  if (total <= 4) severity = "Aucune ou minime";
  else if (total <= 9) severity = "Légère";
  else if (total <= 14) severity = "Modérée";
  else severity = "Sévère";

  return { score: total, severity, urgent: total >= 10 };
};
