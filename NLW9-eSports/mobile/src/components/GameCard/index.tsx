import { LinearGradient } from "expo-linear-gradient";
import {
  Heading,
  IPressableProps,
  Pressable,
  Text,
  View,
  VStack,
} from "native-base";
import { ImageBackground, ImageSourcePropType } from "react-native";

import { styles } from "./styles";

export interface GameCardProps {
  id: string;
  name: string;
  ads: string;
  cover: ImageSourcePropType;
}

interface Props extends IPressableProps {
  data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <Pressable mr={"4"} _pressed={{ opacity: 0.8 }} {...rest}>
      <ImageBackground source={data.cover} style={styles.cover}>
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
          style={styles.footer}
        >
          <Text color="white" fontSize="xl" fontFamily="body" fontWeight="bold">
            {data.name}
          </Text>

          <Text color="gray.300" fontSize="md" fontFamily="body">
            {data.ads} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}
