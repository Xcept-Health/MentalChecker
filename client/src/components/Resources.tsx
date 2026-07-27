import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Globe, AlertCircle, ChevronDown, Hospital, Shield, Users, Siren, Cross, ArrowRight } from 'lucide-react';
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
    description: 'Principal hôpital psychiatrique de Ouagadougou. Accueil et prise en charge des urgences psychiatriques et soins spécialisés.',
    phone: '+226 25 30 76 76',
    address: 'Ouagadougou, Burkina Faso',
    type: 'mental-health',
  },
  {
    name: 'Croix-Rouge Burkina Faso',
    description: 'Services d\'aide, de soutien psychosocial et d\'intervention en situation de vulnérabilité.',
    phone: '+226 25 30 28 28',
    address: 'Ouagadougou, Burkina Faso',
    website: 'www.croixrouge.bf',
    type: 'red-cross',
  },
  {
    name: 'Urgences Médicales (SAMU)',
    description: 'Services d\'urgence médicale disponibles 24h/24 et 7j/7 pour toute urgence vitale.',
    phone: '+226 25 30 00 00',
    address: 'Ouagadougou, Burkina Faso',
    type: 'emergency',
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'emergency':
      return 'text-destructive bg-destructive/10 border-destructive/20';
    case 'mental-health':
      return 'text-primary bg-primary/10 border-primary/20';
    case 'support':
      return 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20';
    case 'red-cross':
      return 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20';
    default:
      return 'text-foreground bg-muted/80 border-border/60';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'emergency':
      return <Siren className="w-5 h-5" />;
    case 'mental-health':
      return <Hospital className="w-5 h-5" />;
    case 'support':
      return <Users className="w-5 h-5" />;
    case 'red-cross':
      return <Cross className="w-5 h-5" />;
    default:
      return <Shield className="w-5 h-5" />;
  }
};

export default function Resources() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);

  const filteredResources = selectedType 
    ? RESOURCES.filter(resource => resource.type === selectedType)
    : RESOURCES;

  const resourceTypes = [
    { id: null, label: 'Toutes les ressources' },
    { id: 'emergency', label: 'Urgences' },
    { id: 'mental-health', label: 'Santé mentale' },
    { id: 'support', label: 'Soutien' },
  ];

  const toggleResource = (name: string) => {
    setExpandedResource(expandedResource === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">

      {/* Header Professionnel */}
      <header className="w-full bg-card border-b border-border/40 py-10 px-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-2">
              Annuaire des Ressources
            </h1>
            <p className="text-muted-foreground">
              Trouvez l'aide et le soutien appropriés au Burkina Faso.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Navigation des Filtres */}
        <div className="flex flex-wrap gap-3 mb-10">
          {resourceTypes.map((type) => (
            <button
              key={type.id || 'all'}
              onClick={() => setSelectedType(type.id)}
              className={`
                px-5 py-2.5 rounded-full font-medium transition-all text-sm
                ${selectedType === type.id 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'bg-card border border-border/60 text-muted-foreground hover:bg-muted/80 hover:text-foreground'}
              `}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Liste des Ressources (Prend 8 colonnes sur 12) */}
          <div className="lg:col-span-8 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.name}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-card rounded-2xl border border-border/60 overflow-hidden shadow-sm hover:border-primary/30 transition-colors"
                >
                  <button
                    onClick={() => toggleResource(resource.name)}
                    className="w-full p-6 flex flex-col sm:flex-row sm:items-center justify-between text-left gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${getTypeColor(resource.type)}`}>
                        {getTypeIcon(resource.type)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1 leading-tight">
                          {resource.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-none">
                          {resource.description}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 self-end sm:self-auto ml-16 sm:ml-0">
                      <ChevronDown className={`
                        w-5 h-5 text-muted-foreground transition-transform duration-300
                        ${expandedResource === resource.name ? 'rotate-180' : ''}
                      `} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedResource === resource.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 bg-card border-t border-border/40 mt-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                            
                            {/* Contact Info */}
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Téléphone</p>
                                  <a href={`tel:${resource.phone.replace(/\s/g, '')}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                                    {resource.phone}
                                  </a>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Adresse</p>
                                  <p className="text-sm text-foreground">{resource.address}</p>
                                </div>
                              </div>
                            </div>

                            {/* Additional Info */}
                            <div className="space-y-4">
                              {resource.website && (
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                    <Globe className="w-4 h-4 text-muted-foreground" />
                                  </div>
                                  <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Site web</p>
                                    <a href={`https://${resource.website}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1">
                                      {resource.website} <ArrowRight className="w-3 h-3" />
                                    </a>
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                                  <AlertCircle className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Disponibilité</p>
                                  <p className="text-sm text-foreground">
                                    {resource.type === 'emergency' ? '24h/24, 7j/7' : 'Heures de bureau standard'}
                                  </p>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              
              {filteredResources.length === 0 && (
                <div className="text-center py-12 bg-muted/30 rounded-2xl border border-border/40">
                  <p className="text-muted-foreground">Aucune ressource trouvée pour cette catégorie.</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar: Conseils */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-40">
            <div className="bg-muted/30 rounded-3xl p-6 border border-border/40">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Conseils importants
              </h3>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    N'hésitez pas à parler de vos sentiments à une personne de confiance.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    Chercher de l'aide est un signe de force, pas de faiblesse.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    Les professionnels de santé mentale sont formés pour vous écouter sans jugement.
                  </span>
                </li>
              </ul>
            </div>
            
            {/* Box urgence si non filtrée sur urgence */}
            {selectedType !== 'emergency' && (
              <div className="bg-destructive/5 rounded-3xl p-6 border border-destructive/20 text-center">
                <h4 className="font-semibold text-destructive mb-2">En cas d'urgence vitale</h4>
                <a href="tel:15" className="inline-block mt-2 px-6 py-2 bg-destructive text-destructive-foreground rounded-full font-bold shadow-sm hover:bg-destructive/90 transition-colors">
                  Appelez le 15 (SAMU)
                </a>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 px-6 mt-12 bg-card/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground font-sans gap-4">
          <p>© {new Date().getFullYear()} — Xcept-Health</p>
          <p className="uppercase tracking-widest font-medium">MentalChecker par Ariel Shadrac</p>
        </div>
      </footer>
    </div>
  );
}