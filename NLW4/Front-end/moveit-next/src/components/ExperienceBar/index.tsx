import { useContext } from "react";
import ChallengesContext from "../../contexts/challengesContext";

import { Bar, CurrentExperience, ExperienceBarContainer } from "./styles";

function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } =
    useContext(ChallengesContext);

  const percentToNextLevel =
    Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <ExperienceBarContainer>
      <span>0 XP</span>

      <Bar>
        <div style={{ width: `${percentToNextLevel}%` }}></div>

        <CurrentExperience style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience} XP
        </CurrentExperience>
      </Bar>

      <span>{experienceToNextLevel} XP</span>
    </ExperienceBarContainer>
  );
}

export default ExperienceBar;
