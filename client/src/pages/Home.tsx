import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, BookHeart, ShieldCheck } from 'lucide-react';

interface HomeProps {
  onSelectView: (view: 'phq9' | 'gad7' | 'resources') => void;
}

export default function Home({ onSelectView }: HomeProps) {
  const cards = [
    {
      id: 'phq9',
      title: 'Évaluation PHQ-9',
      subtitle: "Dépistage de la dépression",
      description: "Un questionnaire clinique standardisé pour évaluer la sévérité des symptômes dépressifs chez l'adulte.",
      icon: <Activity className="w-6 h-6 text-primary" />,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800', // Calm yoga/meditation vibe
    },
    {
      id: 'gad7',
      title: 'Évaluation GAD-7',
      subtitle: "Dépistage de l'anxiété",
      description: "Un outil reconnu pour identifier et mesurer l'intensité du trouble d'anxiété généralisée (TAG).",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800', // Peaceful nature / calm waters
    },
    {
      id: 'resources',
      title: 'Ressources & Accompagnement',
      subtitle: 'Soutien professionnel',
      description: "Accédez à une liste de professionnels de la santé mentale et de numéros d'urgence près de chez vous.",
      icon: <BookHeart className="w-6 h-6 text-primary" />,
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800', // Professional conversation / support
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">

      {/* Navbar Minimaliste */}
      <nav className="w-full px-6 py-6 flex justify-center lg:justify-start border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold font-serif text-lg">M</span>
          </div>
          <span className="text-xl font-medium tracking-tight text-foreground">
            Mental<span className="text-muted-foreground font-light">Checker</span>
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-24 pb-20 px-6 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 text-sm font-medium tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Outils cliniques validés
          </div>

          <h1 className="text-4xl md:text-6xl font-semibold text-foreground tracking-tight leading-tight">
            Évaluez votre santé mentale avec <span className="text-primary">clarté et bienveillance.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-xl leading-relaxed">
            Prenez un moment pour vous. Nos questionnaires confidentiels vous aident à mieux comprendre votre état émotionnel et à trouver l'accompagnement professionnel adapté.
          </p>
        </motion.div>
      </header>

      {/* Grid Section */}
      <main className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.button
              key={card.id}
              onClick={() => onSelectView(card.id as any)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="group flex flex-col text-left bg-card rounded-[2rem] border border-border/50 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              {/* Image Container */}
              <div className="relative w-full h-56 overflow-hidden bg-muted">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-80" />

                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <div className="p-2.5 bg-white/95 backdrop-blur-sm rounded-xl shadow-sm text-primary">
                    {card.icon}
                  </div>
                  <span className="text-white font-medium text-sm tracking-wide drop-shadow-md">
                    {card.subtitle}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex flex-col flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-3">{card.title}</h2>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {card.description}
                </p>

                <div className="mt-8 flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                  <span>Commencer l'évaluation</span>
                  <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-muted/20 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">

          <div className="max-w-md">
            <h3 className="font-semibold text-foreground mb-2 flex items-center justify-center md:justify-start gap-2">
              Avertissement médical
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cet outil fournit une évaluation indicative et ne remplace en aucun cas un diagnostic médical posé par un professionnel de la santé. En cas d'urgence, veuillez contacter les services de secours.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-muted-foreground font-medium">
            <p>© {new Date().getFullYear()} Xcept-Health</p>
            <p>MentalChecker par Ariel Shadrac.</p>
          </div>

        </div>
      </footer>
    </div>
  );
}