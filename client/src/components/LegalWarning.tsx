"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, ArrowRight, Check, Siren } from 'lucide-react';

interface LegalWarningProps {
  onAccept: () => void;
  onDeny?: () => void;
}

interface DropdownItem {
  id: string;
  title: string;
  content: string;
  icon: React.ReactNode;
  urgent?: boolean;
}

export default function LegalWarning({ onAccept, onDeny }: LegalWarningProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const dropdownItems: DropdownItem[] = [
    {
      id: 'tool',
      title: 'Outil d\'auto-évaluation',
      content: 'Cette application fournit des outils d\'auto-évaluation (PHQ-9, GAD-7) basés sur des questionnaires médicaux validés. Les résultats sont indicatifs et ne remplacent pas un diagnostic médical professionnel.',
      icon: <Shield className="w-4 h-4" />
    },
    {
      id: 'emergency',
      title: 'En cas d\'urgence',
      content: 'Si vous êtes en détresse immédiate ou avez des pensées suicidaires, contactez immédiatement le 112, le 15 (SAMU), ou rendez-vous aux urgences les plus proches. Vous pouvez également appeler le 3114 (Suicide Prévention) 24h/24.',
      icon: <Siren className="w-4 h-4" />,
      urgent: true
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accepted = localStorage.getItem('legalWarningAccepted');
      if (accepted === 'true') {
        onAccept();
      }
    }
  }, [onAccept]);

  const handleAccept = () => {
    if (isChecked) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('legalWarningAccepted', 'true');
      }
      onAccept();
    }
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="min-h-screen w-full bg-[#FDFCFB] flex items-center justify-center p-4 font-sans">
      {/* Conteneur Principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
      >
        {/* Contenu  */}
        <div className="p-6 md:p-8">
          {/* Header l */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="w-8 h-8 text-stone-600" />
            </motion.div>
            <h1 className="text-2xl font-serif font-light text-stone-900 mb-2">
              Avant de commencer
            </h1>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              Veuillez prendre connaissance de ces informations importantes.
            </p>
          </div>

          {/* Dropdowns  */}
          <div className="space-y-3 mb-8">
            {dropdownItems.map((item) => (
              <div key={item.id} className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleDropdown(item.id)}
                  className={`w-full p-4 flex items-center justify-between transition-colors hover:bg-stone-50 ${
                    item.urgent ? 'bg-rose-50/50' : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.urgent ? 'bg-rose-100 text-rose-600' : 'bg-stone-100 text-stone-600'
                    }`}>
                      {item.icon}
                    </div>
                    <span className={`font-medium text-left ${
                      item.urgent ? 'text-rose-800' : 'text-stone-800'
                    }`}>
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    openDropdown === item.id ? 'rotate-180' : ''
                  } ${item.urgent ? 'text-rose-600' : 'text-stone-400'}`} />
                </button>
                
                <AnimatePresence>
                  {openDropdown === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-4 border-t ${item.urgent ? 'bg-rose-50/30' : 'bg-stone-50/50'} text-sm text-stone-600 leading-relaxed`}>
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Case à cocher  */}
          <div className="mb-8">
            <label 
              className="flex items-start gap-3 cursor-pointer group"
              onClick={() => setIsChecked(!isChecked)}
            >
              <div className={`
                relative shrink-0 flex items-center justify-center w-5 h-5 mt-0.5 rounded border transition-all
                ${isChecked 
                  ? 'bg-stone-900 border-stone-900' 
                  : 'bg-white border-stone-300 group-hover:border-stone-400'}
              `}>
                <AnimatePresence>
                  {isChecked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                    >
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex-1">
                <p className="text-sm text-stone-700">
                  J'ai compris que ce n'est pas un diagnostic médical et j'accepte de continuer.
                </p>
                <p className="text-xs text-stone-400 mt-1">
                  En cochant, vous acceptez les conditions d'utilisation.
                </p>
              </div>
            </label>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAccept}
              disabled={!isChecked}
              className={`
                flex-1 py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2
                ${isChecked 
                  ? 'bg-stone-900 text-white hover:bg-stone-800 cursor-pointer active:scale-95' 
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'}
              `}
            >
              <span>Commencer</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button 
              onClick={onDeny || (() => window.history.back())}
              className="py-3 px-6 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors font-medium border border-stone-300 active:scale-95"
            >
              Quitter
            </button>
          </div>

          {/* Avertissement  */}
          <div className="mt-2 pt-6 border-stone-200">
            <p className="text-xs text-stone-400 text-center">
              <span className="font-medium text-stone-500">Important : </span>
              Cet outil est informatif, pas un diagnostic médical.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 bg-white/60">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-stone-400 gap-2">
            <p>© {new Date().getFullYear()} Xcept-Health</p>
            <p className="text-stone-500">Développé par Ariel Shadrac</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}