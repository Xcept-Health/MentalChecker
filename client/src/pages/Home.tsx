import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface HomeProps {
  onSelectView: (view: 'phq9' | 'gad7' | 'resources') => void;
}

export default function Home({ onSelectView }: HomeProps) {
  const cards = [
    {
      id: 'phq9',
      title: 'Évaluation PHQ-9',
      subtitle: "Pour le dépistage et l'évaluation de la dépression et sa sévérité chez les adultes.",
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=900',
      color: 'bg-stone-100',
    },
    {
      id: 'gad7',
      title: 'Évaluation GAD-7',
      subtitle: "Pour le dépistage du trouble d'anxiété généralisée (TAG)",
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800',
      color: 'bg-stone-100',
    },
    {
      id: 'resources',
      title: 'Ressources locales',
      subtitle: 'Ressources locales',
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800',
      color: 'bg-stone-100',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-800 font-serif selection:bg-orange-100">
      
      {/* Header */}
      <header className="pt-20 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl font-light text-stone-900 mb-6">
            Mental<span className="font-serif italic text-stone-500">Checker</span>
          </h1>
          <p className="max-w-xl mx-auto text-stone-500 font-sans leading-relaxed text-lg">
            Un moment de pause pour écouter ce que votre esprit a à vous dire. 
            Simple, confidentiel et humain.
          </p>
        </motion.div>
      </header>

      {/* Grille de cartes */}
      <main className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <motion.button
              key={card.id}
              onClick={() => onSelectView(card.id as any)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="group flex flex-col text-left outline-none"
            >
              {/* Image Container avec Glassmorphism */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-6 shadow-sm">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Overlay Glassmorphism */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                
                {/* Badge Glassmorphism */}
                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/70 border border-white/40 p-5 rounded-3xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <div className="flex justify-between items-center text-stone-800">
                      <span className="font-sans font-medium">Explorer</span>
                      <ChevronRight className="w-5 h-5" />
                   </div>
                </div>
              </div>

              <h2 className="text-2xl font-light text-stone-900 mb-1 px-2">{card.title}</h2>
              <p className="text-xs uppercase tracking-widest text-stone-400 font-sans mb-3 px-2">{card.subtitle}</p>
            </motion.button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className=" pb-6 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-stone-50 rounded-full py-4 px-8 inline-block mb-6 border border-stone-100">
            <p className="text-sm text-stone-500 font-sans">
              <span className="font-semibold text-stone-800 italic">Prenez soin de vous :</span> Cet outil est une boussole, pas un médecin.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 font-sans gap-4">
            <p>© {new Date().getFullYear()} — Xcept-Health</p>
            <p className="tracking-widest">Développé  par Ariel Shadrac</p>
          </div>
        </div>
      </footer>
    </div>
  );
}