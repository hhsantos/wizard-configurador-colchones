import { Button } from '@/components/ui/button';
import { useWizard } from '../../contexts/WizardContext';

const WelcomeStep = () => {
  const { goToStep } = useWizard();

  const handleStart = () => {
    goToStep('sleep-situation');
  };

  return (
    <div className="text-center space-y-6">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold text-foreground mb-4">
          Encuentra tu colchón perfecto en solo 8 pasos
        </h3>
        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
          Te ayudaremos a elegir el colchón ideal basado en tus preferencias de sueño, 
          postura, firmeza y necesidades específicas. Solo te tomará unos minutos.
        </p>
        <ul className="text-left space-y-3 mb-8 max-w-md mx-auto">
                    <li className="flex items-center text-foreground">
            <span className="text-green-500 mr-3">✅</span> 
            Recomendaciones personalizadas
          </li>
          <li className="flex items-center text-foreground">
            <span className="text-green-500 mr-3">✅</span> 
            Basado en ciencia del sueño
          </li>
          <li className="flex items-center text-foreground">
            <span className="text-green-500 mr-3">✅</span> 
            Comparación de materiales
          </li>
          <li className="flex items-center text-foreground">
            <span className="text-green-500 mr-3">✅</span> 
            Opciones para todo presupuesto
          </li>
        </ul>
      </div>
      <div>
        <Button 
          variant="default" 
          size="lg"
          onClick={handleStart}
          aria-label="Comenzar configuración del colchón"
          className="px-8 py-3"
        >
          Comenzar
        </Button>
      </div>
    </div>
  );
};

export default WelcomeStep;