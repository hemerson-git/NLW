import { LinearGradient } from "expo-linear-gradient";
import {
  IPressableProps,
  Pressable,
  Text,
  Skeleton,
  VStack,
} from "native-base";
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

export function GameCardSkeleton() {
  return (
    <VStack
      mr={"4"}
      px="4"
      w={240}
      h={320}
      borderWidth="1"
      borderColor="primary.500"
      rounded="md"
    >
      <Skeleton startColor="primary.500/20" h={32} mt={6} rounded="md" />

      <VStack flex={1} justifyContent="flex-end" pb={6}>
        <Skeleton w="80%" h={6} rounded="md" mb="4" />
        <Skeleton w="90%" h={5} rounded="md" startColor="gray.500" />
      </VStack>
    </VStack>
  );
}
