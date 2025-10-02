import { useDarkMode } from '../../contexts/DarkModeContext';
import { Button } from '@/components/ui/button';

const DarkModeToggle = ({ className = "" }) => {
  const { isDark, toggleDarkMode } = useDarkMode();
  
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleDarkMode}
      className={`relative w-14 h-8 md:w-12 md:h-6 p-0 transition-all duration-300 ${className}`}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      role="switch"
      aria-checked={isDark}
    >
      {/* Track del toggle */}
      <div className={`
        absolute inset-0 rounded-full transition-all duration-300
        ${isDark 
          ? 'bg-primary/20 border-primary/30' 
          : 'bg-gray-200 border-gray-300'
        }
      `} />
      
      {/* Círculo que se mueve */}
      <div className={`
        absolute top-0.5 w-7 h-7 md:w-5 md:h-5 rounded-full transition-all duration-300 transform
        flex items-center justify-center text-xs
        ${isDark
          ? 'translate-x-6 bg-primary text-primary-foreground shadow-lg'
          : 'translate-x-0.5 bg-white text-gray-600 shadow-md'
        }
      `}>
        {isDark ? '🌙' : '☀️'}
      </div>
      
      {/* Screen reader text */}
      <span className="sr-only">
        {isDark ? 'Modo oscuro activado' : 'Modo claro activado'}
      </span>
    </Button>
  );
};

export default DarkModeToggle;