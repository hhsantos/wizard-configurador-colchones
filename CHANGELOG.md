# 🔄 Changelog

Todas las modificaciones notables de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Pendiente
- Implementar SummaryStep con recomendaciones
- Agregar sistema de routing con URLs amigables
- Implementar persistencia en localStorage
- Agregar animaciones de transición entre steps
- Sistema de recomendaciones inteligente
- Tests unitarios completos
- Internacionalización (i18n)

## [1.0.0] - 2025-09-24

### ✨ Agregado
- **Wizard completo de 8 pasos** para configuración de colchones
- **WizardContext** con useReducer para manejo de estado global
- **Componentes base**: WizardContainer, WizardStep, ProgressIndicator, Navigation
- **7 pantallas funcionales**: Welcome, SleepSituation, SleepPosition, Firmness, HealthConcerns, Materials, Budget
- **Button component** accesible siguiendo AGENTS.md
- **Sistema de navegación** con validación automática
- **Indicador de progreso** visual y accesible

### ♿ Accesibilidad
- **Navegación completa por teclado** (Tab, Enter, Escape)
- **Focus management** automático entre pasos
- **ARIA labels** y roles semánticos
- **Screen reader support** con textos alternativos
- **Skip to content** link
- **Focus rings visibles** con `:focus-visible`
- **Hit targets ≥44px** en móvil
- **aria-live regions** para feedback dinámico

### 📱 Responsive Design
- **Mobile-first** approach
- **Touch targets optimizados** para móvil
- **Font-size ≥16px** para prevenir zoom en iOS
- **Grid adaptativo** para diferentes pantallas
- **Touch gestures** optimizados
- **Safe areas** preparado para notch/dynamic island

### 🎨 UI/UX
- **Design system** consistente con variables CSS
- **Estados visuales** claros (hover, selected, disabled, loading)
- **Animaciones suaves** que respetan `prefers-reduced-motion`
- **Dark mode** support automático
- **High contrast** mode support
- **Iconos semánticos** con emojis reconocibles

### 🏗️ Arquitectura
- **Contexto React** para estado global
- **Componentes modulares** y reutilizables
- **Separación clara** entre UI y lógica de negocio
- **Patrones consistentes** para todos los steps
- **Estructura escalable** para futuras extensiones

### 🔧 Configuración
- **Migración completa a pnpm** desde npm
- **Package manager** especificado en package.json
- **`.npmrc`** configurado para pnpm
- **ESLint** optimizado para React
- **Vite** con Fast Refresh
- **Scripts actualizados** para pnpm

### 📚 Documentación
- **README.md** completo con guía de inicio
- **COMPONENTS.md** con documentación de componentes
- **DEVELOPMENT.md** con guías de desarrollo
- **AGENTS.md** con reglas de UI/UX
- **Inline documentation** en componentes
- **JSDoc comments** en funciones complejas

### 🎯 Siguiendo AGENTS.md
- **Keyboard navigation** completa según WAI-ARIA APG
- **Loading states** con spinners y labels originales
- **Form validation** inline con focus en errores
- **Touch optimization** con `touch-action: manipulation`
- **No dead zones** en checkboxes/radios
- **Optimistic UI** patterns preparados
- **URL state reflection** preparado
- **Animation guidelines** implementadas

### 🚀 Performance
- **Lazy loading** preparado para code splitting
- **Compositor-friendly animations** con transform/opacity
- **Optimized re-renders** con contexto bien estructurado
- **CSS optimizations** con custom properties
- **Bundle size** optimizado con Vite

## [0.1.0] - 2025-09-24 (Inicio)

### Agregado
- Configuración inicial del proyecto con Vite + React
- Estructura básica de carpetas
- Configuración de ESLint
- Package.json con dependencias base

---

## Tipos de Cambios

- `✨ Agregado` para nuevas funcionalidades
- `🔧 Cambiado` para cambios en funcionalidades existentes  
- `🐛 Arreglado` para corrección de bugs
- `🗑️ Removido` para funcionalidades eliminadas
- `♿ Accesibilidad` para mejoras de accesibilidad
- `📱 Responsive` para mejoras de diseño responsive
- `🎨 UI/UX` para mejoras visuales y de experiencia
- `🏗️ Arquitectura` para cambios estructurales
- `📚 Documentación` para actualizaciones de documentación
- `🚀 Performance` para optimizaciones de rendimiento
- `🔒 Seguridad` para correcciones de seguridad