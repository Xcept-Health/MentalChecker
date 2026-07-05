import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

interface FormStepProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: number) => void;
  showTutorial?: boolean;
}

const ANSWERS = [
  { label: 'Pas du tout', value: 0 },
  { label: 'Plusieurs jours', value: 1 },
  { label: 'Plus de la moitié du temps', value: 2 },
  { label: 'Presque tous les jours', value: 3 },
];

export default function SwipeCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: FormStepProps) {
  const [selected, setSelected] = useState<number | null>(null);

  // Reset selected when question changes
  useEffect(() => {
    setSelected(null);
  }, [questionNumber]);

  const handleSelect = (value: number) => {
    setSelected(value);
    // Petit délai pour voir la sélection avant de passer à la suite
    setTimeout(() => {
      onAnswer(value);
    }, 400);
  };

  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      
      {/* Header / Progress Bar */}
      <header className="w-full px-6 py-6 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
            <span>Évaluation en cours</span>
            <span>Question {questionNumber} sur {totalQuestions}</span>
          </div>
          <div className="w-full h-2 bg-muted/80 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-start items-center px-6 pt-12 pb-32">
        <div className="w-full max-w-3xl">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={questionNumber} // Re-animate on question change
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-10"
            >
              {/* Question */}
              <div>
                <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-4">
                  Question {questionNumber}
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-snug">
                  {question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-4">
                {ANSWERS.map((answer) => {
                  const isSelected = selected === answer.value;
                  return (
                    <motion.button
                      key={answer.value}
                      onClick={() => handleSelect(answer.value)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        w-full flex items-center justify-between p-6 rounded-2xl border text-left transition-all duration-200
                        ${isSelected 
                          ? 'bg-primary/5 border-primary shadow-[0_0_0_1px_var(--primary)] text-primary' 
                          : 'bg-card border-border/60 text-foreground hover:border-primary/40 hover:bg-muted/30 shadow-sm'}
                      `}
                    >
                      <span className={`text-lg md:text-xl font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                        {answer.label}
                      </span>
                      <div className={`ml-4 shrink-0 transition-colors duration-200 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                        {isSelected ? <CheckCircle2 className="w-7 h-7" /> : <Circle className="w-7 h-7 stroke-1" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
          
        </div>
      </main>

      {/* Footer Info */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border/40 py-4 px-6 z-10">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Important :</span> Répondez le plus honnêtement possible en vous basant sur les 14 derniers jours.
          </p>
        </div>
      </footer>
    </div>
  );
}