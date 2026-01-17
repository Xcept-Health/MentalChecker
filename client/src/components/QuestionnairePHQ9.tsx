import { useState } from 'react';
import SwipeCard from './SwipeCard';
import QuestionnaireResult from './QuestionnaireResult';
import { PHQ9_QUESTIONS, calculatePHQ9 } from '../data/questionsPHQ9';

export default function QuestionnairePHQ9() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(PHQ9_QUESTIONS.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    // Passer à la question suivante
    if (currentQuestion < PHQ9_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      // Calculer et afficher les résultats
      const calculatedResult = calculatePHQ9(newAnswers);
      setResult(calculatedResult);
      setSubmitted(true);
    }
  };

  if (submitted && result) {
    return (
      <QuestionnaireResult
        score={result.score}
        maxScore={27}
        severity={result.severity}
        urgent={result.urgent}
        questionnaireName="PHQ-9"
        onRestart={() => {
          setCurrentQuestion(0);
          setAnswers(new Array(PHQ9_QUESTIONS.length).fill(-1));
          setSubmitted(false);
          setResult(null);
        }}
      />
    );
  }

  return (
    <SwipeCard
      question={PHQ9_QUESTIONS[currentQuestion]}
      questionNumber={currentQuestion + 1}
      totalQuestions={PHQ9_QUESTIONS.length}
      onAnswer={handleAnswer}
    />
  );
}
