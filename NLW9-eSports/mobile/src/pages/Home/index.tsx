import { Text, VStack } from "native-base";
import { Background } from "../../components/Background";

export function Home() {
  return (
    <VStack flex={1}>
      <Background>
        <Text>Hello, World</Text>
      </Background>
    </VStack>
  );
}
