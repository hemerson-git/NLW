import styled from "styled-components/native";
import { theme } from "../../theme";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const ButtonWidget = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  background-color: ${theme.colors.brand};
  position: absolute;
  bottom: 16px;
  right: ${getBottomSpace}px - 16px;
`;
