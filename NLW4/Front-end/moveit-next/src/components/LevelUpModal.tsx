import { useContext } from 'react';
import ChallengesContext from '../contexts/challengesContext';
import ThemeContext from '../contexts/ThemeContext';
import styles from '../styles/components/LevelUpModal.module.css';

function LevelUpModal() {
  const { isDarkThemeActive } = useContext(ThemeContext);
  const { level, closeLevelUpModal } = useContext(ChallengesContext);
  
  const dark = isDarkThemeActive ? styles.dark : '';

  {console.log(isDarkThemeActive)}
  
  return (
    <div className={`${styles.overlay} ${dark}`}>
      <div className={`${styles.container}`}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="/icons/close.svg" alt="Fechar Modal"/>
        </button>
      </div>
    </div>
  )
}

export default LevelUpModal;
