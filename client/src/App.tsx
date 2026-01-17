import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LegalWarning from "./components/LegalWarning";
import QuestionnairePHQ9 from "./components/QuestionnairePHQ9";
import QuestionnaireGAD7 from "./components/QuestionnaireGAD7";
import Resources from "./components/Resources";
import { Moon, Sun } from 'lucide-react';
import { Analytics } from "@vercel/analytics/react"

type View = 'home' | 'phq9' | 'gad7' | 'resources';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  if (!toggleTheme) return null;

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-40 w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center hover:shadow-lg transition-all duration-300 text-foreground"
      title={theme === "dark" ? "Mode clair" : "Mode sombre"}
    >
      {theme === "dark" ? (
        <Sun className="w-6 h-6" />
      ) : (
        <Moon className="w-6 h-6" />
      )}
    </button>
  );
}

function Router({ currentView, setCurrentView }: { currentView: View; setCurrentView: (view: View) => void }) {
  // Questionnaires
  if (currentView !== 'home') {
    return (
      <div className="min-h-screen">
        <button
          onClick={() => setCurrentView('home')}
          className="fixed top-6 left-6 z-40 px-4 py-2 rounded-full bg-slate-200 dark:bg-slate-700 text-foreground hover:shadow-lg transition-all duration-300 font-medium"
        >
          ← Retour
        </button>
        {currentView === 'phq9' && <QuestionnairePHQ9 />}
        {currentView === 'gad7' && <QuestionnaireGAD7 />}
        {currentView === 'resources' && <Resources />}
      </div>
    );
  }
  return <Home onSelectView={setCurrentView} />;
}

function AppContent() {
  const [legalAccepted, setLegalAccepted] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');

  // Avertissement légal 
  if (!legalAccepted) {
    return <LegalWarning onAccept={() => setLegalAccepted(true)} />;
  }

  return (
    <>
      {/* <ThemeToggle /> */}
      <Router currentView={currentView} setCurrentView={setCurrentView} />
    </>
  );
}

function App() {
  return (

    <ErrorBoundary>
      <ThemeProvider switchable={true}>
        <TooltipProvider>
          <Toaster />
          <Analytics /> 
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;