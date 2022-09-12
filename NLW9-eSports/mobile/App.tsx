import { NativeBaseProvider, VStack, Text, StatusBar } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <VStack
        bg="purple.700"
        minHeight="full"
        alignItems="center"
        justifyContent="center"
      >
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="#7e22ce"
        />
        <Text color="white" fontSize="lg">
          Hello, World!
        </Text>
      </VStack>
    </NativeBaseProvider>
  );
}
