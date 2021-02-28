import { useContext } from 'react';
import ChallengesContext from '../contexts/challengesContext';
import ThemeContext from '../contexts/ThemeContext';
import styles from '../styles/components/CompletedChallenges.module.css';

function CompletedChallenges () {
  const { challengesCompleted } = useContext(ChallengesContext);
  const { isDarkThemeActive } = useContext(ThemeContext);
  const dark = isDarkThemeActive ? styles.dark : '';
  
  return (
    <div className={`${styles.completedChallengesContainer} ${dark}`}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}

export default CompletedChallenges;
