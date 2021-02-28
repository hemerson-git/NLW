import { createContext, ReactNode, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ThemeContextData {
  isDarkThemeActive: boolean;
  changeDarkModStatus: (boolean) => void;
}

const ThemeContext = createContext({} as ThemeContextData);

export default ThemeContext;

export function ThemeProvider({ children } : ThemeProviderProps) {
  const [isDarkThemeActive, setIsDarkModActive] = useState(false);

  function changeDarkModStatus(status) {
    setIsDarkModActive(status);
    localStorage.setItem('isDark', String(!isDarkThemeActive));
  }

  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem('isDark'));

    if(isDark) {
      setIsDarkModActive(true);
    }
  }, []);

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkThemeActive,
        changeDarkModStatus
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
