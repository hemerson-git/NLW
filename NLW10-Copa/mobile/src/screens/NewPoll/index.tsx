import { useState } from "react";
import { Heading, Text, VStack, useToast } from "native-base";

import Logo from "../../assets/logo.svg";
import { Button } from "../../components/Button";

// COMPONENTS

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { API } from "../../services/api";

export function NewPool() {
  const [pollTitle, setPollTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  async function handlePollCreate() {
    if (!pollTitle.trim()) {
      return toast.show({
        title: "Informe um nome para o seu bolão",
        placement: "top",
        bg: "red.500",
      });
    }

    try {
      setIsLoading(true);

      await API.post("/polls", { title: pollTitle });

      toast.show({
        title: "Não foi possível enviar o bolão",
        placement: "top",
        bg: "green.500",
      });

      setPollTitle("");
    } catch (error) {
      console.log(error);

      if (!pollTitle.trim()) {
        return toast.show({
          title: "Não foi possível enviar o bolão",
          placement: "top",
          bg: "red.500",
        });
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa {`\n`}e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual o nome do seu bolão?"
          value={pollTitle}
          onChangeText={setPollTitle}
        />

        <Button
          title="Criar meu bolão"
          mt={4}
          onPress={handlePollCreate}
          isLoading={isLoading}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
