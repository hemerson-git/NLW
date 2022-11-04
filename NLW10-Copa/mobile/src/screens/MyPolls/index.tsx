import { useEffect, useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Text, VStack, Icon, useToast, FlatList } from "native-base";
import { Octicons } from "@expo/vector-icons";

// COMPONENTS
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { PollCard, PollProps } from "../../components/PollCard";

// SERVICES

import { API } from "../../services/api";
import { EmptyPoolList } from "../../components/EmptyPoolList";

export function MyPools() {
  const navigation = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [polls, setPolls] = useState<PollProps[]>([]);

  function handleNavigateToFindPolls() {
    navigation.navigate("find_poll");
  }

  function handleNavigateToPoll(id: string) {
    navigation.navigate("details", { id });
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          setIsLoading(true);
          const response = await API.get("/polls");
          setPolls(response.data);
        } catch (err) {
          console.log(err);

          toast.show({
            title: "Não foi possível carregar os bolões",
            placement: "top",
            bg: "red.500",
          });
        } finally {
          setIsLoading(false);
        }
      })();
    }, [])
  );

  return (
    <VStack bg="gray.900" flex={1}>
      <Header title="Meus bolões" />

      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor="gray.600"
        pb={4}
        mb={4}
      >
        <Button
          title="Buscar bolão por código"
          leftIcon={
            <Icon as={Octicons} name="search" color="black" size="md" />
          }
          onPress={handleNavigateToFindPolls}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={polls}
          keyExtractor={(poll) => poll.id}
          renderItem={({ item }) => (
            <PollCard
              data={item}
              onPress={() => handleNavigateToPoll(item.id)}
            />
          )}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 20 }}
          ListEmptyComponent={() => <EmptyPoolList />}
        />
      )}

      <Text>My Pools</Text>
    </VStack>
  );
}
