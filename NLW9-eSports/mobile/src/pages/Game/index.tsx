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
import { AdsCard, AdsCardSkeleton } from "../../components/AdsCard";
import { CustomModal } from "../../components/CustomModal";

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
  const [showModal, setShowModal] = useState(false);
  const [duoDiscord, setDuoDiscord] = useState("");
  const [isLoadingDiscord, setIsLoadingDiscord] = useState(false);
  const [isLoadingAds, setIsLoadingAds] = useState(true);

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleConnect(adsId: string) {
    try {
      setIsLoadingDiscord(true);
      const { data } = await API.get(`/ads/${adsId}/discord`);
      setIsLoadingDiscord(false);
      setDuoDiscord(data.discord);
    } catch (error) {
      setDuoDiscord("Ocorreu algum erro, tente novamente");
    }
  }

  useEffect(() => {
    (async () => {
      if (isLoadingAds) {
        const { data } = await API.get(`/games/${params.id}/ads`);
        setDuoAds(data);
        setIsLoadingAds(false);
      }
    })();
  }, [isLoadingAds]);

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
            renderItem={({ item }) => (
              <AdsCard
                onConnect={() => {
                  setShowModal(true);
                  handleConnect(item.id);
                }}
                isLoading={isLoadingAds}
                data={item}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            pl="10"
            contentContainerStyle={[
              duoAds.length ? styles.listContainer : styles.emptyListContainer,
            ]}
            ListEmptyComponent={() => {
              return isLoadingAds ? (
                <>
                  <AdsCardSkeleton />
                  <AdsCardSkeleton />
                  <AdsCardSkeleton />
                </>
              ) : (
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
              );
            }}
          />
        </HStack>

        <CustomModal
          animationPreset="fade"
          isOpen={showModal}
          discord={duoDiscord}
          closeModal={() => setShowModal(false)}
          onClose={() => setShowModal(false)}
        />
      </VStack>
    </Background>
  );
}
