import { useContext, useEffect, useState } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import ThemeContext from '../contexts/ThemeContext';
import styles from '../styles/components/Countdown.module.css';

function Countdown() {
  const { isDarkThemeActive } = useContext(ThemeContext);
  const { 
    isActive, 
    hasFinished, 
    resetCountdown, 
    minute, 
    seconds, 
    startCountdown 
  } = useContext(CountdownContext);
  
  const dark = isDarkThemeActive ? styles.dark : '';

  const [minuteLeft, minuteRight] = String(minute).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  
  return (
    <>
      <div className={`${styles.countdownContainer} ${dark}`}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button 
              disabled
              className={styles.countdownButton} 
              onClick={resetCountdown}
            >
              Ciclo encerrado
            </button>
      ) : (
        <>
          {isActive ? (
            <button 
              type="button" 
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
              onClick={resetCountdown}
            >
              Abandonar Ciclo
            </button>
          ) : (
            <button type="button" className={styles.countdownButton} onClick={startCountdown}>
              Iniciar um cíclo
            </button>
          )}
        </>
      )}
    </>
  );
}

export default Countdown;
