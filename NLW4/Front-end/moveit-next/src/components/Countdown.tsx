import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout : NodeJS.Timeout;

function Countdown() {
  const [time, setTime] = useState(.05 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  
  const minute = Math.floor(time / 60);
  const seconds = time % 60;

  const [minuteLeft, minuteRight] = String(minute).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');
  
  function startCountdown () {
    setIsActive(true);
  }
  
  function resetCountdown () {
    setIsActive(false);
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
    }
  }, [isActive, time]);  
  
  return (
    <>
      <div className={styles.countdownContainer}>
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
          )};
        </>
      )};

      


    </>
  );
}

export default Countdown;
