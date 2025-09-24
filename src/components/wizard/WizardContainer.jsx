import { useWizard, STEPS } from '../../contexts/WizardContext';
import { useEffect } from 'react';
import WizardStep from './WizardStep';
import ProgressIndicator from './ProgressIndicator';
import Navigation from './Navigation';

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
    <div className="wizard-container">
      {/* Skip to content link - AGENTS.md requirement */}
      <a 
        href="#main-content" 
        className="skip-link"
        style={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 999,
          padding: '8px 16px',
          background: '#000',
          color: '#fff',
          textDecoration: 'none'
        }}
        onFocus={(e) => {
          e.target.style.left = '8px';
          e.target.style.top = '8px';
        }}
        onBlur={(e) => {
          e.target.style.left = '-9999px';
        }}
      >
        Saltar al contenido principal
      </a>

      <header className="wizard-header">
        <h1 className="wizard-title">Configurador de Colchones</h1>
        <ProgressIndicator />
      </header>
      
      <main 
        id="main-content"
        role="main" 
        className="wizard-main"
        tabIndex="-1"
        aria-label={`Paso actual: ${stepTitle}`}
        // AGENTS.md: scroll-margin-top for anchored links
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