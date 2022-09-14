import { FlatList, Image, VStack } from "native-base";

import logo from "../../assets/logo-nlw-esports.png";

// COMPONENTS
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { GameCard } from "../../components/GameCard";

// UTILS
import { GAMES } from "../../utils/games";

export function Home() {
  return (
    <Background>
      <VStack alignItems="center" justifyItems="center" mt={74} mb={12}>
        <Image source={logo} alt="" width={214} h={120} />
      </VStack>

      <Heading
        title="Encontre seu duo!"
        subtitle="Conecte-se e comece a jogar..."
        p={6}
      />

      <FlatList
        data={GAMES}
        horizontal
        pl={8}
        contentContainerStyle={{ paddingRight: 64 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GameCard
            data={{
              ads: item.ads,
              cover: item.cover,
              name: item.name,
              id: item.id,
            }}
          />
        )}
      />
    </Background>
  );
}
