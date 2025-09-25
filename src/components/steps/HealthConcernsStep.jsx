import { useWizard } from '../../contexts/WizardContext';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 mb-2">
          Selecciona cualquier condición que pueda afectar tu calidad de sueño.
        </p>
        <p className="text-blue-600 font-medium text-sm">
          Esta información es opcional pero nos ayuda a hacer mejores recomendaciones.
        </p>
      </div>
      
      <fieldset className="space-y-4">
        <legend className="sr-only">Selecciona tus consideraciones de salud</legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {healthConcerns.map((concern) => {
            const isSelected = selectedConcerns.includes(concern.value);
            const isNone = concern.value === 'ninguno';
            
            return (
              <Card
                key={concern.value}
                className={cn(
                  "cursor-pointer transition-all duration-200 min-h-[140px]",
                  "hover:shadow-md hover:scale-105",
                  "border-2 relative",
                  isNone && "border-dashed",
                  isSelected 
                    ? isNone 
                      ? "border-gray-500 bg-gray-50 shadow-md"
                      : "border-red-500 bg-red-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handleConcernToggle(concern.value)}
                style={{ touchAction: 'manipulation' }}
              >
                <CardContent className="p-4">
                  <input
                    type="checkbox"
                    name="healthConcerns"
                    value={concern.value}
                    checked={isSelected}
                    onChange={() => handleConcernToggle(concern.value)}
                    className="sr-only"
                  />
                  <div className="space-y-3 h-full flex flex-col">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl" aria-hidden="true">
                        {concern.icon}
                      </div>
                      {isSelected && (
                        <div className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          isNone ? "bg-gray-500" : "bg-red-500"
                        )}>
                          <span className="text-white text-sm font-bold" aria-hidden="true">
                            ✓
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {concern.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {concern.description}
                      </p>
                      <small className={cn(
                        "text-xs italic block",
                        isNone ? "text-gray-600" : "text-red-600"
                      )}>
                        {concern.recommendation}
                      </small>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </fieldset>
      
      {selectedConcerns.length > 0 && (
        <div 
          className={cn(
            "text-center p-3 border rounded-lg",
            selectedConcerns.includes('ninguno') 
              ? "bg-gray-50 border-gray-200 text-gray-800"
              : "bg-red-50 border-red-200 text-red-800"
          )}
          aria-live="polite"
        >
          <p className="font-medium">
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