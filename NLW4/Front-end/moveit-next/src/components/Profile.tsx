import { Profiler } from "inspector";
import { useContext } from "react";
import ChallengesContext from "../contexts/challengesContext";
import ThemeContext from "../contexts/ThemeContext";

import styles from '../styles/components/Profile.module.css';

function Profile() {
  const { level } = useContext(ChallengesContext);
  const { isDarkThemeActive } = useContext(ThemeContext);
  const dark = isDarkThemeActive ? styles.dark : '';
  
  return(
    <div className={`${styles.profileContainer} ${dark}`}>
      <img src="https://github.com/hemerson-git.png" alt="Hemerson Oliveira"/>

      <div>
        <strong>Hemerson Oliveira</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  );
}

export default Profile;
