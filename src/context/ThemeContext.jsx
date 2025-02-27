import { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  // Load theme settings from localStorage on initial render
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedCompactMode = localStorage.getItem('compactMode') === 'true';
    
    setDarkMode(savedDarkMode);
    setCompactMode(savedCompactMode);
  }, []);

  // Save theme settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('compactMode', compactMode);
  }, [darkMode, compactMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleCompactMode = () => {
    setCompactMode(prev => !prev);
  };

  const updateThemeSettings = (settings) => {
    if (settings.darkMode !== undefined) {
      setDarkMode(settings.darkMode);
    }
    if (settings.compactMode !== undefined) {
      setCompactMode(settings.compactMode);
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      darkMode, 
      compactMode, 
      toggleDarkMode, 
      toggleCompactMode,
      updateThemeSettings
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 