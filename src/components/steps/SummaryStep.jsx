import { useWizard } from '../../contexts/WizardContext';
import { useEffect } from 'react';
import Button from '../ui/Button';

const SummaryStep = () => {
  const { answers, recommendations, setRecommendations, resetWizard } = useWizard();

  // Simular generación de recomendaciones
  useEffect(() => {
    const generateRecommendations = () => {
      // Aquí iría la lógica real de matching con base de datos
      const mockRecommendations = [
        {
          id: 1,
          name: 'ColchónMax Premium',
          score: 95,
          price: 599,
          material: answers.materialPreference || 'híbrido',
          firmness: answers.firmness || 3,
          features: ['Aislamiento de movimiento', 'Regulación térmica', 'Garantía 10 años'],
          image: '/colchon1.jpg',
          whyRecommended: 'Perfecto match con tus preferencias de firmeza y posición de sueño'
        },
        {
          id: 2,
          name: 'DreamComfort Deluxe',
          score: 88,
          price: 449,
          material: 'viscoelástica',
          firmness: (answers.firmness || 3) + 1,
          features: ['Espuma con gel', 'Funda lavable', 'Certificado eco'],
          image: '/colchon2.jpg',
          whyRecommended: 'Excelente relación calidad-precio para tus necesidades'
        },
        {
          id: 3,
          name: 'NaturalRest Eco',
          score: 82,
          price: 799,
          material: 'látex',
          firmness: answers.firmness || 3,
          features: ['100% natural', 'Antibacteriano', 'Máxima durabilidad'],
          image: '/colchon3.jpg',
          whyRecommended: 'Opción eco-friendly que cumple tus criterios de salud'
        }
      ];

      setRecommendations(mockRecommendations);
    };

    generateRecommendations();
  }, [answers, setRecommendations]);

  const getAnswerSummary = () => {
    const summary = [];
    
    if (answers.sleepSituation) {
      const situations = {
        solo: 'Duermo solo',
        pareja: 'Duermo en pareja', 
        variable: 'Situación variable'
      };
      summary.push(`🛏️ ${situations[answers.sleepSituation]}`);
    }

    if (answers.sleepPosition?.length > 0) {
      const positions = {
        espalda: 'Boca arriba',
        lado: 'De lado',
        estomago: 'Boca abajo',
        mixta: 'Posición mixta'
      };
      const positionNames = answers.sleepPosition.map(p => positions[p]).join(', ');
      summary.push(`😴 ${positionNames}`);
    }

    if (answers.firmness) {
      const firmness = ['', 'Muy Suave', 'Suave', 'Medio', 'Firme', 'Muy Firme'];
      summary.push(`⚖️ Firmeza: ${firmness[answers.firmness]}`);
    }

    if (answers.materialPreference) {
      const materials = {
        viscoelastica: 'Espuma Viscoelástica',
        muelles: 'Muelles Ensacados',
        latex: 'Látex Natural',
        hibrido: 'Híbrido',
        gel: 'Espuma con Gel'
      };
      summary.push(`🧽 ${materials[answers.materialPreference]}`);
    }

    if (answers.budget) {
      const budgets = {
        economico: 'Hasta €400',
        medio: '€400 - €800',
        premium: '€800 - €1500',
        lujo: 'Más de €1500',
        'sin-limite': 'Sin límite'
      };
      summary.push(`💰 Presupuesto: ${budgets[answers.budget]}`);
    }

    return summary;
  };

  return (
    <div className="summary-step">
      <div className="summary-content">
        <h3 className="summary-subtitle">
          ¡Perfecto! Hemos encontrado tus colchones ideales
        </h3>
        
        <div className="answer-summary">
          <h4>📋 Resumen de tus preferencias:</h4>
          <ul className="summary-list">
            {getAnswerSummary().map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {answers.healthConcerns?.length > 0 && !answers.healthConcerns.includes('ninguno') && (
            <p className="health-note">
              ✨ Hemos considerado tus necesidades de salud específicas
            </p>
          )}
        </div>

        <div className="recommendations">
          <h4>🎯 Tus colchones recomendados:</h4>
          <div className="recommendations-grid">
            {recommendations.map((mattress, index) => (
              <div key={mattress.id} className="recommendation-card">
                <div className="card-header">
                  <div className="card-badge">
                    {index === 0 ? '🏆 Mejor Match' : `#${index + 1}`}
                  </div>
                  <div className="match-score">
                    {mattress.score}% compatible
                  </div>
                </div>
                
                <h5 className="mattress-name">{mattress.name}</h5>
                <p className="mattress-price">€{mattress.price}</p>
                
                <div className="mattress-features">
                  {mattress.features.map((feature, i) => (
                    <span key={i} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <p className="why-recommended">
                  <strong>¿Por qué?</strong> {mattress.whyRecommended}
                </p>
                
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={() => window.open(`/producto/${mattress.id}`, '_blank')}
                >
                  Ver Detalles
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="summary-actions">
          <Button 
            variant="secondary"
            onClick={resetWizard}
            aria-label="Reiniciar configuración"
          >
            Empezar de Nuevo
          </Button>
          <Button 
            variant="primary"
            size="large"
            onClick={() => window.location.href = '/tienda'}
            aria-label="Ir a la tienda"
          >
            Ver Todos los Productos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;