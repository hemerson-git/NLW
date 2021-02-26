import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import ChallengesContext from "./challengesContext";

interface CountdownContextData {
  minute: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface ConntdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout : NodeJS.Timeout;

function CountdownProvider({ children } : ConntdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengesContext);
  
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  
  const minute = Math.floor(time / 60);
  const seconds = time % 60;
  
  function startCountdown () {
    setIsActive(true);
  }
  
  function resetCountdown () {
    setIsActive(false);
    setHasFinished(false);
    setTime(25 * 60);
    clearTimeout(countdownTimeout);
  }
  
  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);  
  
  return (
    <CountdownContext.Provider value={{
      minute,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}

export default CountdownProvider;
