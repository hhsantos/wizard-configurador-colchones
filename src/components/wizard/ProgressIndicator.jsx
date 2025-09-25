import { useWizard, STEPS } from '../../contexts/WizardContext';
import { Progress } from '@/components/ui/progress';

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

const ProgressIndicator = () => {
  const { currentStep, stepHistory } = useWizard();
  
  const allSteps = Object.values(STEPS);
  const currentStepIndex = allSteps.indexOf(currentStep);
  const totalSteps = allSteps.length;
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;

  const stepLabels = {
    [STEPS.WELCOME]: '1',
    [STEPS.SLEEP_SITUATION]: '2',
    [STEPS.SLEEP_POSITION]: '3',
    [STEPS.FIRMNESS]: '4',
    [STEPS.HEALTH_CONCERNS]: '5',
    [STEPS.MATERIALS]: '6',
    [STEPS.BUDGET]: '7',
    [STEPS.SUMMARY]: '8'
  };

  return (
    <div className="my-4">
      {/* AGENTS.md: Use polite aria-live for progress updates */}
      <Progress 
        value={progress} 
        className="mb-4"
        aria-label={`Progreso del configurador: ${Math.round(progress)}% completado`}
      />
      
      <div className="flex justify-center gap-2 mb-4" role="tablist" aria-label="Pasos del configurador">
        {allSteps.map((step, index) => {
          const isCompleted = stepHistory.includes(step) && step !== currentStep;
          const isCurrent = step === currentStep;
          const isAccessible = index <= currentStepIndex;
          
          return (
            <div 
              key={step}
              role="tab"
              aria-selected={isCurrent}
              aria-disabled={!isAccessible}
              className={`
                min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full border-2 text-sm font-medium
                ${isCompleted ? 'bg-green-500 border-green-500 text-white' : ''}
                ${isCurrent ? 'bg-blue-500 border-blue-500 text-white' : ''}
                ${!isAccessible ? 'bg-gray-200 border-gray-300 text-gray-400' : ''}
                ${isAccessible && !isCurrent && !isCompleted ? 'bg-white border-gray-300 text-gray-700' : ''}
              `}
              aria-label={`Paso ${stepLabels[step]}${isCompleted ? ' completado' : isCurrent ? ' actual' : isAccessible ? ' disponible' : ' no disponible'}`}
            >
              <span aria-hidden="true">
                {isCompleted ? '✓' : stepLabels[step]}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* AGENTS.md: Use polite aria-live for toasts/inline validation */}
      <p className="text-center text-sm text-gray-600" aria-live="polite" aria-atomic="true">
        Paso {currentStepIndex + 1} de {totalSteps}: {stepTitles[currentStep] || 'Cargando...'}
      </p>
    </div>
  );
};

export default ProgressIndicator;