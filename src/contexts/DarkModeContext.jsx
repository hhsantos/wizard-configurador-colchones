import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

export const DarkModeProvider = ({ children }) => {
  // Inicializar con preferencia del sistema o localStorage
  const [isDark, setIsDark] = useState(() => {
    // Verificar localStorage primero
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    
    // Si no hay preferencia guardada, usar preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Aplicar/remover clase dark del documento
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDark));
  }, [isDark]);

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Solo cambiar si no hay preferencia manual guardada
      const saved = localStorage.getItem('darkMode');
      if (saved === null) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const setDarkMode = (dark) => {
    setIsDark(dark);
  };

  const value = {
    isDark,
    toggleDarkMode,
    setDarkMode,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};