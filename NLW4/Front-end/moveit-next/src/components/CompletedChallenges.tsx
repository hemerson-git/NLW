import { useContext } from 'react';
import ChallengesContext from '../contexts/challengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

function CompletedChallenges () {
  const { challengesCompleted, isDarkModActive } = useContext(ChallengesContext);
  const dark = isDarkModActive ? styles.dark : '';
  
  return (
    <div className={`${styles.completedChallengesContainer} ${dark}`}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}

export default CompletedChallenges;
