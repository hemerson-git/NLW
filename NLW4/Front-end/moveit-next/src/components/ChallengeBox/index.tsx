import { useContext } from "react";
import challengesContext from "../../contexts/challengesContext";
import { CountdownContext } from "../../contexts/CountdownContext";
import ThemeContext from "../../contexts/ThemeContext";
import styles from "../../styles/components/ChallengeBox.module.css";

function ChallangeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } =
    useContext(challengesContext);
  const { resetCountdown } = useContext(CountdownContext);
  const { isDarkThemeActive } = useContext(ThemeContext);

  const dark = isDarkThemeActive ? styles.dark : "";

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className={`${styles.challengeBoxContainer} ${dark}`}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount}XP</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>

            <button
              type="button"
              className={styles.challengeSuccededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de Level Completando desafios
          </p>
        </div>
      )}
    </div>
  );
}

export default ChallangeBox;
