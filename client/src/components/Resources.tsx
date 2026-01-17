import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Globe, AlertCircle, ChevronRight, Hospital, Shield, Users, Siren, Cross } from 'lucide-react';
import { useState } from 'react';

interface Resource {
  name: string;
  description: string;
  phone: string;
  address: string;
  website?: string;
  type: 'emergency' | 'support' | 'mental-health' | 'red-cross';
}

const RESOURCES: Resource[] = [
  {
    name: 'Centre Hospitalier Universitaire Yalgado Ouédraogo',
    description: 'Principal hôpital psychiatrique de Ouagadougou',
    phone: '+226 25 30 76 76',
    address: 'Ouagadougou, Burkina Faso',
    type: 'mental-health',
  },
  {
    name: 'Croix-Rouge Burkina Faso',
    description: 'Services d\'aide et de soutien psychosocial',
    phone: '+226 25 30 28 28',
    address: 'Ouagadougou, Burkina Faso',
    website: 'www.croixrouge.bf',
    type: 'red-cross',
  },
  {
    name: 'Urgences Médicales',
    description: 'Services d\'urgence médicale 24h/24',
    phone: '+226 25 30 00 00',
    address: 'Ouagadougou, Burkina Faso',
    type: 'emergency',
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'emergency':
      return 'text-rose-700 bg-rose-50/80 border-rose-200';
    case 'mental-health':
      return 'text-stone-700 bg-stone-100/80 border-stone-200';
    case 'support':
      return 'text-amber-700 bg-amber-50/80 border-amber-200';
    case 'red-cross':
      return 'text-amber-700 bg-amber-50/80 border-amber-200';
    default:
      return 'text-stone-700 bg-stone-100/80 border-stone-200';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'emergency':
      return <Siren className="w-4 h-4" />;
    case 'mental-health':
      return <Hospital className="w-4 h-4" />;
    case 'support':
      return <Users className="w-4 h-4" />;
    case 'red-cross':
      return <Cross className="w-4 h-4" />;
    default:
      return <Shield className="w-4 h-4" />;
  }
};

export default function Resources() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);

  const filteredResources = selectedType 
    ? RESOURCES.filter(resource => resource.type === selectedType)
    : RESOURCES;

  const resourceTypes = [
    { id: null, label:'Toutes'},
    { id: 'emergency', label:'Urgence'},
    { id: 'mental-health', label:'Santé mentale' },
    { id: 'support', label:'Soutien' },
  ];

  const toggleResource = (name: string) => {
    setExpandedResource(expandedResource === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-800 font-serif safe-area-padding">

      {/* Contenu principal */}
      <div className="pt-20 pb-32 px-4">
        <div className="max-w-md mx-auto">
          {/* Titre principal */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-serif text-3xl font-light text-stone-900 mb-3">
              Ressources
            </h1>
            <p className="text-stone-500 font-sans">
              Trouvez de l'aide et du soutien au Burkina Faso
            </p>
          </motion.div>

          {/* Filtres rapides */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4 scrollbar-hide"
          >
            {resourceTypes.map((type) => (
              <button
                key={type.id || 'all'}
                onClick={() => setSelectedType(type.id)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all
                  ${selectedType === type.id 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'}
                `}
              >
                <span className="text-sm font-sans font-medium">{type.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Liste des ressources avec dropdowns */}
          <div className="space-y-3">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleResource(resource.name)}
                  className="w-full p-4 flex items-center justify-between"
                >
                  <div className="flex items-start gap-3 text-left">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center mt-0.5
                      ${resource.type === 'emergency' ? 'bg-rose-100 text-rose-600' :
                        resource.type === 'mental-health' ? 'bg-stone-100 text-stone-600' :
                        'bg-amber-100 text-amber-600'}
                    `}>
                      {getTypeIcon(resource.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-light text-stone-900 mb-1 leading-tight">
                        {resource.name}
                      </h3>
                      <p className="text-xs text-stone-500 font-sans line-clamp-1">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`
                    w-4 h-4 text-stone-400 transition-transform flex-shrink-0
                    ${expandedResource === resource.name ? 'rotate-90' : ''}
                  `} />
                </button>

                <AnimatePresence>
                  {expandedResource === resource.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden border-t border-stone-100"
                    >
                      <div className="p-4 pt-3 bg-stone-50/50">
                        <div className="space-y-3">
                          {/* Téléphone */}
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                              <Phone className="w-4 h-4 text-stone-600" />
                            </div>
                            <div>
                              <p className="text-xs text-stone-500 font-sans">Téléphone</p>
                              <a
                                href={`tel:${resource.phone.replace(/\s/g, '')}`}
                                className="text-sm font-medium text-stone-900 hover:text-stone-700"
                              >
                                {resource.phone}
                              </a>
                            </div>
                          </div>

                          {/* Adresse */}
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <MapPin className="w-4 h-4 text-stone-600" />
                            </div>
                            <div>
                              <p className="text-xs text-stone-500 font-sans">Adresse</p>
                              <p className="text-sm text-stone-700">{resource.address}</p>
                            </div>
                          </div>

                          {/* Site web */}
                          {resource.website && (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                                <Globe className="w-4 h-4 text-stone-600" />
                              </div>
                              <div>
                                <p className="text-xs text-stone-500 font-sans">Site web</p>
                                <a
                                  href={`https://${resource.website}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium text-stone-900 hover:text-stone-700 inline-flex items-center gap-1"
                                >
                                  {resource.website}
                                  <ChevronRight className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          )}

                          {/* Type badge */}
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0">
                              {getTypeIcon(resource.type)}
                            </div>
                            <div>
                              <p className="text-xs text-stone-500 font-sans">Type</p>
                              <span className={`text-xs font-medium px-3 py-1 rounded-full border ${getTypeColor(resource.type)}`}>
                                {resource.type === 'emergency' ? 'Urgence' :
                                 resource.type === 'mental-health' ? 'Santé mentale' : 'Soutien'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Conseils généraux */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-stone-200"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-stone-600" />
              </div>
              <div>
                <h3 className="font-serif font-light text-stone-900 mb-1">
                  Conseils pour chercher de l'aide
                </h3>
                <p className="text-sm text-stone-500 font-sans">
                  Prenez soin de vous en cherchant le soutien approprié
                </p>
              </div>
            </div>

            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                </div>
                <span className="text-sm text-stone-600 font-sans">N'hésitez pas à parler de vos sentiments à quelqu'un de confiance</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                </div>
                <span className="text-sm text-stone-600 font-sans">Chercher de l'aide est un signe de force, pas de faiblesse</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                </div>
                <span className="text-sm text-stone-600 font-sans">Les professionnels de santé mentale sont formés pour vous aider</span>
              </li>
            </ul>
          </motion.div>

          {/* Note d'encouragement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
          </motion.div>
        </div>
      </div>

           {/* Footer */}
      <footer className="pb-6 px-6  ">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 font-sans gap-4">
            <p>© {new Date().getFullYear()} — Xcept-Health</p>
            <p className="tracking-widest ">MentalChecker par Ariel Shadrac</p>
          </div>
        </div>
      </footer>
      {/* CSS pour cacher la scrollbar */}
      <style jsx>{`
        .safe-area-padding {
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
          padding-left: env(safe-area-inset-left);
          padding-right: env(safe-area-inset-right);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}