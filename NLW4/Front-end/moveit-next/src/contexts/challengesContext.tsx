import { createContext, ReactNode, useEffect, useState } from 'react';

import challenges from '../../challenges.json';

interface ChallengesProviderProps {
  children: ReactNode;
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: Challenge;
  isDarkModActive: boolean;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  changeDarkModStatus: (boolean) => void;
  completeChallenge: () => void;
}

const ChallengesContext = createContext({} as ChallengesContextData);

export default ChallengesContext;

export function ChallengeProvider({ children } : ChallengesProviderProps) {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrenteExperience] = useState(25);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [isDarkModActive, setIsDarkModActive] = useState(false);

  const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
  
  function levelUp () {
    setLevel(level + 1);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }
  
  function changeDarkModStatus(status) {
    setIsDarkModActive(!status);
    localStorage.setItem('isDark', String(!isDarkModActive));
  }
  
  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrenteExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  useEffect(() => {
    const isDark = JSON.parse(localStorage.getItem('isDark'));

    if(isDark) {
      setIsDarkModActive(true);
    }
  })
  
  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExperience, 
        challengesCompleted, 
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        isDarkModActive,
        changeDarkModStatus,
        completeChallenge
      }}
    >
      {children}
    </ChallengesContext.Provider>
  )
}
