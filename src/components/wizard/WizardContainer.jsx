import { useWizard, STEPS } from '../../contexts/WizardContext';
import { useEffect } from 'react';
import WizardStep from './WizardStep';
import ProgressIndicator from './ProgressIndicator';
import Navigation from './Navigation';
import DarkModeToggle from '../ui/DarkModeToggle';

// Importar steps
import WelcomeStep from '../steps/WelcomeStep';
import SleepSituationStep from '../steps/SleepSituationStep';
import SleepPositionStep from '../steps/SleepPositionStep';
import FirmnessStep from '../steps/FirmnessStep';
import HealthConcernsStep from '../steps/HealthConcernsStep';
import MaterialsStep from '../steps/MaterialsStep';
import BudgetStep from '../steps/BudgetStep';
import SummaryStep from '../steps/SummaryStep';

const stepComponents = {
  [STEPS.WELCOME]: WelcomeStep,
  [STEPS.SLEEP_SITUATION]: SleepSituationStep,
  [STEPS.SLEEP_POSITION]: SleepPositionStep,
  [STEPS.FIRMNESS]: FirmnessStep,
  [STEPS.HEALTH_CONCERNS]: HealthConcernsStep,
  [STEPS.MATERIALS]: MaterialsStep,
  [STEPS.BUDGET]: BudgetStep,
  [STEPS.SUMMARY]: SummaryStep
};

const stepTitles = {
  [STEPS.WELCOME]: 'Bienvenido',
  [STEPS.SLEEP_SITUATION]: 'Situación de sueño',
  [STEPS.SLEEP_POSITION]: 'Posición al dormir',
  [STEPS.FIRMNESS]: 'Firmeza preferida',
  [STEPS.HEALTH_CONCERNS]: 'Consideraciones de salud',
  [STEPS.MATERIALS]: 'Materiales',
  [STEPS.BUDGET]: 'Presupuesto',
  [STEPS.SUMMARY]: 'Tu colchón ideal'
};

const WizardContainer = () => {
  const { currentStep } = useWizard();
  
  const StepComponent = stepComponents[currentStep];
  const stepTitle = stepTitles[currentStep];

  // AGENTS.md: Manage focus (trap, move, and return) per APG patterns
  useEffect(() => {
    // Focus en el contenido principal al cambiar de step
    const mainContent = document.querySelector('[role="main"]');
    if (mainContent) {
      mainContent.focus();
      // AGENTS.md: scroll behavior for focus management
      mainContent.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }

    // AGENTS.md: Update document title to match current context
    document.title = `${stepTitle} - Configurador de Colchones`;
  }, [currentStep, stepTitle]);

  if (!StepComponent) {
    console.error(`No component found for step: ${currentStep}`);
    return (
      <div role="alert" className="error-container">
        <h2>Error en el configurador</h2>
        <p>No se pudo cargar el paso solicitado. Por favor, recarga la página.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 min-h-screen flex flex-col">
      {/* Skip to content link - AGENTS.md requirement */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only fixed left-2 top-2 z-[999] px-4 py-2 bg-primary text-primary-foreground no-underline rounded shadow-lg"
      >
        Saltar al contenido principal
      </a>

      <header className="mb-8 text-center relative">
        {/* Dark mode toggle - positioned in top right */}
        <div className="absolute right-0 top-0">
          <DarkModeToggle />
        </div>
        
        <h1 className="text-3xl font-bold text-foreground mb-4">Configurador de Colchones</h1>
        <ProgressIndicator />
      </header>
      
      <main 
        id="main-content"
        role="main" 
        className="flex-1"
        tabIndex="-1"
        aria-label={`Paso actual: ${stepTitle}`}
        style={{ scrollMarginTop: '2rem' }}
      >
        <WizardStep title={stepTitle}>
          <StepComponent />
        </WizardStep>
      </main>
      
      <Navigation />
    </div>
  );
};

export default WizardContainer;