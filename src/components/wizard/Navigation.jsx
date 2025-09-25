import { useWizard, STEPS } from '../../contexts/WizardContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const { currentStep, goBack, goToStep, stepHistory, answers } = useWizard();
  
  const allSteps = Object.values(STEPS);
  const currentStepIndex = allSteps.indexOf(currentStep);
  const isFirstStep = currentStep === STEPS.WELCOME;
  const isLastStep = currentStep === STEPS.SUMMARY;
  
  // Lógica para determinar el siguiente paso
  const getNextStep = () => {
    switch (currentStep) {
      case STEPS.WELCOME:
        return STEPS.SLEEP_SITUATION;
      case STEPS.SLEEP_SITUATION:
        return STEPS.SLEEP_POSITION;
      case STEPS.SLEEP_POSITION:
        return STEPS.FIRMNESS;
      case STEPS.FIRMNESS:
        return STEPS.HEALTH_CONCERNS;
      case STEPS.HEALTH_CONCERNS:
        return STEPS.MATERIALS;
      case STEPS.MATERIALS:
        return STEPS.BUDGET;
      case STEPS.BUDGET:
        return STEPS.SUMMARY;
      default:
        return null;
    }
  };

  // Validar si se puede avanzar al siguiente paso
  const canProceed = () => {
    switch (currentStep) {
      case STEPS.WELCOME:
        return true;
      case STEPS.SLEEP_SITUATION:
        return answers.sleepSituation !== null;
      case STEPS.SLEEP_POSITION:
        return answers.sleepPosition.length > 0;
      case STEPS.FIRMNESS:
        return answers.firmness !== null;
      case STEPS.HEALTH_CONCERNS:
        return true; // Opcional
      case STEPS.MATERIALS:
        return answers.materialPreference !== null;
      case STEPS.BUDGET:
        return answers.budget !== null;
      default:
        return false;
    }
  };

  const handleNext = () => {
    const nextStep = getNextStep();
    if (nextStep && canProceed()) {
      goToStep(nextStep);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      goBack();
    }
  };

  return (
    <nav className="mt-8 pt-6 border-t border-gray-200" role="navigation" aria-label="Navegación del wizard">
      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isFirstStep}
          aria-label={isFirstStep ? "Primer paso, no se puede retroceder" : "Volver al paso anterior"}
          // AGENTS.md: Keyboard support - Enter key handled by Button component
        >
          ← Atrás
        </Button>
        
        {!isLastStep && (
          <Button
            variant="default"
            onClick={handleNext}
            disabled={!canProceed()}
            aria-label={
              !canProceed() 
                ? "Completa los campos requeridos para continuar" 
                : "Continuar al siguiente paso"
            }
            // AGENTS.md: Submit button behavior
            aria-describedby={!canProceed() ? "next-button-help" : undefined}
          >
            Siguiente →
          </Button>
        )}
        
        {isLastStep && (
          <Button
            variant="default"
            onClick={() => {
              // AGENTS.md: Links are links—use <a>/<Link> for navigation  
              // But this is an action, so button is appropriate
              window.location.href = '/productos';
            }}
            aria-label="Ver productos recomendados"
          >
            Ver Productos →
          </Button>
        )}
      </div>
      
      {/* AGENTS.md: Inline help for validation */}
      {!isLastStep && !canProceed() && (
        <div 
          id="next-button-help" 
          className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded text-sm text-yellow-800 dark:text-yellow-200" 
          aria-live="polite"
          role="status"
        >
          {currentStep === STEPS.SLEEP_SITUATION && "Selecciona cómo duermes para continuar"}
          {currentStep === STEPS.SLEEP_POSITION && "Elige al menos una posición de sueño"}
          {currentStep === STEPS.FIRMNESS && "Selecciona tu nivel de firmeza preferido"}
          {currentStep === STEPS.MATERIALS && "Elige el material que prefieres"}
          {currentStep === STEPS.BUDGET && "Indica tu rango de presupuesto"}
        </div>
      )}
    </nav>
  );
};

export default Navigation;