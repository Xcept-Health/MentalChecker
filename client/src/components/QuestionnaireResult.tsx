import { motion } from 'framer-motion';
import { 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  BookOpen, 
  UserCheck,
  Stethoscope,
  PhoneCall,
  MessageSquare,
  Hourglass,
  Bed,
  Ear,
  Trees,
  Shield,
  Brain,
  ArrowRight,
  Info
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

  const getSeverityColor = () => {
    if (urgent) return 'bg-destructive/10 text-destructive border-destructive/20';
    if (percentage <= 15) return 'bg-primary/10 text-primary border-primary/20';
    if (percentage <= 60) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    return 'bg-destructive/10 text-destructive border-destructive/20';
  };

  const getSeverityIcon = () => {
    if (urgent) return <AlertTriangle className="w-10 h-10" />;
    if (percentage <= 15) return <CheckCircle className="w-10 h-10" />;
    if (percentage <= 60) return <AlertCircle className="w-10 h-10" />;
    return <AlertTriangle className="w-10 h-10" />;
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
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary pb-20">
      
      {/* Header Professionnel Pleine Largeur */}
      <header className="w-full bg-card border-b border-border/40 py-10 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground font-serif font-bold">M</span>
              <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Rapport Clinique</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Évaluation {questionnaireName}
            </h1>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={onRestart}
              className="flex-1 md:flex-none px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all shadow-sm"
            >
              Nouvelle évaluation
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Colonne Gauche : Score & Statut (Sticky sur Desktop) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-40">
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-8 border border-border/60 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-border/50 to-border/10" />
              
              <div className="mb-8 text-center">
                <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-4">Score Global</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-7xl font-bold tracking-tighter text-foreground">{score}</span>
                  <span className="text-2xl font-medium text-muted-foreground">/{maxScore}</span>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col items-center text-center ${getSeverityColor()}`}>
                <div className="mb-3">
                  {getSeverityIcon()}
                </div>
                <h2 className="text-xl font-semibold mb-1">{severity}</h2>
                <p className="text-sm opacity-90">
                  {urgent ? "Une attention immédiate est recommandée" : 
                   percentage <= 15 ? "Niveau de bien-être satisfaisant" : 
                   "Des signes méritant une attention"}
                </p>
              </div>

              {/* Jauge Minimaliste */}
              <div className="mt-8">
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${urgent ? 'bg-destructive' : percentage <= 15 ? 'bg-primary' : 'bg-amber-500'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(percentage, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              {showCelebration && (
                <div className="absolute top-6 right-6 text-amber-500 animate-bounce">
                  <Sparkles className="w-6 h-6" />
                </div>
              )}
            </motion.div>

            {/* Avertissement Médical Sidebar */}
            <div className="bg-muted/30 rounded-2xl p-6 border border-border/40 flex gap-4 text-muted-foreground">
              <Info className="w-5 h-5 shrink-0 text-foreground" />
              <p className="text-sm leading-relaxed">
                <strong className="text-foreground">Ceci n'est pas un diagnostic.</strong> Ce résultat est donné à titre indicatif et ne remplace en aucun cas l'avis d'un professionnel de la santé.
              </p>
            </div>

          </div>

          {/* Colonne Droite : Explications & Recommandations */}
          <div className="lg:col-span-8 space-y-8">
            
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="bg-card rounded-3xl p-8 md:p-10 border border-border/60 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold text-foreground">Interprétation clinique</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ce questionnaire évalue votre état sur la base du standard {questionnaireName}. 
                Votre score suggère <strong>{severity.toLowerCase()}</strong>. 
                {urgent
                  ? " Ce niveau de détresse est important. Il est fortement conseillé d'en parler à un professionnel qui pourra vous accompagner et vous soulager."
                  : percentage <= 15
                  ? " Ces résultats sont très positifs. Continuez à prendre soin de vous et à maintenir votre équilibre."
                  : " Ces signes montrent que vous traversez peut-être une période difficile. Reconnaître ces symptômes est la première étape pour aller mieux."}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <span className="w-2 h-8 rounded-full bg-primary inline-block"></span>
                Recommandations personnalisées
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getRecommendations().map((rec, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 border border-border/60 shadow-sm flex items-start gap-4 group hover:border-primary/40 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors flex items-center justify-center shrink-0">
                      {rec.icon}
                    </div>
                    <p className="text-foreground font-medium leading-snug">{rec.text}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {urgent && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-destructive/5 rounded-3xl p-8 md:p-10 border border-destructive/20 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-semibold text-destructive">Soutien immédiat disponible</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="tel:3114" className="block bg-card rounded-2xl p-6 border border-destructive/10 hover:border-destructive/30 transition-all group">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-foreground">Numéro National Prévention Suicide</h3>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                    </div>
                    <p className="text-2xl font-bold text-destructive tracking-widest mb-1">3114</p>
                    <p className="text-sm text-muted-foreground">Gratuit, confidentiel, 24h/24 et 7j/7</p>
                  </a>

                  <a href="tel:15" className="block bg-card rounded-2xl p-6 border border-destructive/10 hover:border-destructive/30 transition-all group">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-foreground">Urgences Médicales (SAMU)</h3>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                    </div>
                    <p className="text-2xl font-bold text-destructive tracking-widest mb-1">15</p>
                    <p className="text-sm text-muted-foreground">En cas d'urgence médicale immédiate</p>
                  </a>
                </div>
              </motion.section>
            )}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-muted/30 rounded-3xl p-8 border border-border/40"
            >
              <h2 className="text-xl font-semibold text-foreground mb-6">Autres ressources utiles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card p-5 rounded-2xl border border-border/60">
                  <h4 className="font-medium text-foreground mb-1">Professionnels de santé</h4>
                  <p className="text-sm text-muted-foreground">Trouvez un psychologue ou un psychiatre près de chez vous (Doctolib, Qare...).</p>
                </div>
                <div className="bg-card p-5 rounded-2xl border border-border/60">
                  <h4 className="font-medium text-foreground mb-1">Associations</h4>
                  <p className="text-sm text-muted-foreground">Des groupes de parole et du soutien par des pairs (UNAFAM, Croix-Rouge...).</p>
                </div>
                <div className="bg-card p-5 rounded-2xl border border-border/60">
                  <h4 className="font-medium text-foreground mb-1">Applications</h4>
                  <p className="text-sm text-muted-foreground">Outils de méditation et suivi d'humeur reconnus (Petit BamBou, RespiRelax).</p>
                </div>
              </div>
            </motion.section>

          </div>
        </div>
      </main>

    </div>
  );
}