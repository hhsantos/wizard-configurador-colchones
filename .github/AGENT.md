# 🤖 AGENT.md - Instrucciones para Agentes de Codificación IA

Este archivo contiene instrucciones específicas para agentes de codificación IA que colaboran en el proyecto **Wizard de Configuración de Colchones**.

## 🎯 Contexto del Proyecto

Este es un **wizard interactivo de 8 pasos** construido en React que guía a usuarios para encontrar el colchón perfecto. El proyecto prioriza **accesibilidad**, **experiencia móvil** y **usabilidad** siguiendo estrictamente las reglas de **AGENTS.md**.

### Arquitectura Clave
- **Estado global**: React Context + useReducer
- **Componentes modulares**: wizard/, steps/, ui/
- **Navegación condicional**: Validación automática por paso
- **Estilo móvil-first**: CSS con custom properties

## 📋 Reglas Obligatorias para Agentes IA

### 1. Siempre seguir AGENTS.md
- **MUST**: Todos los targets interactivos ≥44px en móvil
- **MUST**: Font-size ≥16px en inputs móviles
- **MUST**: Focus rings visibles con `:focus-visible`
- **MUST**: Navegación completa por teclado
- **MUST**: `aria-live="polite"` para cambios dinámicos
- **MUST**: Respectar `prefers-reduced-motion`

### 2. Patrones de Componentes Específicos

#### Nuevo Step del Wizard
```jsx
// Template obligatorio para nuevos steps
const NewStep = () => {
  const { answers, setAnswer } = useWizard();

  return (
    <div className="new-step">
      <p className="step-description">Descripción clara</p>
      
      <fieldset className="options-fieldset">
        <legend className="fieldset-legend">Pregunta clara</legend>
        
        <div className="options-grid">
          {options.map((option) => (
            <label 
              key={option.value}
              className={`option-card ${selected ? 'selected' : ''}`}
              style={{ minHeight: '44px', touchAction: 'manipulation' }}
            >
              <input type="radio/checkbox" className="option-input sr-only" />
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
```

#### Validación de Steps
```jsx
// Siempre agregar validación en Navigation.jsx
const canProceed = () => {
  switch (currentStep) {
    case STEPS.NEW_STEP:
      return answers.newField !== null; // o lógica específica
  }
};
```

### 3. Gestión de Estado
- **MUST**: Usar `setAnswer(key, value)` para actualizar respuestas
- **MUST**: Validar datos antes de proceder al siguiente paso
- **MUST**: Mantener historial de navegación para botón "Atrás"
- **NEVER**: Mutar el estado directamente

### 4. Estilos y CSS
- **MUST**: Usar clases existentes antes de crear nuevas
- **MUST**: Mantener consistencia visual con cards de opciones
- **MUST**: Incluir estados hover, focus, selected, disabled
- **MUST**: Responsive con mobile-first approach

### 5. Accesibilidad Específica del Wizard
```jsx
// Fieldsets obligatorios para grupos de opciones
<fieldset className="options-fieldset">
  <legend className="fieldset-legend">Pregunta clara</legend>
  {/* opciones */}
</fieldset>

// ARIA labels descriptivos
<button aria-label="Continuar al paso de firmeza">Siguiente</button>

// Estados para screen readers
<div aria-live="polite">Has seleccionado: {selection}</div>
```

## 🔧 Flujo de Desarrollo

### Al Crear Nueva Funcionalidad
1. **Revisar AGENTS.md** - Verificar compliance
2. **Estudiar componentes existentes** - Mantener consistencia
3. **Implementar accesibilidad first** - No como afterthought
4. **Testear navegación por teclado** - Tab, Enter, Escape
5. **Verificar en móvil** - Targets, font-size, touch

### Al Modificar Existente
1. **Entender el contexto** - Leer documentación relacionada
2. **Preservar patrones establecidos** - No romper consistencia
3. **Actualizar documentación** - COMPONENTS.md, README
4. **Verificar no regresiones** - Especialmente accesibilidad

## 📚 Archivos Clave de Referencia

### Para Entender el Proyecto
- `README.md` - Visión general y setup
- `COMPONENTS.md` - Documentación de componentes
- `DEVELOPMENT.md` - Patrones y mejores prácticas
- `src/contexts/WizardContext.jsx` - Estado global
- `src/components/wizard/wizard.css` - Estilos base

### Para Nuevas Implementaciones
- `src/components/steps/SleepSituationStep.jsx` - Radio buttons
- `src/components/steps/SleepPositionStep.jsx` - Checkboxes múltiples
- `src/components/steps/FirmnessStep.jsx` - Escala numérica
- `src/components/wizard/Navigation.jsx` - Lógica de validación

## 🚨 Errores Comunes a Evitar

### ❌ NO hacer
- Crear targets interactivos < 44px en móvil
- Omitir focus management al cambiar pasos
- Usar solo color para comunicar estados
- Crear inputs sin labels asociados
- Añadir animaciones sin considerar `prefers-reduced-motion`
- Mutar estado directamente en lugar de usar setAnswer
- Crear nuevos patrones sin justificación

### ✅ SÍ hacer
- Seguir patrones existentes de option-card
- Usar semantic HTML (fieldset, legend, labels)
- Incluir feedback visual y auditivo
- Testear con teclado únicamente
- Verificar contraste de colores
- Mantener consistencia de iconos y terminología
- Documentar cambios significativos

## 🎨 Convenciones de Naming

### Componentes
- `PascalCase` para nombres de componentes
- Sufijo `Step` para pantallas del wizard
- Nombres descriptivos: `SleepPositionStep` vs `Step3`

### CSS Classes
- `kebab-case` para todas las clases
- Patrón BEM para componentes complejos: `option-card`, `option-card__title`, `option-card--selected`
- Prefijos consistentes: `wizard-`, `step-`, `nav-`

### Variables y Funciones
- `camelCase` para variables y funciones
- Nombres descriptivos: `handleOptionChange` vs `handleChange`
- Constantes en `UPPER_CASE`: `STEPS.SLEEP_POSITION`

## 📊 Métricas de Calidad

### Accesibilidad
- [ ] Navegación 100% funcional con teclado
- [ ] Score 100 en Lighthouse Accessibility
- [ ] Testeo con screen reader (NVDA/VoiceOver)
- [ ] Contraste mínimo 4.5:1 (preferible 7:1)

### Performance
- [ ] FCP < 1.8s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Bundle size reasonably small

### UX
- [ ] Funciona sin JavaScript para contenido básico
- [ ] Graceful degradation en browsers antiguos
- [ ] Estados de loading claros
- [ ] Mensajes de error útiles

## 🔄 Proceso de Update

Cuando este archivo se actualice:
1. **Notificar a todos los agentes** de los cambios
2. **Revisar código existente** contra nuevas reglas
3. **Actualizar documentación relacionada**
4. **Crear tasks para compliance** si es necesario

---

**Última actualización**: 24 de septiembre de 2025
**Versión**: 1.0.0
**Mantenedor**: Equipo de desarrollo del wizard

> 💡 **Recordatorio**: Este es un proyecto de alta calidad que prioriza la experiencia del usuario. Cada línea de código debe contribuir a esa meta.