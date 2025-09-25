import { useWizard } from '../../contexts/WizardContext';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
    <div className="space-y-6">
      <p className="text-gray-600 text-center mb-6">
        La firmeza afecta el soporte y comodidad. Considera tu peso corporal y posiciones de sueño.
      </p>
      
      <fieldset className="space-y-6">
        <legend className="sr-only">Selecciona tu nivel de firmeza preferido</legend>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {firmnessLevels.map((level) => {
            const isSelected = answers.firmness === level.value;
            
            return (
              <Card
                key={level.value}
                className={cn(
                  "cursor-pointer transition-all duration-200 min-h-[160px]",
                  "hover:shadow-md hover:scale-105",
                  "border-2 relative",
                  isSelected 
                    ? "border-purple-500 bg-purple-50 shadow-md" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handleFirmnessChange(level.value)}
                style={{ touchAction: 'manipulation' }}
              >
                <CardContent className="p-3 text-center h-full flex flex-col justify-between">
                  <input
                    type="radio"
                    name="firmness"
                    value={level.value}
                    checked={isSelected}
                    onChange={() => handleFirmnessChange(level.value)}
                    className="sr-only"
                  />
                  <div className="space-y-2">
                    <div className="text-2xl mb-2" aria-hidden="true">
                      {level.icon}
                    </div>
                    <div className={cn(
                      "w-8 h-8 rounded-full mx-auto flex items-center justify-center text-sm font-bold",
                      isSelected ? "bg-purple-500 text-white" : "bg-gray-300 text-gray-800"
                    )}>
                      {level.value}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-gray-900 text-sm">
                      {level.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {level.description}
                    </p>
                    <small className="text-xs text-purple-600 italic block">
                      {level.details}
                    </small>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </fieldset>
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-3 flex items-center">
            <span className="mr-2">💡</span>
            Guía rápida por posición de sueño:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-800"><strong>De lado:</strong></span>
              <span className="text-blue-600">Suave a Medio (2-3)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800"><strong>Boca arriba:</strong></span>
              <span className="text-blue-600">Medio a Firme (3-4)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800"><strong>Boca abajo:</strong></span>
              <span className="text-blue-600">Firme a Muy Firme (4-5)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-800"><strong>Peso mayor:</strong></span>
              <span className="text-blue-600">Más firme recomendado</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirmnessStep;