import { useWizard } from '../../contexts/WizardContext';

const BudgetStep = () => {
  const { answers, setAnswer } = useWizard();

  const handleBudgetChange = (budget) => {
    setAnswer('budget', budget);
  };

  const budgetRanges = [
    {
      value: 'economico',
      title: 'Económico',
      range: 'Hasta €400',
      description: 'Opciones básicas con buena relación calidad-precio',
      icon: '💰',
      includes: ['Garantía estándar', 'Materiales básicos', 'Entrega gratuita'],
      note: 'Perfecto para comenzar o presupuestos ajustados'
    },
    {
      value: 'medio',
      title: 'Medio',
      range: '€400 - €800',
      description: 'Balance ideal entre calidad y precio',
      icon: '⚖️',
      includes: ['Mejores materiales', 'Mayor durabilidad', 'Más opciones de firmeza'],
      note: 'La opción más popular entre nuestros clientes'
    },
    {
      value: 'premium',
      title: 'Premium',
      range: '€800 - €1500',
      description: 'Calidad superior y características avanzadas',
      icon: '✨',
      includes: ['Materiales premium', 'Tecnología avanzada', 'Garantía extendida'],
      note: 'Máxima comodidad y durabilidad'
    },
    {
      value: 'lujo',
      title: 'Lujo',
      range: 'Más de €1500',
      description: 'Lo mejor en colchones, sin compromisos',
      icon: '👑',
      includes: ['Materiales exclusivos', 'Personalización completa', 'Servicio VIP'],
      note: 'La experiencia de sueño definitiva'
    },
    {
      value: 'sin-limite',
      title: 'Ver todas las opciones',
      range: 'Sin límite de precio',
      description: 'Mostrar todos los colchones disponibles',
      icon: '🎯',
      includes: ['Acceso completo', 'Todas las gamas', 'Comparación total'],
      note: 'Explora todo nuestro catálogo'
    }
  ];

  return (
    <div className="budget-step">
      <p className="step-description">
        Selecciona el rango de presupuesto que mejor se adapte a ti. 
        <strong> Recuerda que un buen colchón es una inversión en tu salud y bienestar.</strong>
      </p>
      
      <fieldset className="options-fieldset">
        <legend className="sr-only">Selecciona tu rango de presupuesto</legend>
        
        <div className="budget-options">
          {budgetRanges.map((budget) => (
            <label 
              key={budget.value}
              className={`budget-card ${answers.budget === budget.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="budget"
                value={budget.value}
                checked={answers.budget === budget.value}
                onChange={() => handleBudgetChange(budget.value)}
                className="option-input sr-only"
              />
              <div className="budget-content">
                <div className="budget-header">
                  <span className="budget-icon" aria-hidden="true">
                    {budget.icon}
                  </span>
                  <div className="budget-info">
                    <h4 className="budget-title">{budget.title}</h4>
                    <p className="budget-range">{budget.range}</p>
                  </div>
                </div>
                
                <p className="budget-description">{budget.description}</p>
                
                <div className="budget-includes">
                  <h5>Incluye:</h5>
                  <ul>
                    {budget.includes.map((item, index) => (
                      <li key={index}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
                
                <p className="budget-note">
                  <em>{budget.note}</em>
                </p>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
      
      <div className="budget-tip">
        <h4>💡 Consejo:</h4>
        <p>
          Un colchón de calidad dura 8-10 años. Divide el precio entre los días de uso 
          para ver el coste real por noche de sueño reparador.
        </p>
      </div>
    </div>
  );
};

export default BudgetStep;