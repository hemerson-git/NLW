import { Center, Heading, Spinner } from "native-base";
import { Background } from "../Background";

export function Loading() {
  return (
    <Center flex={1} flexDirection="row">
      <Spinner color="primary.500" mr={4} size="lg" />

      <Heading fontSize="2xl" color="white">
        Loading
      </Heading>
    </Center>
  );
}
