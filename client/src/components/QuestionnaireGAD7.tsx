import { useState } from 'react';
import SwipeCard from './SwipeCard';
import QuestionnaireResult from './QuestionnaireResult';
import { GAD7_QUESTIONS, calculateGAD7 } from '../data/questionsGAD7';

export default function QuestionnaireGAD7() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(GAD7_QUESTIONS.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    // Passer à la question suivante
    if (currentQuestion < GAD7_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      // Calculer et afficher les résultats
      const calculatedResult = calculateGAD7(newAnswers);
      setResult(calculatedResult);
      setSubmitted(true);
    }
  };

  if (submitted && result) {
    return (
      <QuestionnaireResult
        score={result.score}
        maxScore={21}
        severity={result.severity}
        urgent={result.urgent}
        questionnaireName="GAD-7"
        onRestart={() => {
          setCurrentQuestion(0);
          setAnswers(new Array(GAD7_QUESTIONS.length).fill(-1));
          setSubmitted(false);
          setResult(null);
        }}
      />
    );
  }

  return (
    <SwipeCard
      question={GAD7_QUESTIONS[currentQuestion]}
      questionNumber={currentQuestion + 1}
      totalQuestions={GAD7_QUESTIONS.length}
      onAnswer={handleAnswer}
    />
  );
}
