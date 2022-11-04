import { useNavigation } from "@react-navigation/native";
import { Row, Text, Pressable } from "native-base";

export function EmptyPoolList() {
  const navigation = useNavigation();

  function handleGoToFindPollPage() {
    navigation.navigate("find_poll");
  }

  function handleGoToCreatePollPage() {
    navigation.navigate("new_poll");
  }

  return (
    <Row flexWrap="wrap" justifyContent="center">
      <Text color="white" fontSize="sm" textAlign="center">
        Você ainda não está participando de {"\n"} nenhum bolão, que tal
      </Text>

      <Pressable onPress={handleGoToFindPollPage}>
        <Text
          textDecorationLine="underline"
          color="yellow.500"
          textDecoration="underline"
        >
          buscar um por código
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center" mx={1}>
        ou
      </Text>

      <Pressable onPress={handleGoToCreatePollPage}>
        <Text textDecorationLine="underline" color="yellow.500">
          criar um novo
        </Text>
      </Pressable>

      <Text color="white" fontSize="sm" textAlign="center">
        ?
      </Text>
    </Row>
  );
}
