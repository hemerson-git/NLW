import { useContext } from "react";
import ChallengesContext from "../../contexts/challengesContext";

// Styleds
import { ProfileContainer } from "./styles";

function Profile() {
  const { level } = useContext(ChallengesContext);

  return (
    <ProfileContainer>
      <img src="https://github.com/hemerson-git.png" alt="Hemerson Oliveira" />

      <div>
        <strong>Hemerson Oliveira</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </ProfileContainer>
  );
}

export default Profile;
