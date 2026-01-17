import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Info, ChevronRight, MousePointerClick, ChevronLeft, ChevronUp, ChevronDown, HandGrab } from 'lucide-react';

interface SwipeCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: number) => void;
  showTutorial?: boolean;
}

const ANSWERS = [
  {
    label: 'Pas du tout',
    value: 0,
    direction: 'left',
    icon: <ArrowLeft className="w-5 h-5" />,
    color: 'text-stone-700',
    bgColor: 'bg-stone-100',
    borderColor: 'border-stone-200',
    hoverColor: 'hover:bg-stone-200',
    size: 'h-[100px]'
  },
  {
    label: 'Plusieurs jours',
    value: 1,
    direction: 'up',
    icon: <ArrowUp className="w-5 h-5" />,
    color: 'text-stone-700',
    bgColor: 'bg-stone-100',
    borderColor: 'border-stone-200',
    hoverColor: 'hover:bg-stone-200',
    size: 'h-[100px]'
  },
  {
    label: 'Plus de la moitié',
    value: 2,
    direction: 'down',
    icon: <ArrowDown className="w-5 h-5" />,
    color: 'text-stone-700',
    bgColor: 'bg-stone-100',
    borderColor: 'border-stone-200',
    hoverColor: 'hover:bg-stone-200',
    size: 'h-[100px]'
  },
  {
    label: 'Presque tous les jours',
    value: 3,
    direction: 'right',
    icon: <ArrowRight className="w-5 h-5" />,
    color: 'text-stone-700',
    bgColor: 'bg-stone-100',
    borderColor: 'border-stone-200',
    hoverColor: 'hover:bg-stone-200',
    size: 'h-[100px]'
  },
];

export default function SwipeCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  showTutorial = false,
}: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [dragY, setDragY] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(showTutorial);
 
  const containerRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const startY = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Désactiver le zoom sur iOS
  useEffect(() => {
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventZoom, { passive: false });
   
    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchmove', preventZoom);
    };
  }, []);

  // Empêcher le défilement pendant le drag
  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventScroll, { passive: false });
    return () => document.removeEventListener('touchmove', preventScroll);
  }, [isDragging]);

  // Animation de tutoriel
  useEffect(() => {
    if (showTutorial && !hasInteracted) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 4000);
     
      return () => clearTimeout(timer);
    }
  }, [showTutorial, hasInteracted]);

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault();
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;
    setDragX(currentX - startX.current);
    setDragY(currentY - startY.current);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 60; // Seuil plus bas pour mobile
    const absX = Math.abs(dragX);
    const absY = Math.abs(dragY);
    // Détection du swipe avec priorité horizontale
    if (absX > threshold || absY > threshold) {
      if (absX > absY) {
        onAnswer(dragX > 0 ? 3 : 0);
      } else {
        onAnswer(dragY > 0 ? 2 : 1);
      }
      setHasInteracted(true);
      setShowSwipeHint(false);
    }
    // Reset avec animation douce
    setTimeout(() => {
      setDragX(0);
      setDragY(0);
    }, 150);
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    let clientX, clientY;
    if ('touches' in e.nativeEvent) {
      clientX = e.nativeEvent.touches[0].clientX;
      clientY = e.nativeEvent.touches[0].clientY;
    } else {
      clientX = e.nativeEvent.clientX;
      clientY = e.nativeEvent.clientY;
    }
    const rect = containerRef.current.getBoundingClientRect();
    startX.current = clientX - rect.left;
    startY.current = clientY - rect.top;
    setIsDragging(true);
    setHasInteracted(true);
    setShowSwipeHint(false);
  };

  useEffect(() => {
    if (isDragging) {
      const moveHandler = (e: MouseEvent | TouchEvent) => handleMove(e);
      const endHandler = () => handleEnd();
      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('touchmove', moveHandler as EventListener, { passive: false });
      document.addEventListener('mouseup', endHandler);
      document.addEventListener('touchend', endHandler);
      document.addEventListener('mouseleave', endHandler);
      document.addEventListener('touchcancel', endHandler);
      return () => {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('touchmove', moveHandler as EventListener);
        document.removeEventListener('mouseup', endHandler);
        document.removeEventListener('touchend', endHandler);
        document.removeEventListener('mouseleave', endHandler);
        document.removeEventListener('touchcancel', endHandler);
      };
    }
  }, [isDragging, dragX, dragY]);

  const progressPercentage = (questionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-800 font-sans safe-area-padding">
      {/* Header (mobile-friendly) */}
      <div className="w-full px-4 pt-4 pb-2 fixed top-0 left-0 right-0 bg-[#FDFCFB]/80 backdrop-blur-sm z-20 border-b border-stone-100">
        <div className="max-w-md mx-auto flex justify-end items-end">

          <motion.button
            onClick={() => setShowInstructions(!showInstructions)}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center active:bg-stone-200"
            aria-label="Instructions"
          >
            <Info className="w-4 h-4 text-stone-600" />
          </motion.button>
        </div>
       
        {/* Barre de progression  */}
        <div className="max-w-md mx-auto mt-2">
          <div className="flex justify-between items-center text-xs text-stone-600 mb-1">
            <span>Progression</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-stone-400 to-stone-600"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Instructions overlay - Optimisé mobile */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowInstructions(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-stone-200 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-xl font-light text-stone-900">Comment répondre</h3>
                <button
                  onClick={() => setShowInstructions(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center active:bg-stone-100"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4 text-stone-600">
              <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                    <MousePointerClick className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">Cliquez simplement</p>
                    <p className="text-sm mt-0.5">Sur les boutons de réponse</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                    <ChevronLeft className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">Swippez à gauche</p>
                    <p className="text-sm mt-0.5">Pour "Pas du tout"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                    <ChevronRight className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">Swippez à droite</p>
                    <p className="text-sm mt-0.5">Pour "Presque tous les jours"</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                    <ChevronUp className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">Swippez vers le haut</p>
                    <p className="text-sm mt-0.5">Pour "Plusieurs jours"</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                    <ChevronDown className="w-5 h-5 text-stone-600" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-800">Swippez vers le bas</p>
                    <p className="text-sm mt-0.5">Pour "Plus de la moitié"</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zone de carte centrée - Optimisé pour mobile */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-32">
        {/* Élément d'instruction ajouté avant la carte */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100/80 backdrop-blur-sm border border-stone-200 rounded-full">
            <span className="text-sm text-stone-600 font-medium">
            Swippez la carte ou  cliquez sur une réponse
            </span>
          </div>
        </div>

        {/* Indice de swipe animé (mobile) */}
        <AnimatePresence>
          {showSwipeHint && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex items-center gap-2 text-stone-600"
              >
                <span className="text-sm font-medium">Swippez pour répondre</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Carte interactive - Centre de l'écran */}
        <div className="w-full max-w-sm mx-auto">
          <motion.div
            ref={containerRef}
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            animate={{
              x: dragX,
              y: dragY,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="w-full touch-none select-none"
          >
            <motion.div
              ref={cardRef}
              className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col"
              animate={{
                scale: isDragging ? 1.03 : 1,
                rotate: isDragging ? dragX * 0.03 : showSwipeHint ? [0, 1, -1, 0] : 0,
              }}
              transition={showSwipeHint ? {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              } : { duration: 0.15 }}
            >
              {/* Question avec espacement optimisé */}
              <div className="mb-6 flex-1 min-h-[120px] flex items-center justify-center">
                <h2 className="text-xl font-serif font-light text-stone-900 leading-relaxed text-center px-2">
                  {question}
                </h2>
              </div>
              {/* Grille de boutons - Optimisée pour doigts */}
              <div className="grid grid-cols-2 gap-3">
                {ANSWERS.map((answer) => (
                  <motion.button
                    key={answer.value}
                    onClick={() => {
                      onAnswer(answer.value);
                      setHasInteracted(true);
                      setShowSwipeHint(false);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      ${answer.size} rounded-xl font-medium border flex flex-col items-center justify-center
                      ${answer.borderColor} ${answer.bgColor} ${answer.color}
                      active:bg-stone-200 touch-manipulation select-none
                      text-sm md:text-base
                    `}
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation',
                    }}
                  >
                    <div className="mb-1">{answer.icon}</div>
                    <div className="font-medium text-center leading-tight px-2">
                      {answer.label}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicateur de question - Positionné en bas */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100/80 backdrop-blur-sm border border-stone-200 rounded-full">
            <div className="w-2 h-2 rounded-full bg-stone-400" />
            <span className="text-sm text-stone-600">
              <span className="font-medium text-stone-900">{questionNumber}</span> sur {totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* Feedback de drag - Positionné au-dessus du clavier virtuel */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-24 left-0 right-0 flex justify-center px-4 z-30"
          >
            <div className={`
              inline-flex items-center gap-3 px-5 py-3 rounded-full backdrop-blur-md bg-white/90
              border border-stone-200/60 shadow-lg max-w-sm
            `}>
              {Math.abs(dragX) > 30 || Math.abs(dragY) > 30 ? (
                <>
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center
                    ${dragX > 30 ? 'bg-rose-100 text-rose-600' :
                      dragX < -30 ? 'bg-emerald-100 text-emerald-600' :
                      dragY > 30 ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}
                  `}>
                    {dragX > 30 ? <ArrowRight className="w-4 h-4" /> :
                     dragX < -30 ? <ArrowLeft className="w-4 h-4" /> :
                     dragY > 30 ? <ArrowDown className="w-4 h-4" /> : <ArrowUp className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-900 truncate">
                      {dragX > 30 ? 'Presque tous les jours' :
                       dragX < -30 ? 'Pas du tout' :
                       dragY > 30 ? 'Plus de la moitié' : 'Plusieurs jours'}
                    </p>
                    <p className="text-xs text-stone-500 mt-0.5">Relâchez pour valider</p>
                  </div>
                </>
              ) : (
                <span className="text-sm text-stone-500">Swippez plus loin pour sélectionner</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#FDFCFB] pb-6 px-4 z-10">
        <div className="max-w-sm mx-auto text-center">
          <p className="text-xs text-stone-600">
            <span className="font-medium text-stone-800 italic">Prenez soin de vous :</span> Cet outil est une boussole, pas un médecin.
          </p>
        </div>
      </div>

      {/* CSS pour safe areas pour le mobile */}
      <style jsx>{`
        .safe-area-padding {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
      `}</style>
    </div>
  );
}