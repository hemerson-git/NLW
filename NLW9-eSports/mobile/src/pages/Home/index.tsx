import { useEffect, useState } from "react";
import { FlatList, Image, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import logo from "../../assets/logo-nlw-esports.png";

// COMPONENTS
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";

// SERVICES
import { API } from "../../services/api";

interface APIGames {
  bannerUrl: string;
  id: string;
  title: string;
  _count: {
    ads: number;
  };
}

export function Home() {
  const [games, setGames] = useState<APIGames[]>([] as APIGames[]);
  const navigation = useNavigation();

  function handleOpenGame({ id, bannerUrl, title }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  useEffect(() => {
    (async () => {
      const { data } = await API.get("/games");
      setGames(data);
    })();
  }, []);

  return (
    <Background>
      <VStack safeArea>
        <VStack alignItems="center" justifyItems="center" mt={74} mb={12}>
          <Image source={logo} alt="" width={214} h={120} />
        </VStack>

        <Heading
          title="Encontre seu duo!"
          subtitle="Conecte-se e comece a jogar..."
          p={6}
        />

        <FlatList
          data={games}
          horizontal
          pl={8}
          contentContainerStyle={{ paddingRight: 64 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard
              data={{
                _count: {
                  ads: item._count.ads,
                },
                bannerUrl: item.bannerUrl,
                title: item.title,
                id: item.id,
              }}
              onPress={() =>
                handleOpenGame({
                  bannerUrl: item.bannerUrl,
                  id: item.id,
                  title: item.title,
                  _count: item._count,
                })
              }
            />
          )}
        />
      </VStack>
    </Background>
  );
}
