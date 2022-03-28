import { useContext } from "react";
import ChallengesContext from "../../contexts/challengesContext";
import ThemeContext from "../../contexts/ThemeContext";
import styles from "../../styles/components/CompletedChallenges.module.css";

// Styleds
import { CompletedChallengesContainer } from "./styles";

function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengesContext);
  const { isDarkThemeActive } = useContext(ThemeContext);
  const dark = isDarkThemeActive ? styles.dark : "";

  return (
    <CompletedChallengesContainer>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </CompletedChallengesContainer>
  );
}

export default CompletedChallenges;
