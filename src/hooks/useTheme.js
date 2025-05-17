import { useState, useEffect } from 'react';

const useTheme = () => {
  // Verificar el tema guardado o usar "autumn" como predeterminado
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'autumn'; // autumn = claro, dark = oscuro
    }
    return 'autumn'; // Default para SSR
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Efecto para aplicar el tema cuando cambia
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
