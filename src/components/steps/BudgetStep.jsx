import { useWizard } from '../../contexts/WizardContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-600 mb-2">
          Selecciona el rango de presupuesto que mejor se adapte a ti.
        </p>
        <p className="text-blue-600 font-medium">
          Recuerda que un buen colchón es una inversión en tu salud y bienestar.
        </p>
      </div>
      
      <fieldset className="space-y-4">
        <legend className="sr-only">Selecciona tu rango de presupuesto</legend>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {budgetRanges.map((budget) => {
            const isSelected = answers.budget === budget.value;
            const isNoLimit = budget.value === 'sin-limite';
            const titleId = `budget-title-${budget.value}`;
            const descId = `budget-desc-${budget.value}`;
            
            return (
              <Card
                key={budget.value}
                className={cn(
                  "cursor-pointer transition-all duration-200 min-h-[200px]",
                  "hover:shadow-lg hover:scale-105",
                  "border-2",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:border-emerald-500",
                  isNoLimit && "border-dashed",
                  isNoLimit && "focus-visible:ring-gray-500/50",
                  !isNoLimit && "focus-visible:ring-emerald-500/50",
                  isSelected 
                    ? isNoLimit
                      ? "border-gray-500 bg-gray-50 shadow-lg"
                      : "border-emerald-500 bg-emerald-50 shadow-lg" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handleBudgetChange(budget.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleBudgetChange(budget.value);
                  }
                }}
                role="radio"
                aria-checked={isSelected}
                aria-labelledby={titleId}
                aria-describedby={descId}
                tabIndex={0}
                style={{ touchAction: 'manipulation' }}
              >
                <CardHeader className="pb-3">
                  <input
                    type="radio"
                    name="budget"
                    value={budget.value}
                    checked={isSelected}
                    onChange={() => handleBudgetChange(budget.value)}
                    className="sr-only"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                  <div className="flex items-center gap-3">
                    <div className="text-2xl" aria-hidden="true">
                      {budget.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle id={titleId} className="text-lg font-semibold text-gray-900">
                        {budget.title}
                      </CardTitle>
                      <p className={cn(
                        "text-sm font-medium mt-1",
                        isNoLimit ? "text-gray-600" : "text-emerald-600"
                      )}>
                        {budget.range}
                      </p>
                    </div>
                    {isSelected && (
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center",
                        isNoLimit ? "bg-gray-500" : "bg-emerald-500"
                      )}>
                        <span className="text-white text-sm font-bold" aria-hidden="true">
                          ✓
                        </span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-3">
                  <p id={descId} className="text-sm text-gray-600">
                    {budget.description}
                  </p>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Incluye:</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {budget.includes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-emerald-500 mr-2 mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <p className="text-xs text-gray-500 italic pt-2 border-t border-gray-200">
                    {budget.note}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </fieldset>
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
            <span className="mr-2">💡</span>
            Consejo de inversión:
          </h4>
          <p className="text-sm text-blue-800">
            Un colchón de calidad dura 8-10 años. Divide el precio entre los días de uso 
            para ver el coste real por noche de sueño reparador.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetStep;