import { Fontisto } from "@expo/vector-icons";
import { Center, Text, Icon } from "native-base";

import ImageLogo from "../../assets/logo.svg";
import { Button } from "../../components/Button";

import { useAuth } from "../../hooks/useAuth";

export function SignIn() {
  const { signIn, isUserLoading } = useAuth();

  return (
    <Center flex={1} bg="black" p={7}>
      <ImageLogo width={212} height={40} />

      <Button
        title="Create new account"
        leftIcon={<Icon as={Fontisto} name="google" size="md" color="white" />}
        type="SECONDARY"
        mt={12}
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{
          _spinner: {
            color: "white",
          },
        }}
      />

      <Text color="white" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {`\n`}
        do seu e-mail para criação de sua conta
      </Text>
    </Center>
  );
}
