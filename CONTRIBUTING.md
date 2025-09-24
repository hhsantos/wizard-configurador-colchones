# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al Wizard de Configuración de Colchones! Esta guía te ayudará a comenzar.

## 🚀 Inicio Rápido

### Configuración del Entorno
```bash
# Clonar el repositorio
git clone <repo-url>
cd wizard

# Instalar dependencias con pnpm
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

### Verificar tu Setup
- [ ] El proyecto abre en `http://localhost:5173`
- [ ] Navegación por wizard funciona
- [ ] No hay errores en la consola
- [ ] ESLint pasa sin errores: `pnpm lint`

## 📋 Tipos de Contribuciones

### 🐛 Reportar Bugs
Usa el template de issue "Bug Report" e incluye:
- Pasos para reproducir
- Comportamiento esperado vs actual
- Screenshots/videos si es relevante
- Browser y versión
- Información de accesibilidad si aplica

### ✨ Nuevas Funcionalidades
1. **Abrir un issue** primero para discutir la propuesta
2. **Seguir AGENTS.md** estrictamente
3. **Incluir tests** si es posible
4. **Actualizar documentación**

### 🔧 Mejoras de Código
- Refactoring para mejor legibilidad
- Optimizaciones de performance
- Mejoras de accesibilidad
- Corrección de tipos TypeScript (futuro)

### 📚 Documentación
- Correcciones de typos
- Ejemplos adicionales
- Traducciones (futuro)
- Mejoras de claridad

## 🎯 Estándares de Código

### Reglas Obligatorias
1. **AGENTS.md compliance** - Verificar cada cambio
2. **Accesibilidad first** - No opcional
3. **Mobile-first** - Diseñar para móvil primero
4. **Navegación por teclado** - Siempre funcional
5. **Estados de loading** - Feedback visual apropiado

### Checklist Pre-Submit
- [ ] `pnpm lint` pasa sin errores
- [ ] Navegación por teclado funciona (Tab, Enter, Escape)
- [ ] Targets interactivos ≥44px en móvil
- [ ] Contraste de colores adecuado
- [ ] Testeo en Chrome, Firefox, Safari
- [ ] Testeo en dispositivo móvil real
- [ ] Documentación actualizada si es necesario

## 🏗️ Proceso de Desarrollo

### 1. Setup de Branch
```bash
# Crear branch desde main
git checkout main
git pull origin main
git checkout -b feature/mi-nueva-funcionalidad

# O para bugfix
git checkout -b fix/descripcion-del-bug
```

### 2. Desarrollo
```bash
# Desarrollo iterativo
pnpm dev

# Verificar lint frecuentemente
pnpm lint

# Build para verificar no errores
pnpm build
```

### 3. Testing Manual
#### Accesibilidad
- [ ] Navegar solo con teclado
- [ ] Verificar con screen reader (NVDA gratuito)
- [ ] Contrastar colores con herramientas online
- [ ] Reducir movimiento y verificar animaciones

#### Responsive
- [ ] 320px (móvil pequeño)
- [ ] 768px (tablet)
- [ ] 1024px (laptop)
- [ ] 1440px (desktop)

#### Browsers
- [ ] Chrome (último)
- [ ] Firefox (último)
- [ ] Safari (último, si disponible)
- [ ] Edge (último)

### 4. Commit y Push
```bash
# Commits descriptivos
git add .
git commit -m "feat: agregar step de configuración de almohada

- Nuevo componente PillowStep con selección múltiple
- Validación para al menos una opción seleccionada
- Iconos descriptivos y copy claro
- Tests de accesibilidad incluidos

Closes #123"

git push origin feature/mi-nueva-funcionalidad
```

## 📝 Convenciones de Commit

### Formato
```
tipo(scope): descripción breve

Descripción más detallada si es necesario.
Explicar el "por qué" del cambio, no solo el "qué".

- Lista de cambios específicos
- Otro cambio importante
- Consideraciones especiales

Closes #123
```

### Tipos de Commit
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato (no afectan lógica)
- `refactor`: Refactoring de código
- `perf`: Mejoras de performance
- `test`: Agregar o modificar tests
- `chore`: Cambios en build, deps, etc.
- `a11y`: Mejoras específicas de accesibilidad

### Scopes Comunes
- `wizard`: Componentes core del wizard
- `steps`: Pantallas individuales
- `ui`: Componentes de UI reutilizables
- `context`: Estado global
- `styles`: Cambios de CSS
- `docs`: Documentación
- `config`: Configuración del proyecto

## 🧩 Agregar Nuevo Step

### Template Completo
```jsx
// 1. Crear src/components/steps/NewStep.jsx
import { useWizard } from '../../contexts/WizardContext';

const NewStep = () => {
  const { answers, setAnswer } = useWizard();

  const handleOptionChange = (value) => {
    setAnswer('newField', value);
  };

  const options = [
    {
      value: 'option1',
      title: 'Opción 1',
      description: 'Descripción clara',
      icon: '🔵'
    }
    // ... más opciones
  ];

  return (
    <div className="new-step">
      <p className="step-description">
        Descripción del paso con contexto útil.
      </p>
      
      <fieldset className="options-fieldset">
        <legend className="fieldset-legend">
          Pregunta clara y directa
        </legend>
        
        <div className="options-grid">
          {options.map((option) => (
            <label 
              key={option.value}
              className={`option-card ${answers.newField === option.value ? 'selected' : ''}`}
              style={{
                minHeight: '44px',
                touchAction: 'manipulation'
              }}
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
                <span className="option-icon" aria-hidden="true">
                  {option.icon}
                </span>
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

### 2-5. Registrar el Step (ver DEVELOPMENT.md)

## 🎨 Guías de Diseño

### Iconos
- **Usar emojis** por simplicidad y reconocimiento universal
- **Ser consistente** en el estilo (prefiero objetos vs personas)
- **Considerer significado cultural** - evitar gestos que puedan ofender

### Colores
```css
/* Usar variables CSS existentes */
--color-primary: #3b82f6;    /* Azul principal */
--color-success: #10b981;    /* Verde éxito */
--color-danger: #dc2626;     /* Rojo error */
--color-warning: #f59e0b;    /* Amarillo advertencia */
```

### Copy/Textos
- **Claro y conciso** - Evitar jerga técnica
- **Accionable** - "Selecciona tu preferencia" vs "Preferencias"
- **Inclusivo** - Lenguaje neutro cuando sea posible
- **Consistente** - Misma terminología en todo el wizard

## 🧪 Testing

### Tests Manuales (Mínimo)
```bash
# Checklist por PR
□ Navegación por teclado completa
□ Focus visible en todos los elementos
□ Screen reader friendly (NVDA/VoiceOver)
□ Targets touch ≥44px
□ Responsive en 4 breakpoints principales
□ Estados de loading claros
□ Validación inline funcional
□ Sin errores de consola
□ Performance aceptable (no lag notable)
```

### Tests Automatizados (Futuro)
```jsx
// Ejemplo de test que sería bienvenido
describe('NewStep', () => {
  test('allows keyboard navigation', () => {
    render(<NewStep />);
    
    // Test tab navigation
    const firstOption = screen.getByRole('radio', { name: /opción 1/i });
    firstOption.focus();
    expect(firstOption).toHaveFocus();
    
    // Test enter key selection
    fireEvent.keyDown(firstOption, { key: 'Enter' });
    expect(firstOption).toBeChecked();
  });

  test('meets accessibility standards', async () => {
    const { container } = render(<NewStep />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 🚀 Review Process

### Para Reviewers
- [ ] **AGENTS.md compliance** - ¿Se siguen todas las reglas?
- [ ] **Funcionalidad** - ¿Funciona como se espera?
- [ ] **Accesibilidad** - ¿Navegación por teclado OK? ¿Screen reader friendly?
- [ ] **Performance** - ¿Introduce lag o problemas?
- [ ] **Consistencia** - ¿Sigue patrones establecidos?
- [ ] **Documentación** - ¿Cambios documentados apropiadamente?

### Para Contributors
- **Responder rápido** a feedback de review
- **Hacer commits pequeños** para facilitar review
- **Explicar decisiones** no obvias en descripción del PR
- **Testear sugerencias** de reviewers antes de aplicar

## 🏆 Reconocimiento

Todos los contributors aparecerán en:
- Lista de contributors en README
- Sección de reconocimientos
- Release notes para contribuciones significativas

### Tipos de Contribución Reconocidas
- 💻 Código
- 📖 Documentación  
- 🎨 Diseño
- 🐛 Bug reports
- 💡 Ideas/sugerencias
- 🧪 Testing
- ♿ Accesibilidad
- 🌍 Traducción (futuro)
- 📢 Promoción

## 📬 Comunicación

### Canales
- **GitHub Issues**: Bugs, features, discusión técnica
- **GitHub Discussions**: Ideas, preguntas generales
- **Pull Requests**: Review de código, feedback técnico

### Etiqueta
- **Ser respetuoso** - Todos estamos aprendiendo
- **Ser constructivo** - Crítica con sugerencias
- **Ser paciente** - Reviews toman tiempo
- **Ser claro** - Comunicación directa pero amable

## 🎓 Recursos de Aprendizaje

### Accesibilidad
- [WAI-ARIA Authoring Practices Guide](https://w3.org/WAI/ARIA/apg/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### React/JavaScript
- [React Docs (Beta)](https://beta.reactjs.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/) - Browser support

### Testing
- [Testing Library](https://testing-library.com/)
- [axe-core](https://github.com/dequelabs/axe-core) - Accessibility testing

---

## 🙋‍♀️ ¿Preguntas?

Si tienes preguntas que no están cubiertas aquí:
1. **Busca en issues existentes** - Tal vez ya fue discutido
2. **Abre un GitHub Discussion** - Para preguntas generales
3. **Abre un issue** - Para problemas específicos

¡Gracias por contribuir! 🎉