import { useState } from "react";
import { Heading, useToast, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

// COMPONENTS

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

// SERVICES
import { API } from "../../services/api";

export function FindPool() {
  const [isLoading, setIsLoading] = useState(false);
  const [pollCode, setPollCode] = useState("");
  const navigation = useNavigation();
  const toast = useToast();

  async function handleFindPoll() {
    try {
      setIsLoading(true);

      if (!pollCode.trim()) {
        return toast.show({
          title: "Informe o código do bolão",
          placement: "top",
          bg: "red.500",
        });
      }

      await API.post(`/polls/join`, { code: pollCode });

      return toast.show({
        title: "Parabéns, você entrou no bolão com sucesso!",
        placement: "top",
        bg: "green.500",
      });

      navigation.navigate("polls");
    } catch (error) {
      console.log(error);

      setIsLoading(false);
      let errorMessage = "Não foi possível encontrar o bolão";

      if (error.response?.data?.message === "Poll not founded.") {
        errorMessage = "Bolão não encontrado";
      }

      if (error.response?.data?.message === "You're already into this poll.") {
        errorMessage = "Você já está participando deste bolão";
      }

      return toast.show({
        title: errorMessage,
        placement: "top",
        bg: "red.500",
      });
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão através de {`\n`}seu código único!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o código do bolão?"
          onChangeText={setPollCode}
          value={pollCode}
          autoCapitalize="characters"
        />

        <Button
          title="Buscar bolão"
          mt={4}
          isLoading={isLoading}
          onPress={handleFindPoll}
        />
      </VStack>
    </VStack>
  );
}
