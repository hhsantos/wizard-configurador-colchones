import { useWizard } from '../../contexts/WizardContext';

const FirmnessStep = () => {
  const { answers, setAnswer } = useWizard();

  const handleFirmnessChange = (firmness) => {
    setAnswer('firmness', firmness);
  };

  const firmnessLevels = [
    {
      value: 1,
      title: 'Muy Suave',
      description: 'Como hundirse en una nube',
      icon: '☁️',
      details: 'Ideal para quien le gusta la sensación envolvente'
    },
    {
      value: 2,
      title: 'Suave',
      description: 'Cómodo y acogedor',
      icon: '🪶',
      details: 'Buen contorno corporal, perfecto para lado'
    },
    {
      value: 3,
      title: 'Medio',
      description: 'Balance perfecto',
      icon: '⚖️',
      details: 'La opción más popular, adaptable a varias posiciones'
    },
    {
      value: 4,
      title: 'Firme',
      description: 'Soporte sólido',
      icon: '🏔️',
      details: 'Excelente soporte, ideal para espalda y estómago'
    },
    {
      value: 5,
      title: 'Muy Firme',
      description: 'Máximo soporte',
      icon: '🗿',
      details: 'Soporte ortopédico, mínima flexión'
    }
  ];

  return (
    <div className="firmness-step">
      <p className="step-description">
        La firmeza afecta el soporte y comodidad. Considera tu peso corporal y posiciones de sueño.
      </p>
      
      <fieldset className="options-fieldset">
        <legend className="sr-only">Selecciona tu nivel de firmeza preferido</legend>
        
        <div className="firmness-scale">
          {firmnessLevels.map((level) => (
            <label 
              key={level.value}
              className={`firmness-option ${answers.firmness === level.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="firmness"
                value={level.value}
                checked={answers.firmness === level.value}
                onChange={() => handleFirmnessChange(level.value)}
                className="option-input sr-only"
              />
              <div className="firmness-content">
                <span className="firmness-icon" aria-hidden="true">
                  {level.icon}
                </span>
                <div className="firmness-info">
                  <h4 className="firmness-title">{level.title}</h4>
                  <p className="firmness-description">{level.description}</p>
                  <small className="firmness-details">{level.details}</small>
                </div>
                <div className="firmness-level">
                  <span className="level-number">{level.value}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
      
      <div className="firmness-guide">
        <h4>💡 Guía rápida:</h4>
        <ul>
          <li><strong>Lado:</strong> Suave a Medio (2-3)</li>
          <li><strong>Espalda:</strong> Medio a Firme (3-4)</li>
          <li><strong>Estómago:</strong> Firme a Muy Firme (4-5)</li>
          <li><strong>Peso mayor:</strong> Más firme</li>
        </ul>
      </div>
    </div>
  );
};

export default FirmnessStep;