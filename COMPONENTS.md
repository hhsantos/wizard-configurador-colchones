# 🎨 Guía de Componentes

Esta guía documenta todos los componentes del wizard y cómo usarlos correctamente.

## 🧩 Componentes del Wizard

### WizardContainer
**Ubicación**: `src/components/wizard/WizardContainer.jsx`

Componente principal que gestiona todo el flujo del wizard.

```jsx
import WizardContainer from './components/wizard/WizardContainer';

function App() {
  return (
    <WizardProvider>
      <WizardContainer />
    </WizardProvider>
  );
}
```

**Características**:
- Manejo automático de foco al cambiar pasos
- Actualización del título de página
- Skip link para accesibilidad
- Manejo de errores graceful

---

### WizardStep
**Ubicación**: `src/components/wizard/WizardStep.jsx`

Wrapper genérico para cada pantalla del wizard.

```jsx
<WizardStep title="Mi Paso">
  <div>Contenido del paso</div>
</WizardStep>
```

**Props**:
- `title` (string, requerido): Título del paso mostrado al usuario
- `children` (ReactNode, requerido): Contenido del paso

**Comportamiento**:
- Scroll automático al contenido
- Estructura semántica con `role="region"`
- Identificador único para el título

---

### ProgressIndicator
**Ubicación**: `src/components/wizard/ProgressIndicator.jsx`

Indicador visual y accesible del progreso del usuario.

```jsx
<ProgressIndicator />
```

**Características**:
- Barra de progreso con `role="progressbar"`
- Lista de pasos clickeable con estados visual
- Texto descriptivo con `aria-live="polite"`
- Iconos de completado (✓) para pasos finalizados

**Estados de pasos**:
- `current`: Paso actual (azul)
- `completed`: Paso completado (verde con ✓)
- `disabled`: Paso no accesible (gris)

---

### Navigation
**Ubicación**: `src/components/wizard/Navigation.jsx`

Sistema de navegación entre pasos con validación.

```jsx
<Navigation />
```

**Características**:
- Botones "Atrás" y "Siguiente" contextuales
- Validación automática antes de avanzar
- Feedback inline para campos requeridos
- Botón final "Ver Productos" en último paso

**Lógica de validación**:
```jsx
const canProceed = () => {
  switch (currentStep) {
    case STEPS.SLEEP_SITUATION:
      return answers.sleepSituation !== null;
    case STEPS.SLEEP_POSITION:
      return answers.sleepPosition.length > 0;
    // ... más validaciones
  }
};
```

---

## 🎛️ Componentes UI

### Button
**Ubicación**: `src/components/ui/Button.jsx`

Botón accesible que sigue todas las reglas de AGENTS.md.

```jsx
<Button 
  variant="primary" 
  size="large"
  onClick={handleClick}
  disabled={isDisabled}
  isLoading={isSubmitting}
>
  Continuar
</Button>
```

**Props**:
- `variant`: 'primary' | 'secondary' | 'ghost' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `disabled`: boolean (default: false)
- `isLoading`: boolean (default: false)
- `onClick`: function
- `type`: 'button' | 'submit' | 'reset' (default: 'button')
- `className`: string adicional
- `...props`: Cualquier prop HTML estándar

**Características AGENTS.md**:
- Target mínimo 44px en móvil
- `touch-action: manipulation`
- States de loading con spinner
- Focus rings visibles
- ARIA labels apropiados

---

## 📄 Componentes de Steps

### WelcomeStep
Pantalla de bienvenida con introducción al proceso.

```jsx
<WelcomeStep />
```

**Contenido**:
- Título atractivo
- Lista de beneficios (✅)
- Botón de inicio prominente
- Estimación de tiempo

---

### SleepSituationStep
Pregunta sobre la situación de sueño del usuario.

```jsx
<SleepSituationStep />
```

**Opciones**:
- Solo (🛏️)
- En pareja (👫)
- Variable (🔄)

**Comportamiento**:
- Radio buttons con cards visuales
- Selección única requerida
- Feedback visual de selección

---

### SleepPositionStep
Selección múltiple de posiciones de sueño.

```jsx
<SleepPositionStep />
```

**Opciones**:
- Boca arriba (🛌)
- De lado (😴)
- Boca abajo (😪)
- Posición mixta (🔄)

**Comportamiento**:
- Checkboxes con selección múltiple
- Al menos una opción requerida
- Contador de selecciones
- Recomendaciones por posición

---

### FirmnessStep
Escala de firmeza del 1 al 5.

```jsx
<FirmnessStep />
```

**Opciones**:
1. Muy Suave (☁️)
2. Suave (🪶)
3. Medio (⚖️)
4. Firme (🏔️)
5. Muy Firme (🗿)

**Características**:
- Escala visual clara
- Descripciones detalladas
- Guía de recomendaciones por posición
- Selección única requerida

---

### HealthConcernsStep
Consideraciones de salud opcionales.

```jsx
<HealthConcernsStep />
```

**Opciones**:
- Dolor de espalda (🔴)
- Dolor de cuello (🟡)
- Problemas articulares (🟠)
- Sobrecalentamiento (🔥)
- Alergias (🤧)
- Movimiento nocturno (🌊)
- Ninguna preocupación (✅)

**Comportamiento**:
- Selección múltiple opcional
- Opción "Ninguna" exclusiva
- Recomendaciones específicas por condición

---

### MaterialsStep
Selección del material preferido del colchón.

```jsx
<MaterialsStep />
```

**Opciones**:
- Espuma Viscoelástica (🧽)
- Muelles Ensacados (🏃)
- Látex Natural (🌿)
- Híbrido (⚡)
- Espuma con Gel (❄️)

**Características**:
- Cards detalladas con pros/cons
- Información de "Ideal para"
- Selección única requerida
- Comparación clara de beneficios

---

### BudgetStep
Selección de rango de presupuesto.

```jsx
<BudgetStep />
```

**Rangos**:
- Económico (💰): Hasta €400
- Medio (⚖️): €400 - €800
- Premium (✨): €800 - €1500
- Lujo (👑): Más de €1500
- Sin límite (🎯): Ver todas las opciones

**Características**:
- Cards con información detallada
- Lista de inclusiones por rango
- Notas explicativas
- Consejo sobre coste por noche

---

### SummaryStep
Pantalla final con recomendaciones.

```jsx
<SummaryStep />
```

**Contenido** (preparado):
- Resumen de respuestas
- Recomendaciones personalizadas
- Comparación de productos
- CTAs para ver productos

---

## 🎨 Guías de Estilo

### Iconos
Usar emojis consistentes para mejor reconocimiento:
- ✅ Estados positivos/completado
- 🔴🟡🟠 Niveles de alerta/importancia
- 🛏️😴🏔️ Conceptos relacionados con sueño
- 💰⚖️✨👑 Niveles de precio/calidad

### Cards de Opciones
Estructura consistente:
```jsx
<label className="option-card">
  <input type="radio/checkbox" className="sr-only" />
  <div className="option-content">
    <span className="option-icon">{emoji}</span>
    <h4 className="option-title">{title}</h4>
    <p className="option-description">{description}</p>
    {selected && <span className="selected-indicator">✓</span>}
  </div>
</label>
```

### Estados Visuales
- **Default**: Border gris claro
- **Hover**: Border azul, sombra sutil
- **Selected**: Border azul, background azul claro
- **Focus**: Border azul, outline visible
- **Disabled**: Opacidad reducida, cursor not-allowed

---

## ♿ Accesibilidad

### Checklist por Componente
- [ ] Labels descriptivos en todos los inputs
- [ ] Estados communicados via ARIA
- [ ] Focus management apropiado
- [ ] Keyboard navigation completa
- [ ] Screen reader friendly
- [ ] Color no es única forma de comunicar información
- [ ] Contraste mínimo 4.5:1 (AA) o 7:1 (AAA)

### Patrones Comunes
```jsx
// Radio button group
<fieldset>
  <legend>Pregunta clara</legend>
  {options.map(option => (
    <label key={option.value}>
      <input 
        type="radio" 
        name="groupName"
        aria-describedby="help-text"
      />
      {option.label}
    </label>
  ))}
</fieldset>

// Checkbox group
<fieldset>
  <legend>Selecciona todas las que apliquen</legend>
  {/* checkboxes */}
</fieldset>

// Status updates
<div aria-live="polite" aria-atomic="true">
  Status message here
</div>
```