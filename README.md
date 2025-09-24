# 🛏️ Configurador de Colchones - Wizard Interactivo

Una aplicación React que guía a los usuarios a través de un proceso paso a paso para encontrar el colchón perfecto basado en sus preferencias personales, estilo de vida y necesidades de salud.

## ✨ Características Principales

### 🎯 **Wizard Inteligente de 8 Pasos**
- **Bienvenida**: Introducción al proceso
- **Situación de Sueño**: Solo, pareja o variable
- **Posición al Dormir**: Espalda, lado, estómago, mixta
- **Preferencia de Firmeza**: Escala del 1-5 con guías visuales
- **Consideraciones de Salud**: Dolor de espalda, alergias, sobrecalentamiento, etc.
- **Materiales**: Viscoelástica, muelles, látex, híbrido, gel
- **Presupuesto**: Rangos desde económico hasta lujo
- **Resumen y Recomendaciones**: Productos personalizados

### ♿ **Accesibilidad Completa (WCAG 2.1 AAA)**
- Navegación completa por teclado (Tab, Enter, Escape)
- Soporte para lectores de pantalla (NVDA, JAWS, VoiceOver)
- Focus rings visibles y manejo de foco inteligente
- Contraste alto y soporte para modo oscuro
- Textos alternativos y ARIA labels descriptivos
- Skip links y landmarks semánticos

### 📱 **Diseño Responsive y Mobile-First**
- Targets de toque ≥44px en móvil
- Font-size ≥16px para prevenir zoom automático en iOS
- Touch gestures optimizados
- Grid adaptativo para diferentes pantallas
- Soporte para safe areas (notch, etc.)

### 🎨 **Experiencia de Usuario Premium**
- Animaciones suaves que respetan `prefers-reduced-motion`
- Estados de carga con spinners y feedback visual
- Validación en tiempo real sin bloquear la navegación
- Indicador de progreso accesible
- Transiciones fluidas entre pasos

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/
│   ├── wizard/                    # Componentes core del wizard
│   │   ├── WizardContainer.jsx    # Contenedor principal
│   │   ├── WizardStep.jsx         # Wrapper genérico para pasos
│   │   ├── ProgressIndicator.jsx  # Indicador de progreso
│   │   ├── Navigation.jsx         # Navegación entre pasos
│   │   └── wizard.css            # Estilos siguiendo AGENTS.md
│   ├── steps/                     # Pantallas individuales
│   │   ├── WelcomeStep.jsx       # Pantalla de bienvenida
│   │   ├── SleepSituationStep.jsx # Configuración de situación
│   │   ├── SleepPositionStep.jsx  # Posiciones de sueño
│   │   ├── FirmnessStep.jsx      # Nivel de firmeza
│   │   ├── HealthConcernsStep.jsx # Consideraciones médicas
│   │   ├── MaterialsStep.jsx     # Tipos de materiales
│   │   ├── BudgetStep.jsx        # Rango de presupuesto
│   │   └── SummaryStep.jsx       # Recomendaciones finales
│   └── ui/                        # Componentes reutilizables
│       └── Button.jsx            # Botón accesible y responsive
├── contexts/
│   └── WizardContext.jsx         # Estado global con useReducer
├── hooks/                        # Custom hooks (preparado)
└── utils/                        # Utilidades (preparado)
```

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js ≥18.0.0
- pnpm ≥8.0.0

### Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd wizard

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`

### Scripts Disponibles

```bash
pnpm dev          # Servidor de desarrollo
pnpm build        # Build de producción
pnpm preview      # Preview del build
pnpm lint         # Linting con ESLint
pnpm clean        # Limpiar cache de pnpm
```

## 🎨 Sistema de Design

### Paleta de Colores
- **Primario**: `#3b82f6` (Azul vibrante)
- **Secundario**: `#10b981` (Verde éxito)
- **Neutral**: `#64748b` (Gris medio)
- **Peligro**: `#dc2626` (Rojo error)
- **Fondo**: `#ffffff` / `#1a1a1a` (claro/oscuro)

### Tipografía
- **Fuente**: Sistema por defecto (-apple-system, BlinkMacSystemFont, 'Segoe UI')
- **Escalas**: 0.875rem, 1rem, 1.125rem, 1.25rem, 1.5rem, 2rem
- **Pesos**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Espaciado
- **Base**: 1rem (16px)
- **Escala**: 0.5rem, 1rem, 1.5rem, 2rem, 3rem

## 🧩 Componentes Principales

### WizardContainer
Componente principal que gestiona el flujo del wizard.

**Props**: Ninguna (usa contexto)

**Características**:
- Manejo automático de foco
- Actualización del título de página
- Skip links para accesibilidad
- Scroll suave entre pasos

### WizardStep
Wrapper genérico para cada pantalla del wizard.

**Props**:
- `title` (string): Título del paso
- `children` (ReactNode): Contenido del paso

### Button
Botón accesible y responsive que sigue las guías de AGENTS.md.

**Props**:
- `variant`: 'primary' | 'secondary' | 'ghost'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: boolean
- `isLoading`: boolean
- `onClick`: function

## 🔧 Configuración

### ESLint
El proyecto incluye configuración ESLint optimizada para React:
- `@eslint/js`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`

### Vite
Configuración personalizada con:
- Plugin de React con Fast Refresh
- Optimización de dependencias
- Dev server configurado

### pnpm
- `.npmrc` configurado para auto-install-peers
- Package manager especificado en package.json
- Lockfile optimizado para pnpm

## 📋 Convenciones de Código

### Siguiendo AGENTS.md
El proyecto sigue estrictamente las reglas definidas en `.github/AGENTS.md`:

#### Interacciones
- ✅ Soporte completo de teclado según WAI-ARIA APG
- ✅ Focus rings visibles con `:focus-visible`
- ✅ Targets ≥44px en móvil
- ✅ `touch-action: manipulation` para prevenir double-tap zoom

#### Formularios
- ✅ Inputs hidratación-segura
- ✅ Botones de carga mantienen label original
- ✅ Validación inline con focus en primer error
- ✅ Compatibilidad con gestores de contraseñas

#### Estado y Navegación
- ✅ URL refleja estado (preparado para deep-linking)
- ✅ Back/Forward restaura scroll
- ✅ Links son links, botones son botones

#### Animaciones
- ✅ Respeta `prefers-reduced-motion`
- ✅ Props compositor-friendly (`transform`, `opacity`)
- ✅ Animaciones interruptibles

## 🧪 Testing (Preparado)

```bash
# Estructura preparada para testing
src/
├── __tests__/           # Tests unitarios
├── components/
│   └── __tests__/       # Tests de componentes
└── contexts/
    └── __tests__/       # Tests de contextos
```

## 🚀 Deployment

### Build de Producción
```bash
pnpm build
```

### Variables de Entorno
Crear `.env.local` para variables locales:
```env
VITE_API_URL=https://api.ejemplo.com
VITE_ANALYTICS_ID=GA_TRACKING_ID
```

## 📱 PWA (Preparado)
El proyecto está preparado para ser convertido en PWA:
- Manifest.json preparado
- Service Worker listo para implementar
- Iconos en diferentes tamaños

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código
- Seguir reglas de `.github/AGENTS.md`
- ESLint debe pasar sin errores
- Componentes deben ser accesibles
- Tests para nuevas funcionalidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🙏 Reconocimientos

- [WAI-ARIA APG](https://w3.org/WAI/ARIA/apg/) - Patrones de accesibilidad
- [Vite](https://vitejs.dev/) - Build tool increíblemente rápido
- [React](https://reactjs.org/) - Biblioteca de UI
- [pnpm](https://pnpm.io/) - Gestor de paquetes eficiente

---

**¿Preguntas?** Abre un [issue](https://github.com/usuario/wizard/issues) o contacta al equipo de desarrollo.
