import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import styles from '../styles/components/ThemeButton.module.css';

function ThemeButton() {
  const { isDarkThemeActive, changeDarkModStatus } = useContext(ThemeContext);
  
  return (
    <div className={styles.themeButtonContainer}>
      <button 
        onClick={ () => changeDarkModStatus(!isDarkThemeActive)}
      >
        {isDarkThemeActive ? (
          <img src="icons/on.png" alt="off"/>
          ) : (
            <img src="icons/off.png" alt="off"/>
          )
      }
      </button>
    </div>
  )
}

export default ThemeButton;
