import { TouchableOpacity } from "react-native";
import { ChatTeardropDots } from "phosphor-react-native";
import { theme } from "../../theme";

import { ButtonWidget } from "./styles";

export function Widget() {
  return (
    <>
      <ButtonWidget>
        <ChatTeardropDots
          size={24}
          color={theme.colors.text_on_brand_color}
          weight="bold"
        />
      </ButtonWidget>
    </>
  );
}
