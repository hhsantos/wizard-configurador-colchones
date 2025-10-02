import { useWizard } from '../../contexts/WizardContext';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 mb-2">
          Selecciona todas las posiciones en las que sueles dormir.
        </p> 
        <p className="text-blue-600 font-medium">
          Puedes elegir más de una opción.
        </p>
      </div>
      
      <fieldset className="space-y-4">
        <legend className="sr-only">Selecciona tus posiciones de sueño</legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {positions.map((position) => {
            const isSelected = selectedPositions.includes(position.value);
            const titleId = `position-title-${position.value}`;
            const descId = `position-desc-${position.value}`;
            
            return (
              <Card
                key={position.value}
                className={cn(
                  "cursor-pointer transition-all duration-200 min-h-[140px]",
                  "hover:shadow-md hover:scale-105",
                  "border-2 relative",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-500/50 focus-visible:border-green-500",
                  isSelected 
                    ? "border-green-500 bg-green-50 shadow-md" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handlePositionToggle(position.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePositionToggle(position.value);
                  }
                }}
                role="checkbox"
                aria-checked={isSelected}
                aria-labelledby={titleId}
                aria-describedby={descId}
                tabIndex={0}
                style={{ touchAction: 'manipulation' }}
              >
                <CardContent className="p-4">
                  <input
                    type="checkbox"
                    name="sleepPosition"
                    value={position.value}
                    checked={isSelected}
                    onChange={() => handlePositionToggle(position.value)}
                    className="sr-only"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-3xl" aria-hidden="true">
                        {position.icon}
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold" aria-hidden="true">
                            ✓
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 id={titleId} className="font-medium text-gray-900 mb-1">
                        {position.title}
                      </h4>
                      <p id={descId} className="text-sm text-gray-600 mb-2">
                        {position.description}
                      </p>
                      <small className="text-xs text-blue-600 italic">
                        {position.recommendation}
                      </small>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </fieldset>
      
      {selectedPositions.length > 0 && (
        <div 
          className="text-center p-3 bg-green-50 border border-green-200 rounded-lg" 
          aria-live="polite"
        >
          <p className="text-green-800 font-medium">
            Has seleccionado: {selectedPositions.length} posición{selectedPositions.length > 1 ? 'es' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default SleepPositionStep;