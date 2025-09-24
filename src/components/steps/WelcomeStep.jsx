import Button from '../ui/Button';
import { useWizard } from '../../contexts/WizardContext';

const WelcomeStep = () => {
  const { goToStep } = useWizard();

  const handleStart = () => {
    goToStep('sleep-situation');
  };

  return (
    <div className="welcome-step">
      <div className="welcome-content">
        <h3 className="welcome-subtitle">
          Encuentra tu colchón perfecto en solo 8 pasos
        </h3>
        <p className="welcome-description">
          Te ayudaremos a elegir el colchón ideal basado en tus preferencias de sueño, 
          postura, firmeza y necesidades específicas. Solo te tomará unos minutos.
        </p>
        <ul className="welcome-features">
          <li>✅ Recomendaciones personalizadas</li>
          <li>✅ Basado en tu estilo de vida</li>
          <li>✅ Análisis de materiales y tecnologías</li>
          <li>✅ Opciones para todo presupuesto</li>
        </ul>
      </div>
      <div className="welcome-actions">
        <Button 
          variant="primary" 
          size="large"
          onClick={handleStart}
          aria-label="Comenzar configuración del colchón"
        >
          Comenzar
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;