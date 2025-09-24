import { useWizard } from '../../contexts/WizardContext';

const HealthConcernsStep = () => {
  const { answers, setAnswer } = useWizard();

  const handleConcernToggle = (concern) => {
    const currentConcerns = answers.healthConcerns || [];
    const isSelected = currentConcerns.includes(concern);
    
    let newConcerns;
    if (isSelected) {
      newConcerns = currentConcerns.filter(c => c !== concern);
    } else {
      newConcerns = [...currentConcerns, concern];
    }
    
    setAnswer('healthConcerns', newConcerns);
  };

  const healthConcerns = [
    {
      value: 'dolor-espalda',
      title: 'Dolor de espalda',
      description: 'Dolor crónico o frecuente en la espalda',
      icon: '🔴',
      recommendation: 'Necesitas soporte lumbar adecuado'
    },
    {
      value: 'dolor-cuello',
      title: 'Dolor de cuello',
      description: 'Rigidez o dolor cervical',
      icon: '🟡',
      recommendation: 'Importante la alineación de cabeza y cuello'
    },
    {
      value: 'articulaciones',
      title: 'Problemas articulares',
      description: 'Artritis, dolor en caderas o hombros',
      icon: '🟠',
      recommendation: 'Necesitas alivio de presión en puntos clave'
    },
    {
      value: 'calor',
      title: 'Duermo con calor',
      description: 'Tiendo a sobrecalentarme por la noche',
      icon: '🔥',
      recommendation: 'Materiales transpirables son clave'
    },
    {
      value: 'alergias',
      title: 'Alergias',
      description: 'Sensibilidad a ácaros, polvo o materiales',
      icon: '🤧',
      recommendation: 'Materiales hipoalergénicos recomendados'
    },
    {
      value: 'movimiento',
      title: 'Movimiento nocturno',
      description: 'Mi pareja se mueve mucho o viceversa',
      icon: '🌊',
      recommendation: 'Aislamiento de movimiento es importante'
    },
    {
      value: 'ninguno',
      title: 'Ninguna preocupación especial',
      description: 'No tengo problemas de salud relacionados con el sueño',
      icon: '✅',
      recommendation: 'Puedes enfocarte en comodidad y preferencias'
    }
  ];

  const selectedConcerns = answers.healthConcerns || [];

  return (
    <div className="health-concerns-step">
      <p className="step-description">
        Selecciona cualquier condición que pueda afectar tu calidad de sueño. 
        <strong> Esta información es opcional pero nos ayuda a hacer mejores recomendaciones.</strong>
      </p>
      
      <fieldset className="options-fieldset">
        <legend className="sr-only">Selecciona tus consideraciones de salud</legend>
        
        <div className="concerns-grid">
          {healthConcerns.map((concern) => {
            const isSelected = selectedConcerns.includes(concern.value);
            const isNone = concern.value === 'ninguno';
            
            return (
              <label 
                key={concern.value}
                className={`concern-card ${isSelected ? 'selected' : ''} ${isNone ? 'none-option' : ''}`}
              >
                <input
                  type="checkbox"
                  name="healthConcerns"
                  value={concern.value}
                  checked={isSelected}
                  onChange={() => handleConcernToggle(concern.value)}
                  className="option-input sr-only"
                />
                <div className="concern-content">
                  <span className="concern-icon" aria-hidden="true">
                    {concern.icon}
                  </span>
                  <div className="concern-info">
                    <h4 className="concern-title">{concern.title}</h4>
                    <p className="concern-description">{concern.description}</p>
                    <small className="concern-recommendation">
                      {concern.recommendation}
                    </small>
                  </div>
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
      
      {selectedConcerns.length > 0 && (
        <div className="selection-summary" aria-live="polite">
          <p>
            {selectedConcerns.includes('ninguno') 
              ? 'Sin preocupaciones especiales seleccionadas'
              : `Has seleccionado: ${selectedConcerns.length} consideración${selectedConcerns.length > 1 ? 'es' : ''}`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default HealthConcernsStep;