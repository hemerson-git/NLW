import { LinearGradient } from "expo-linear-gradient";
import { IPressableProps, Pressable, Text } from "native-base";
import { ImageBackground } from "react-native";

import { styles } from "./styles";

export interface GameCardProps {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

interface Props extends IPressableProps {
  data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <Pressable mr={"4"} _pressed={{ opacity: 0.8 }} {...rest}>
      <ImageBackground source={{ uri: data.bannerUrl }} style={styles.cover}>
        <LinearGradient
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
          style={styles.footer}
        >
          <Text color="white" fontSize="xl" fontFamily="body" fontWeight="bold">
            {data.title}
          </Text>

          <Text color="gray.300" fontSize="md" fontFamily="body">
            {data._count.ads} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}
