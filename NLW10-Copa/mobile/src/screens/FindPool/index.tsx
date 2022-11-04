import { Heading, VStack } from "native-base";

import { Button } from "../../components/Button";

// COMPONENTS

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export function FindPool() {
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

        <Input mb={2} placeholder="Qual o código do bolão?" />

        <Button title="Buscar bolão" mt={4} />
      </VStack>
    </VStack>
  );
}
