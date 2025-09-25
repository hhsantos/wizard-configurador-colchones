import { useWizard } from '../../contexts/WizardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const MaterialsStep = () => {
  const { answers, setAnswer } = useWizard();

  const handleMaterialChange = (material) => {
    setAnswer('materialPreference', material);
  };

  const materials = [
    {
      value: 'viscoelastica',
      title: 'Espuma Viscoelástica',
      description: 'Memory foam que se adapta al cuerpo',
      icon: '🧽',
      pros: ['Excelente contorno corporal', 'Alivio de presión', 'Aislamiento de movimiento'],
      cons: ['Puede retener calor', 'Respuesta lenta'],
      bestFor: 'Dolor articular, durmientes de lado'
    },
    {
      value: 'muelles',
      title: 'Muelles Ensacados',
      description: 'Resortes individuales para soporte',
      icon: '🏃',
      pros: ['Excelente transpirabilidad', 'Respuesta inmediata', 'Buen soporte'],
      cons: ['Menos contorno', 'Posible transferencia de movimiento'],
      bestFor: 'Durmientes calurosos, quien prefiere firmeza'
    },
    {
      value: 'latex',
      title: 'Látex Natural',
      description: 'Material natural elástico y duradero',
      icon: '🌿',
      pros: ['Muy duradero', 'Naturalmente fresco', 'Buen rebote'],
      cons: ['Más caro', 'Sensación única'],
      bestFor: 'Eco-conscientes, durmientes activos'
    },
    {
      value: 'hibrido',
      title: 'Híbrido',
      description: 'Combinación de espuma y muelles',
      icon: '⚡',
      pros: ['Balance de beneficios', 'Soporte y contorno', 'Versatilidad'],
      cons: ['Más complejo', 'Precio variable'],
      bestFor: 'Parejas con preferencias diferentes'
    },
    {
      value: 'gel',
      title: 'Espuma con Gel',
      description: 'Espuma infundida con gel refrigerante',
      icon: '❄️',
      pros: ['Regulación de temperatura', 'Contorno corporal', 'Frescura'],
      cons: ['Durabilidad variable', 'Costo medio-alto'],
      bestFor: 'Durmientes calurosos que necesitan contorno'
    }
  ];

  return (
    <div className="space-y-6">
      <p className="text-gray-600 text-center mb-6">
        Cada material ofrece beneficios únicos. Considera tus necesidades de temperatura, 
        soporte y sensación al tacto.
      </p>
      
      <fieldset className="space-y-4">
        <legend className="sr-only">Selecciona tu material preferido</legend>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {materials.map((material) => {
            const isSelected = answers.materialPreference === material.value;
            
            return (
              <Card
                key={material.value}
                className={cn(
                  "cursor-pointer transition-all duration-200 min-h-[280px]",
                  "hover:shadow-lg hover:scale-105",
                  "border-2",
                  isSelected 
                    ? "border-indigo-500 bg-indigo-50 shadow-lg" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handleMaterialChange(material.value)}
                style={{ touchAction: 'manipulation' }}
              >
                <CardHeader className="pb-3">
                  <input
                    type="radio"
                    name="materialPreference"
                    value={material.value}
                    checked={isSelected}
                    onChange={() => handleMaterialChange(material.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <div className="text-3xl" aria-hidden="true">
                      {material.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {material.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {material.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold" aria-hidden="true">
                          ✓
                        </span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                        <span className="mr-1">✅</span> Ventajas:
                      </h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {material.pros.map((pro, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-1 mt-0.5">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-orange-700 mb-2 flex items-center">
                        <span className="mr-1">⚠️</span> Consideraciones:
                      </h5>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {material.cons.map((con, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-orange-500 mr-1 mt-0.5">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm">
                      <span className="font-medium text-indigo-700">Ideal para:</span>{' '}
                      <span className="text-gray-700">{material.bestFor}</span>
                    </p>
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

export default MaterialsStep;