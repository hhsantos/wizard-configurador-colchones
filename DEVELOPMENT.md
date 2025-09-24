# 🚀 Guía de Desarrollo

Esta guía documenta el proceso de desarrollo, patrones utilizados y mejores prácticas para mantener y extender el wizard.

## 🏗️ Arquitectura del Estado

### WizardContext
El estado global se maneja con React Context + useReducer para un control predecible.

```jsx
// Estado inicial
const initialState = {
  currentStep: STEPS.WELCOME,
  answers: {
    sleepSituation: null,
    sleepPosition: [],
    firmness: null,
    partnerFirmness: null,
    healthConcerns: [],
    materialPreference: null,
    budget: null
  },
  recommendations: [],
  isLoading: false,
  stepHistory: [STEPS.WELCOME]
};
```

### Acciones del Reducer
```jsx
// Actualizar respuesta
dispatch({ 
  type: 'SET_ANSWER', 
  key: 'sleepSituation', 
  value: 'solo' 
});

// Navegar a paso
dispatch({ 
  type: 'GO_TO_STEP', 
  step: STEPS.SLEEP_POSITION 
});

// Volver atrás
dispatch({ type: 'GO_BACK' });

// Resetear wizard
dispatch({ type: 'RESET_WIZARD' });
```

### Hook Personalizado
```jsx
const { 
  currentStep, 
  answers, 
  setAnswer, 
  goToStep, 
  goBack 
} = useWizard();
```

## 🧩 Patrones de Desarrollo

### Crear un Nuevo Step

1. **Crear el componente**:
```jsx
// src/components/steps/NewStep.jsx
import { useWizard } from '../../contexts/WizardContext';

const NewStep = () => {
  const { answers, setAnswer } = useWizard();

  const handleOptionChange = (value) => {
    setAnswer('newField', value);
  };

  return (
    <div className="new-step">
      <p className="step-description">
        Descripción clara del paso
      </p>
      
      <fieldset className="options-fieldset">
        <legend className="fieldset-legend">
          Pregunta clara
        </legend>
        
        <div className="options-grid">
          {options.map((option) => (
            <label 
              key={option.value}
              className={`option-card ${answers.newField === option.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="newField"
                value={option.value}
                checked={answers.newField === option.value}
                onChange={() => handleOptionChange(option.value)}
                className="option-input sr-only"
              />
              <div className="option-content">
                <span className="option-icon">{option.icon}</span>
                <h4 className="option-title">{option.title}</h4>
                <p className="option-description">{option.description}</p>
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default NewStep;
```

2. **Actualizar WizardContext**:
```jsx
// Agregar nuevo paso a STEPS
export const STEPS = {
  // ... pasos existentes
  NEW_STEP: 'new-step'
};

// Actualizar estado inicial
const initialState = {
  // ...
  answers: {
    // ... campos existentes
    newField: null
  }
};
```

3. **Registrar en WizardContainer**:
```jsx
// Importar componente
import NewStep from '../steps/NewStep';

// Agregar a stepComponents
const stepComponents = {
  // ... componentes existentes
  [STEPS.NEW_STEP]: NewStep
};

// Agregar título
const stepTitles = {
  // ... títulos existentes
  [STEPS.NEW_STEP]: 'Título del Nuevo Paso'
};
```

4. **Actualizar Navigation**:
```jsx
const getNextStep = () => {
  switch (currentStep) {
    // ... casos existentes
    case STEPS.PREVIOUS_STEP:
      return STEPS.NEW_STEP;
    case STEPS.NEW_STEP:
      return STEPS.NEXT_STEP;
  }
};

const canProceed = () => {
  switch (currentStep) {
    // ... casos existentes
    case STEPS.NEW_STEP:
      return answers.newField !== null; // o lógica específica
  }
};
```

### Tipos de Inputs Soportados

#### Radio Button (Selección única)
```jsx
const options = [
  { value: 'option1', title: 'Opción 1', icon: '🔵' },
  { value: 'option2', title: 'Opción 2', icon: '🟢' }
];

// En el render
<input
  type="radio"
  name="fieldName"
  value={option.value}
  checked={answers.fieldName === option.value}
  onChange={() => setAnswer('fieldName', option.value)}
/>
```

#### Checkbox (Selección múltiple)
```jsx
const handleToggle = (value) => {
  const current = answers.fieldName || [];
  const updated = current.includes(value)
    ? current.filter(v => v !== value)
    : [...current, value];
  setAnswer('fieldName', updated);
};

// En el render
<input
  type="checkbox"
  value={option.value}
  checked={(answers.fieldName || []).includes(option.value)}
  onChange={() => handleToggle(option.value)}
/>
```

#### Range/Slider (Valores numéricos)
```jsx
<input
  type="range"
  min="1"
  max="5"
  value={answers.fieldName || 3}
  onChange={(e) => setAnswer('fieldName', parseInt(e.target.value))}
  aria-label="Escala de 1 a 5"
/>
```

## 🎨 Sistema de Estilos

### Estructura CSS
```css
/* Base */
.component-name {
  /* Estilos base */
}

/* Modificadores */
.component-name--variant {
  /* Variación del componente */
}

/* Estados */
.component-name.is-active,
.component-name.is-disabled {
  /* Estados específicos */
}

/* Elementos internos */
.component-name__element {
  /* Elementos internos del componente */
}
```

### Variables CSS Personalizadas
```css
:root {
  /* Colores */
  --color-primary: #3b82f6;
  --color-success: #10b981;
  --color-danger: #dc2626;
  --color-warning: #f59e0b;
  
  /* Espaciado */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Typography */
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  
  /* Borders */
  --border-radius: 0.375rem;
  --border-width: 1px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
}
```

### Responsive Breakpoints
```css
/* Mobile first approach */
.component {
  /* Estilos móvil */
}

@media (min-width: 640px) {
  /* sm: tablets pequeñas */
}

@media (min-width: 768px) {
  /* md: tablets */
}

@media (min-width: 1024px) {
  /* lg: laptops */
}

@media (min-width: 1280px) {
  /* xl: desktop */
}
```

## 🧪 Testing

### Estructura de Tests
```
src/
├── components/
│   ├── wizard/
│   │   ├── __tests__/
│   │   │   ├── WizardContainer.test.jsx
│   │   │   ├── Navigation.test.jsx
│   │   │   └── ProgressIndicator.test.jsx
│   │   └── WizardContainer.jsx
│   └── steps/
│       ├── __tests__/
│       │   ├── WelcomeStep.test.jsx
│       │   └── SleepSituationStep.test.jsx
│       └── WelcomeStep.jsx
└── contexts/
    ├── __tests__/
    │   └── WizardContext.test.jsx
    └── WizardContext.jsx
```

### Ejemplo de Test
```jsx
// WelcomeStep.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { WizardProvider } from '../../contexts/WizardContext';
import WelcomeStep from '../WelcomeStep';

const WrapperComponent = ({ children }) => (
  <WizardProvider>{children}</WizardProvider>
);

describe('WelcomeStep', () => {
  test('renders welcome message', () => {
    render(<WelcomeStep />, { wrapper: WrapperComponent });
    
    expect(screen.getByText(/encuentra tu colchón perfecto/i))
      .toBeInTheDocument();
  });

  test('navigates to next step on button click', () => {
    render(<WelcomeStep />, { wrapper: WrapperComponent });
    
    const startButton = screen.getByRole('button', { name: /comenzar/i });
    fireEvent.click(startButton);
    
    // Verificar navegación
  });
});
```

### Tests de Accesibilidad
```jsx
import { render } from '@testing-library/react';
import { axe } from '@axe-core/react';

test('should not have accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 🚀 Performance

### Optimizaciones Implementadas

#### Code Splitting
```jsx
// Lazy loading de steps
const WelcomeStep = lazy(() => import('../steps/WelcomeStep'));
const SleepSituationStep = lazy(() => import('../steps/SleepSituationStep'));

// En WizardContainer
<Suspense fallback={<StepSkeleton />}>
  <StepComponent />
</Suspense>
```

#### Memoización
```jsx
// Memoizar componentes pesados
const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* render complejo */}</div>;
});

// Memoizar callbacks
const handleSubmit = useCallback(() => {
  // lógica de submit
}, [dependency]);

// Memoizar valores calculados
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

#### Optimización de Imágenes
```jsx
// Responsive images
<img
  src="/images/hero-mobile.jpg"
  srcSet="/images/hero-mobile.jpg 400w, 
          /images/hero-tablet.jpg 800w,
          /images/hero-desktop.jpg 1200w"
  sizes="(max-width: 640px) 400px,
         (max-width: 1024px) 800px,
         1200px"
  alt="Configurador de colchones"
  loading="lazy"
/>
```

### Métricas a Monitorear
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1

## 🔒 Seguridad

### Validación de Datos
```jsx
// Validation schema (ejemplo con Yup)
const stepSchema = {
  sleepSituation: yup.string().oneOf(['solo', 'pareja', 'variable']).required(),
  sleepPosition: yup.array().of(yup.string()).min(1).required(),
  firmness: yup.number().min(1).max(5).required()
};

// Validación en el step
const validateStep = (stepData) => {
  try {
    stepSchema[currentStep].validateSync(stepData);
    return { isValid: true };
  } catch (error) {
    return { isValid: false, errors: error.errors };
  }
};
```

### Sanitización de Inputs
```jsx
// Sanitizar datos antes de enviar
const sanitizeAnswers = (answers) => {
  return Object.entries(answers).reduce((acc, [key, value]) => {
    if (typeof value === 'string') {
      acc[key] = DOMPurify.sanitize(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
};
```

## 📊 Analytics

### Eventos a Trackear
```jsx
// Navegación entre pasos
const trackStepNavigation = (from, to) => {
  analytics.track('wizard_step_navigation', {
    from_step: from,
    to_step: to,
    timestamp: Date.now()
  });
};

// Selecciones del usuario
const trackUserSelection = (step, field, value) => {
  analytics.track('wizard_user_selection', {
    step,
    field,
    value,
    timestamp: Date.now()
  });
};

// Abandono del wizard
const trackWizardAbandonment = (currentStep, completionPercentage) => {
  analytics.track('wizard_abandonment', {
    exit_step: currentStep,
    completion_percentage: completionPercentage,
    timestamp: Date.now()
  });
};
```

## 🐛 Debugging

### Console Helpers
```jsx
// Debug mode
const DEBUG = process.env.NODE_ENV === 'development';

const debugLog = (message, data) => {
  if (DEBUG) {
    console.log(`[Wizard Debug] ${message}`, data);
  }
};

// En components
useEffect(() => {
  debugLog('Step changed', { 
    currentStep, 
    answers, 
    canProceed: canProceed() 
  });
}, [currentStep]);
```

### Error Boundaries
```jsx
class WizardErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Wizard Error:', error, errorInfo);
    // Enviar a servicio de error reporting
  }

  render() {
    if (this.state.hasError) {
      return <WizardErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}
```

## 🚀 Deployment

### Build Optimization
```json
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'wizard-core': ['./src/contexts/WizardContext.jsx'],
          'wizard-steps': [
            './src/components/steps/WelcomeStep.jsx',
            './src/components/steps/SleepSituationStep.jsx'
          ]
        }
      }
    }
  }
});
```

### Environment Variables
```bash
# .env.production
VITE_API_URL=https://api.production.com
VITE_ANALYTICS_ID=prod_analytics_id
VITE_DEBUG_MODE=false

# .env.development
VITE_API_URL=http://localhost:3000
VITE_ANALYTICS_ID=dev_analytics_id
VITE_DEBUG_MODE=true
```

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm test
      - run: pnpm build
      - run: pnpm lint
      # Deploy steps...
```