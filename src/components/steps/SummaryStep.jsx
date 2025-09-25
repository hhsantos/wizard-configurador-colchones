import { useWizard } from '../../contexts/WizardContext';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

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
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          ¡Perfecto! Hemos encontrado tus colchones ideales
        </h3>
      </div>
      
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-900 flex items-center">
            <span className="mr-2">📋</span>
            Resumen de tus preferencias:
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {getAnswerSummary().map((item, index) => (
              <div key={index} className="flex items-center text-sm text-blue-800 bg-white/60 rounded-lg px-3 py-2">
                {item}
              </div>
            ))}
          </div>
          {answers.healthConcerns?.length > 0 && !answers.healthConcerns.includes('ninguno') && (
            <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">
                ✨ Hemos considerado tus necesidades de salud específicas
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div>
        <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">
          🎯 Tus colchones recomendados:
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recommendations.map((mattress, index) => (
            <Card
              key={mattress.id}
              className={cn(
                "relative transition-all duration-200 hover:shadow-lg hover:scale-105",
                index === 0 
                  ? "border-2 border-gold-400 bg-gradient-to-br from-yellow-50 to-orange-50" 
                  : "border border-gray-200"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-bold",
                    index === 0 
                      ? "bg-yellow-500 text-white" 
                      : "bg-gray-300 text-gray-900"
                  )}>
                    {index === 0 ? '🏆 Mejor Match' : `#${index + 1}`}
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    {mattress.score}% compatible
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  {mattress.name}
                </CardTitle>
                <p className="text-2xl font-bold text-green-600">
                  €{mattress.price}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {mattress.features.map((feature, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">¿Por qué?</span> {mattress.whyRecommended}
                  </p>
                </div>
                
                <Button 
                  variant="default" 
                  size="sm"
                  className="w-full"
                  onClick={() => window.open(`/producto/${mattress.id}`, '_blank')}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-6 border-t border-gray-200">
        <Button 
          variant="outline"
          onClick={resetWizard}
          aria-label="Reiniciar configuración"
        >
          Empezar de Nuevo
        </Button>
        <Button 
          variant="default"
          size="lg"
          onClick={() => window.location.href = '/tienda'}
          aria-label="Ir a la tienda"
          className="px-8"
        >
          Ver Todos los Productos
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;