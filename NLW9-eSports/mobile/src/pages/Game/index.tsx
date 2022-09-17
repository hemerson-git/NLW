import { useEffect, useState } from "react";
import {
  VStack,
  HStack,
  useTheme,
  Pressable,
  Image,
  Box,
  FlatList,
  Text,
} from "native-base";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

import logoImg from "../../assets/logo-nlw-esports.png";

// COMPONENTS
import { Background } from "../../components/Background";
import { Heading } from "../../components/Heading";
import { AdsCard } from "../../components/AdsCard";

// SERVICES
import { API } from "../../services/api";
import { styles } from "./styles";

interface RouteProps {
  id: string;
  title: string;
  bannerUrl: string;
}

export function Game() {
  const route = useRoute();
  const { colors } = useTheme();
  const params = route.params as RouteProps;
  const navigation = useNavigation();

  const [duoAds, setDuoAds] = useState([]);

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    (async () => {
      const { data } = await API.get(`/games/${params.id}/ads`);
      setDuoAds(data);
    })();
  }, []);

  return (
    <Background>
      <VStack flex={1} alignItems="center" safeArea>
        <HStack
          w="full"
          flexDirection="row"
          alignItems="center"
          paddingX={8}
          mb={8}
          mt={4}
          justifyContent="space-between"
        >
          <Pressable
            onPress={handleGoBack}
            _pressed={{ opacity: 0.8 }}
            py={2}
            px={0}
          >
            <Entypo
              name="chevron-thin-left"
              color={colors.primary[500]}
              size={20}
            />
          </Pressable>

          <Image source={logoImg} alt="" w={18} h={10} />

          <Box w={5} h={5} />
        </HStack>

        <Image
          source={{ uri: params.bannerUrl }}
          alt={`Capa do Jogo ${params.title}`}
          w={311}
          h="40"
          borderRadius="md"
          resizeMode="cover"
        />

        <Heading title={params.title} subtitle="Conecte-se e comece a jogar!" />

        <HStack>
          <FlatList
            data={duoAds}
            renderItem={({ item }) => <AdsCard data={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            pl="10"
            contentContainerStyle={[
              duoAds.length ? styles.listContainer : styles.emptyListContainer,
            ]}
            ListEmptyComponent={() => (
              <VStack
                flex={1}
                alignContent="center"
                justifyContent="center"
                h="85%"
              >
                <Text
                  color="gray.300"
                  fontSize="sm"
                  fontFamily="body"
                  textAlign="center"
                >
                  Ainda não há anúncios cadastrados
                </Text>
              </VStack>
            )}
          />
        </HStack>
      </VStack>
    </Background>
  );
}
