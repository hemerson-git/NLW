import { ReactNode } from "react";
import { Heading, VStack } from "native-base";
import { ImageBackground } from "react-native";

import bgImage from "../../assets/background-galaxy.png";
import { bgImageStyles } from "./styles";

interface BackgroundProps {
  children?: ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground
      source={bgImage}
      defaultSource={bgImage}
      style={bgImageStyles.container}
    >
      {children}
    </ImageBackground>
  );
}
