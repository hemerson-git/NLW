import { useContext } from "react";
import { CountdownContext } from "../../contexts/CountdownContext";
import ThemeContext from "../../contexts/ThemeContext";
import styles from "../../styles/components/Countdown.module.css";

// Styleds

import { CountdownContainer } from "./styles";

function Countdown() {
  const { isDarkThemeActive } = useContext(ThemeContext);
  const {
    isActive,
    hasFinished,
    resetCountdown,
    minute,
    seconds,
    startCountdown,
  } = useContext(CountdownContext);

  const dark = isDarkThemeActive ? styles.dark : "";

  const [minuteLeft, minuteRight] = String(minute).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <>
      <CountdownContainer>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </CountdownContainer>

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
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um cíclo
            </button>
          )}
        </>
      )}
    </>
  );
}

export default Countdown;
