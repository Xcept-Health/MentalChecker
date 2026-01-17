import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  Heart, 
  Star, 
  ArrowLeft, 
  ChevronRight, 
  BookOpen, 
  UserCheck,
  Stethoscope,
  PhoneCall,
  MessageSquare,
  Hourglass,
  Bike,
  Bed,
  Ear,
  Trees,
  Shield,
  Brain
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface QuestionnaireResultProps {
  score: number;
  maxScore: number;
  severity: string;
  urgent: boolean;
  questionnaireName: string;
  onRestart: () => void;
}

export default function QuestionnaireResult({
  score,
  maxScore,
  severity,
  urgent,
  questionnaireName,
  onRestart,
}: QuestionnaireResultProps) {
  const percentage = (score / maxScore) * 100;
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeTab, setActiveTab] = useState<'result' | 'advice' | 'resources'>('result');

  const getSeverityColor = () => {
    if (urgent) return 'bg-rose-50 text-rose-900 border-rose-200';
    if (percentage <= 15) return 'bg-stone-100 text-stone-900 border-stone-200';
    if (percentage <= 40) return 'bg-stone-100 text-stone-900 border-stone-200';
    if (percentage <= 60) return 'bg-amber-50 text-amber-900 border-amber-200';
    return 'bg-rose-50 text-rose-900 border-rose-200';
  };

  const getSeverityIcon = () => {
    if (urgent) return <AlertTriangle className="w-12 h-12" />;
    if (percentage <= 15) return <CheckCircle className="w-12 h-12" />;
    return <AlertCircle className="w-12 h-12" />;
  };

  const getRecommendations = () => {
    const base = [
      { text: "Prenez du temps pour vous chaque jour, même quelques minutes", icon: <Hourglass className="w-5 h-5" /> },
      { text: "Essayez des exercices de respiration ou de méditation", icon: <Brain className="w-5 h-5" /> },
      { text: "Maintenez une routine de sommeil régulière", icon: <Bed className="w-5 h-5" /> },
    ];

    if (urgent) {
      return [
        { text: "Consultez un professionnel de santé rapidement", icon: <Stethoscope className="w-5 h-5" /> },
        { text: "Contactez une ligne d'écoute spécialisée", icon: <PhoneCall className="w-5 h-5" /> },
        { text: "Informez un proche de votre situation", icon: <MessageSquare className="w-5 h-5" /> },
        ...base,
      ];
    }

    if (percentage <= 15) {
      return [
        { text: "Continuez vos bonnes habitudes de bien-être", icon: <CheckCircle className="w-5 h-5" /> },
        { text: "Restez attentif à votre équilibre mental", icon: <Ear className="w-5 h-5" /> },
        { text: "Profitez d'activités qui vous font du bien", icon: <Trees className="w-5 h-5" /> },
        ...base,
      ];
    }

    return [
      { text: "Envisagez de parler à un professionnel", icon: <UserCheck className="w-5 h-5" /> },
      { text: "Notez vos pensées dans un journal", icon: <BookOpen className="w-5 h-5" /> },
      { text: "Établissez des limites saines", icon: <Shield className="w-5 h-5" /> },
      ...base,
    ];
  };

  useEffect(() => {
    if (percentage <= 15 && !urgent) {
      setTimeout(() => setShowCelebration(true), 800);
    }
  }, [percentage, urgent]);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-800 font-serif selection:bg-stone-200">
      {/* Header épuré */}
      <header className="pt-6 pb-8 px-6 text-center border-b border-stone-100">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-light text-stone-900 mb-2">
            Mental<span className="italic text-stone-500">Checker</span>
          </h1>
          <p className="text-stone-500 font-sans text-sm uppercase tracking-widest">
            {questionnaireName} • Résultats
          </p>
        </motion.div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {/* Score principal avec effet glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-10"
        >
          <div className="bg-white rounded-[2.5rem] p-8 border border-stone-200 shadow-sm">
            {/* Score circulaire */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-left">
                <p className="text-stone-500 font-sans text-sm uppercase tracking-widest mb-1">Score obtenu</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-light text-stone-900">{score}</span>
                  <span className="text-stone-400">/ {maxScore}</span>
                </div>
              </div>
              
              <div className={`
                w-20 h-20 rounded-full flex items-center justify-center border-2
                ${urgent ? 'bg-rose-100 border-rose-200' : 
                  percentage <= 15 ? 'bg-stone-100 border-stone-200' : 
                  'bg-amber-100 border-amber-200'}
              `}>
                {getSeverityIcon()}
              </div>
            </div>

            {/* Barre de progression élégante */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-stone-700 font-sans">{severity}</span>
                <span className="text-stone-500 font-sans text-sm">{Math.round(percentage)}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <motion.div
                  className={`
                    h-full rounded-full
                    ${urgent ? 'bg-gradient-to-r from-rose-600 to-rose-400' : 
                      percentage <= 15 ? 'bg-gradient-to-r from-stone-600 to-stone-400' : 
                      percentage <= 60 ? 'bg-gradient-to-r from-amber-600 to-amber-400' : 
                      'bg-gradient-to-r from-rose-600 to-amber-600'}
                  `}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Message court */}
            <div className="text-center pt-4 border-t border-stone-100">
              <p className="text-stone-600 font-sans leading-relaxed">
                {urgent 
                  ? "Votre bien-être mérite une attention immédiate"
                  : percentage <= 15
                  ? "Votre équilibre semble bien maintenu"
                  : "Prenez ce moment pour écouter vos besoins"}
              </p>
            </div>
          </div>

          {/* Badge de célébration */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -top-3 -right-3"
              >
                <div className="bg-stone-100 border border-stone-200 rounded-full py-2 px-4 flex items-center gap-2 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-medium text-stone-800 font-sans">Excellent travail</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Navigation par onglets */}
        <div className="flex border-b border-stone-200 mb-8">
          <button
            onClick={() => setActiveTab('result')}
            className={`flex-1 py-3 text-sm font-sans transition-colors ${
              activeTab === 'result'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Résultat
          </button>
          <button
            onClick={() => setActiveTab('advice')}
            className={`flex-1 py-3 text-sm font-sans transition-colors ${
              activeTab === 'advice'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Recommandations
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`flex-1 py-3 text-sm font-sans transition-colors ${
              activeTab === 'resources'
                ? 'text-stone-900 border-b-2 border-stone-900'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            Ressources
          </button>
        </div>

        {/* Contenu des onglets */}
        <AnimatePresence mode="wait">
          {activeTab === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Explication */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-stone-600" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-light text-stone-900 mb-2">
                      Comprendre votre score
                    </h3>
                    <p className="text-stone-600 font-sans text-sm leading-relaxed">
                      Ce questionnaire évalue {questionnaireName.toLowerCase()} sur une échelle de 0 à {maxScore}. 
                      {urgent
                        ? " Votre score suggère une détresse importante qui mérite une attention professionnelle."
                        : percentage <= 15
                        ? " Votre score indique un niveau de bien-être satisfaisant."
                        : " Votre score montre des signes qui méritent attention et soin."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Prochaines étapes */}
              <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200">
                <h3 className="font-serif text-lg font-light text-stone-900 mb-4">
                  Prochaines étapes
                </h3>
                <ul className="space-y-3">
                  {getRecommendations().slice(0, 3).map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                      </div>
                      <span className="text-stone-700 font-sans text-sm">{rec.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {activeTab === 'advice' && (
            <motion.div
              key="advice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {getRecommendations().map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-stone-200 hover:border-stone-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-stone-100 group-hover:bg-stone-200 transition-colors flex items-center justify-center flex-shrink-0">
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-stone-800 font-sans">{rec.text}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-600 transition-colors" />
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Ressources urgentes */}
              {urgent && (
                <div className="bg-rose-50 rounded-3xl p-6 border border-rose-200">
                  <div className="flex items-start gap-4 mb-4">
                    <AlertTriangle className="w-6 h-6 text-rose-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-serif text-lg font-light text-rose-900 mb-1">
                        Ressources immédiates
                      </h3>
                      <p className="text-rose-700 font-sans text-sm">
                        Ces ressources peuvent vous offrir un soutien rapide
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-white/50 rounded-xl border border-rose-100">
                      <p className="font-medium text-rose-900 text-sm mb-1">Ligne d'écoute</p>
                      <p className="text-rose-700 text-xs">3114 • Gratuit, 24h/24</p>
                    </div>
                    <div className="p-3 bg-white/50 rounded-xl border border-rose-100">
                      <p className="font-medium text-rose-900 text-sm mb-1">Urgences médicales</p>
                      <p className="text-rose-700 text-xs">15 • SAMU</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Ressources générales */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200">
                <h3 className="font-serif text-lg font-light text-stone-900 mb-4">
                  Ressources utiles
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="font-medium text-stone-900 text-sm mb-1">Consultation psychologique</p>
                    <p className="text-stone-600 text-xs">Prenez rendez-vous avec un professionnel</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="font-medium text-stone-900 text-sm mb-1">Applications de bien-être</p>
                    <p className="text-stone-600 text-xs">Méditation, suivi d'humeur, exercices</p>
                  </div>
                  <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="font-medium text-stone-900 text-sm mb-1">Groupes de soutien</p>
                    <p className="text-stone-600 text-xs">Rencontrez d'autres personnes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avertissement légal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 bg-stone-50 rounded-2xl border border-stone-200"
        >
          <p className="text-xs text-stone-600 text-center font-sans leading-relaxed">
            <span className="font-medium text-stone-800">Cet outil est une boussole, pas un diagnostic.</span> 
            Les résultats sont indicatifs et ne remplacent pas une consultation professionnelle.
          </p>
        </motion.div>

        {/* Actions principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex gap-3 mt-8"
        >
          <button
            onClick={() => window.history.back()}
            className="flex-1 py-3.5 px-6 bg-white border border-stone-300 text-stone-700 font-sans font-medium rounded-xl hover:bg-stone-50 transition-colors"
          >
            Retour
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-3.5 px-6 bg-stone-900 text-white font-sans font-medium rounded-xl hover:bg-stone-800 transition-colors"
          >
            Nouvelle évaluation
          </button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="pt-2 pb-6 px-6 mt-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-stone-50 rounded-full py-4 px-8 inline-block mb-8 border border-stone-200">
            <p className="text-sm text-stone-600 font-sans">
              <span className="font-medium text-stone-800 italic">Prenez soin de vous!</span>
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 font-sans gap-4">
            <p>© {new Date().getFullYear()} — Xcept-Health</p>
            <p className="tracking-widest uppercase">MentalChecker par Ariel Shadrac</p>
          </div>
        </div>
      </footer>
    </div>
  );
}