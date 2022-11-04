import { useNavigation } from "@react-navigation/native";
import { Text, VStack, Icon } from "native-base";
import { Octicons } from "@expo/vector-icons";

// COMPONENTS
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

export function MyPools() {
  const navigation = useNavigation();

  function handleNavigateToFindPolls() {
    navigation.navigate("find_poll");
  }

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

      <Text>My Pools</Text>
    </VStack>
  );
}
