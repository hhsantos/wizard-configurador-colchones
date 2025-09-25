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
    <div className="materials-step">
      <p className="step-description">
        Cada material ofrece beneficios únicos. Considera tus necesidades de temperatura, 
        soporte y sensación al tacto.
      </p>
      
      <fieldset className="options-fieldset">
        <legend className="sr-only">Selecciona tu material preferido</legend>
        
        <div className="materials-grid">
          {materials.map((material) => (
            <label 
              key={material.value}
              className={`material-card ${answers.materialPreference === material.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="materialPreference"
                value={material.value}
                checked={answers.materialPreference === material.value}
                onChange={() => handleMaterialChange(material.value)}
                className="option-input sr-only"
              />
              <div className="material-content">
                <div className="material-header">
                  <span className="material-icon" aria-hidden="true">
                    {material.icon}
                  </span>
                  <div>
                    <h4 className="material-title">{material.title}</h4>
                    <p className="material-description">{material.description}</p>
                  </div>
                </div>
                
                <div className="material-details">
                  <div className="pros-cons">
                    <div className="pros">
                      <h5>✅ Ventajas:</h5>
                      <ul>
                        {material.pros.map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="cons">
                      <h5>⚠️ Consideraciones:</h5>
                      <ul>
                        {material.cons.map((con, index) => (
                          <li key={index}>{con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="best-for">
                    <strong>Ideal para:</strong> {material.bestFor}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default MaterialsStep;