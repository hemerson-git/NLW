import { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ThemeContextData {
  isDarkThemeActive: boolean;
  changeDarkModeStatus: (boolean) => void;
}

const ThemeContext = createContext({} as ThemeContextData);

export default ThemeContext;

export function ToggleThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkThemeActive, setIsDarkModActive] = useState(false);

  function changeDarkModeStatus(status: boolean) {
    setIsDarkModActive(status);
    localStorage.setItem("isDark", String(!isDarkThemeActive));
  }

  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem("isDark"));

    if (isDark) {
      setIsDarkModActive(true);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        isDarkThemeActive,
        changeDarkModeStatus,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
