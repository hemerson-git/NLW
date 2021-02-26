import { useContext } from 'react';
import ChallengesContext from '../contexts/challengesContext';
import styles from '../styles/components/ThemeButton.module.css';

function ThemeButton() {
  const { isDarkModActive, changeDarkModStatus } = useContext(ChallengesContext);
  
  return (
    <div className={styles.themeButtonContainer}>
      <button 
        onClick={ changeDarkModStatus }
      >
        {isDarkModActive ? (
          <img src="icons/off.png" alt="off"/>
          ) : (
          <img src="icons/on.png" alt="off"/>
        )
      }
      </button>
    </div>
  )
}

export default ThemeButton;
