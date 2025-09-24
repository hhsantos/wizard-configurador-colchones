import { useWizard } from '../../contexts/WizardContext';

const SleepSituationStep = () => {
  const { answers, setAnswer } = useWizard();

  const handleSituationChange = (situation) => {
    setAnswer('sleepSituation', situation);
  };

  const options = [
    {
      value: 'solo',
      title: 'Duermo solo',
      description: 'Tengo la cama para mí',
      icon: '🛏️'
    },
    {
      value: 'pareja',
      title: 'Duermo en pareja',
      description: 'Compartimos la cama regularmente',
      icon: '👫'
    },
    {
      value: 'variable',
      title: 'Variable',
      description: 'A veces solo, a veces acompañado',
      icon: '🔄'
    }
  ];

  return (
    <div className="sleep-situation-step">
      <p className="step-description">
        Esta información nos ayuda a recomendar el tamaño y características adecuadas.
      </p>
      
      <fieldset className="options-fieldset">
        <legend className="fieldset-legend">¿Cómo duermes habitualmente?</legend>
        
        <div className="options-grid">
          {options.map((option) => (
            <label 
              key={option.value}
              className={`option-card ${answers.sleepSituation === option.value ? 'selected' : ''}`}
              // AGENTS.md: Hit target ≥24px (mobile ≥44px) + No dead zones on checkboxes/radios
              style={{
                minHeight: '44px',
                cursor: 'pointer',
                touchAction: 'manipulation',
                display: 'block'
              }}
            >
              <input
                type="radio"
                name="sleepSituation"
                value={option.value}
                checked={answers.sleepSituation === option.value}
                onChange={() => handleSituationChange(option.value)}
                className="option-input sr-only"
                // AGENTS.md: Keyboard support
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSituationChange(option.value);
                  }
                }}
              />
              <div className="option-content">
                <span className="option-icon" aria-hidden="true">
                  {option.icon}
                </span>
                <h4 className="option-title">{option.title}</h4>
                <p className="option-description">{option.description}</p>
                {answers.sleepSituation === option.value && (
                  <span className="selected-indicator" aria-hidden="true">
                    ✓ Seleccionado
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default SleepSituationStep;