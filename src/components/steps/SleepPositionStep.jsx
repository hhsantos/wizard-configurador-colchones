import { useWizard } from '../../contexts/WizardContext';

const SleepPositionStep = () => {
  const { answers, setAnswer } = useWizard();

  const handlePositionToggle = (position) => {
    const currentPositions = answers.sleepPosition || [];
    const isSelected = currentPositions.includes(position);
    
    let newPositions;
    if (isSelected) {
      newPositions = currentPositions.filter(p => p !== position);
    } else {
      newPositions = [...currentPositions, position];
    }
    
    setAnswer('sleepPosition', newPositions);
  };

  const positions = [
    {
      value: 'espalda',
      title: 'Boca arriba',
      description: 'Duermo principalmente sobre mi espalda',
      icon: '🛌',
      recommendation: 'Necesitas soporte firme para la columna'
    },
    {
      value: 'lado',
      title: 'De lado',
      description: 'Duermo principalmente de costado',
      icon: '😴',
      recommendation: 'Necesitas contorno para hombros y caderas'
    },
    {
      value: 'estomago',
      title: 'Boca abajo',
      description: 'Duermo principalmente boca abajo',
      icon: '😪',
      recommendation: 'Necesitas superficie más firme'
    },
    {
      value: 'mixta',
      title: 'Posición mixta',
      description: 'Cambio de posición durante la noche',
      icon: '🔄',
      recommendation: 'Necesitas adaptabilidad y balance'
    }
  ];

  const selectedPositions = answers.sleepPosition || [];

  return (
    <div className="sleep-position-step">
      <p className="step-description">
        Selecciona todas las posiciones en las que sueles dormir. 
        <strong> Puedes elegir más de una opción.</strong>
      </p>
      
      <fieldset className="options-fieldset">
        <legend className="sr-only">Selecciona tus posiciones de sueño</legend>
        
        <div className="options-grid">
          {positions.map((position) => {
            const isSelected = selectedPositions.includes(position.value);
            
            return (
              <label 
                key={position.value}
                className={`option-card ${isSelected ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  name="sleepPosition"
                  value={position.value}
                  checked={isSelected}
                  onChange={() => handlePositionToggle(position.value)}
                  className="option-input sr-only"
                />
                <div className="option-content">
                  <span className="option-icon" aria-hidden="true">
                    {position.icon}
                  </span>
                  <h4 className="option-title">{position.title}</h4>
                  <p className="option-description">{position.description}</p>
                  <small className="option-recommendation">
                    {position.recommendation}
                  </small>
                </div>
                {isSelected && (
                  <span className="selected-indicator" aria-hidden="true">
                    ✓
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>
      
      {selectedPositions.length > 0 && (
        <div className="selection-summary" aria-live="polite">
          <p>Has seleccionado: {selectedPositions.length} posición{selectedPositions.length > 1 ? 'es' : ''}</p>
        </div>
      )}
    </div>
  );
};

export default SleepPositionStep;