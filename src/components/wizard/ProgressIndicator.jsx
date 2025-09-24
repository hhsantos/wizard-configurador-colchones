import { useWizard, STEPS } from '../../contexts/WizardContext';

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
    <div className="progress-indicator">
      {/* AGENTS.md: Use polite aria-live for progress updates */}
      <div 
        role="progressbar" 
        aria-valuenow={Math.round(progress)} 
        aria-valuemin="0" 
        aria-valuemax="100"
        aria-label={`Progreso del configurador: ${Math.round(progress)}% completado`}
      >
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${progress}%`,
              // AGENTS.md: Animate compositor-friendly props
              transform: 'translateZ(0)',
              transition: 'width 0.3s ease-out'
            }}
            aria-hidden="true"
          />
        </div>
      </div>
      
      <div className="progress-steps" role="tablist" aria-label="Pasos del configurador">
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
              className={`progress-step ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${!isAccessible ? 'disabled' : ''}`}
              aria-label={`Paso ${stepLabels[step]}${isCompleted ? ' completado' : isCurrent ? ' actual' : isAccessible ? ' disponible' : ' no disponible'}`}
              // AGENTS.md: Hit target ≥24px (mobile ≥44px)
              style={{
                minHeight: '44px',
                minWidth: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span className="step-number" aria-hidden="true">
                {isCompleted ? '✓' : stepLabels[step]}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* AGENTS.md: Use polite aria-live for toasts/inline validation */}
      <p className="progress-text" aria-live="polite" aria-atomic="true">
        Paso {currentStepIndex + 1} de {totalSteps}: {stepTitles[currentStep] || 'Cargando...'}
      </p>
    </div>
  );
};

export default ProgressIndicator;