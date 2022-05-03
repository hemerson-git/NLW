import { useContext } from "react";
import ThemeContext from "../../contexts/ThemeContext";

// styled
import { ButtonContainer, ButtonToggleTheme } from "./styles";

function ThemeButton() {
  const { isDarkThemeActive, changeDarkModeStatus } = useContext(ThemeContext);

  return (
    <ButtonContainer>
      <ButtonToggleTheme
        onClick={() => changeDarkModeStatus(!isDarkThemeActive)}
      >
        {isDarkThemeActive ? (
          <img src="icons/on.png" alt="imagem de uma lâmpada ligada" />
        ) : (
          <img src="icons/off.png" alt="Imagem de uma lâmpada apagada" />
        )}
      </ButtonToggleTheme>
    </ButtonContainer>
  );
}

export default ThemeButton;
