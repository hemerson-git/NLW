import { useContext } from 'react';
import challengesContext from '../contexts/challengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

function ChallangeBox () {
  const { activeChallenge, resetChallenge, isDarkModActive } = useContext(challengesContext);
  const dark = isDarkModActive ? styles.dark : '';
  
  return (
    <div className={`${styles.challengeBoxContainer} ${dark}`}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount}XP</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`}/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button 
              type="button"
              className={styles.challengeFailedButton}
              onClick={resetChallenge}
            >
              Falhei
            </button>

            <button 
              type="button"
              className={styles.challengeSuccededButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up"/>
            Avance de Level Completando desafios
          </p>
        </div>
      )}
    </div>
  )
}

export default ChallangeBox;
