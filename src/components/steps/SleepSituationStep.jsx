import { useWizard } from '../../contexts/WizardContext';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
    <div className="space-y-6">
      <p className="text-gray-600 text-center mb-6">
        Esta información nos ayuda a recomendar el tamaño y características adecuadas.
      </p>
      
      <fieldset className="space-y-4">
        <legend className="text-lg font-medium text-gray-900 mb-4 text-center">
          ¿Cómo duermes habitualmente?
        </legend>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((option) => {
            const isSelected = answers.sleepSituation === option.value;
            
            return (
              <Card
                key={option.value}
                className={cn(
                  "cursor-pointer transition-all duration-200 min-h-[120px]",
                  "hover:shadow-md hover:scale-105",
                  "border-2",
                  isSelected 
                    ? "border-blue-500 bg-blue-50 shadow-md" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handleSituationChange(option.value)}
                // AGENTS.md: Touch targets ≥44px mobile
                style={{ touchAction: 'manipulation' }}
              >
                <CardContent className="p-4 text-center">
                  <input
                    type="radio"
                    name="sleepSituation"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleSituationChange(option.value)}
                    className="sr-only"
                    // AGENTS.md: Keyboard support
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSituationChange(option.value);
                      }
                    }}
                  />
                  <div className="space-y-2">
                    <div className="text-3xl mb-2" aria-hidden="true">
                      {option.icon}
                    </div>
                    <h4 className="font-medium text-gray-900">
                      {option.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                    {isSelected && (
                      <div className="flex items-center justify-center mt-2">
                        <span className="text-blue-600 text-sm font-medium" aria-hidden="true">
                          ✓ Seleccionado
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};

export default SleepSituationStep;