# 🎨 Migración UI: Tailwind CSS + shadcn/ui

## 📋 **Estado de la Migración**

### ✅ **Fase 1: Setup y Componentes Core (Completado)**

#### **Instalación y Configuración**
```bash
# Dependencias instaladas
pnpm add tailwindcss @tailwindcss/vite @types/node
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card progress radio-group
```

#### **Archivos de Configuración**
- `vite.config.js` - Configurado con Tailwind y path aliases
- `jsconfig.json` - Path aliases para JavaScript (@/*)
- `components.json` - Configuración shadcn/ui (style: 'new-york')
- `src/index.css` - Import de Tailwind CSS

#### **Componentes shadcn/ui Agregados**
- `src/components/ui/button.jsx` - Botones con variants
- `src/components/ui/card.jsx` - Cards para opciones
- `src/components/ui/progress.jsx` - Barra de progreso
- `src/components/ui/radio-group.jsx` - Grupos de radio buttons
- `src/lib/utils.js` - Utility function para clases CSS

### 🏗️ **Componentes Migrados**

#### **WizardContainer.jsx**
```jsx
// ✅ ANTES: CSS Classes
<div className="wizard-container">
  <header className="wizard-header">
    <h1 className="wizard-title">

// ✅ DESPUÉS: Tailwind Classes
<div className="max-w-3xl mx-auto px-5 min-h-screen flex flex-col">
  <header className="mb-8 text-center">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">
```

**Cambios aplicados:**
- Container: `max-w-3xl mx-auto px-5 min-h-screen flex flex-col`
- Header: `mb-8 text-center`
- Title: `text-3xl font-bold text-gray-900 mb-4`
- Skip link: `sr-only focus:not-sr-only fixed left-2 top-2 z-[999]`

#### **ProgressIndicator.jsx**
```jsx
// ✅ ANTES: CSS Custom Progress
<div className="progress-bar">
  <div className="progress-fill" style={{ width: `${progress}%` }}>

// ✅ DESPUÉS: shadcn/ui Progress
<Progress value={progress} className="mb-4" />
```

**Cambios aplicados:**
- Progress bar: shadcn/ui `<Progress>` component
- Steps indicators: Tailwind flex grid con conditional styling
- Text: `text-center text-sm text-gray-600`

#### **Navigation.jsx**
```jsx
// ✅ ANTES: Custom Button
import Button from '../ui/Button';
<Button variant="primary">

// ✅ DESPUÉS: shadcn/ui Button
import { Button } from '@/components/ui/button';
<Button variant="default">
```

**Cambios aplicados:**
- Container: `mt-8 pt-6 border-t border-gray-200`
- Buttons layout: `flex justify-between gap-4`
- Help messages: `mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded`

#### **WelcomeStep.jsx**
```jsx
// ✅ ANTES: CSS Classes
<div className="welcome-step">
  <div className="welcome-content">

// ✅ DESPUÉS: Tailwind Layout
<div className="text-center space-y-6">
  <div className="max-w-2xl mx-auto">
```

**Cambios aplicados:**
- Layout: `text-center space-y-6`
- Content: `max-w-2xl mx-auto`
- Title: `text-2xl font-semibold text-gray-900 mb-4`
- Features list: `text-left space-y-3 mb-8 max-w-md mx-auto`

### 🎯 **Patrones de Migración Establecidos**

#### **Containers y Layout**
```jsx
// Container principal
<div className="max-w-3xl mx-auto px-5 min-h-screen flex flex-col">

// Content sections
<div className="text-center space-y-6">
<div className="max-w-2xl mx-auto">

// Grid layouts (para próximos pasos)
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
```

#### **Typography**
```jsx
// Titles
<h3 className="text-2xl font-semibold text-gray-900 mb-4">

// Descriptions
<p className="text-gray-600 mb-6 text-lg leading-relaxed">

// Small text
<small className="text-sm text-gray-500">
```

#### **Interactive Elements**
```jsx
// Buttons
<Button variant="default" size="lg" className="px-8 py-3">

// Cards (preparado para opciones)
<Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
```

#### **Accessibility Preserved**
```jsx
// Skip links
<a className="sr-only focus:not-sr-only fixed left-2 top-2 z-[999]">

// ARIA attributes maintained
aria-label={...}
role="navigation"
aria-live="polite"

// Touch targets ≥44px
className="min-h-[44px] min-w-[44px]"
```

### 📱 **Responsive Design**

#### **Breakpoints Usados**
- `sm:` (640px+) - Pequeños ajustes
- `md:` (768px+) - Tablets y desktop
- `lg:` (1024px+) - Desktop grande

#### **Grid Patterns**
```jsx
// Mobile-first responsive grids
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
"grid grid-cols-2 md:grid-cols-4 gap-3"
```

## 🔄 **Próximos Pasos**

### **Fase 2: Steps 2-3 (En Progreso)**
- [ ] SleepSituationStep - Grid de opciones con Cards
- [ ] SleepPositionStep - Multiple selection con visual feedback

### **Fase 3: Steps 4-5**
- [ ] FirmnessStep - Slider/scale component
- [ ] HealthConcernsStep - Checkbox grid

### **Fase 4: Steps 6-7**
- [ ] MaterialsStep - Complex grid layout
- [ ] BudgetStep - Price range cards

### **Fase 5: Final**
- [ ] SummaryStep - Review layout con cards
- [ ] Remove wizard.css completely
- [ ] Final testing y validation

## 🧪 **Testing Checklist**

### **Funcionalidad**
- [ ] Navegación entre pasos funciona
- [ ] Estado se mantiene al navegar
- [ ] Validaciones funcionan correctamente
- [ ] Botones respond apropiadamente

### **Accesibilidad (AGENTS.md)**
- [x] Skip links funcionando
- [x] Focus management preservado
- [x] ARIA labels y roles mantenidos
- [x] Touch targets ≥44px mobile
- [ ] Keyboard navigation en nuevos componentes
- [ ] Screen reader testing

### **Responsive Design**
- [x] Mobile-first aproach mantenido
- [x] Breakpoints apropiados
- [ ] Testing en diferentes viewport sizes
- [ ] Touch interactions optimized

### **Performance**
- [x] Hot module replacement funcionando
- [x] Build process sin errores
- [ ] Bundle size analysis
- [ ] Loading times comparison

## 📚 **Recursos y Referencias**

### **Documentación**
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [AGENTS.md Rules](./AGENTS.md) - UI/UX guidelines

### **Componentes Disponibles**
```jsx
// shadcn/ui components ready to use
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
```

### **Utility Patterns**
```jsx
// Common class combinations
const cardClasses = cn(
  "p-4 cursor-pointer transition-all",
  "hover:shadow-md hover:scale-105",
  "border-2 border-transparent",
  isSelected && "border-blue-500 bg-blue-50"
)
```

---

> **💡 Próximo paso:** Continuar con la migración de SleepSituationStep y SleepPositionStep usando Cards y responsive grids.