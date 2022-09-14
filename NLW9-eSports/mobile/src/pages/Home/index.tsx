import { Image, VStack } from "native-base";

import { Background } from "../../components/Background";
import logo from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";

export function Home() {
  return (
    <Background>
      <VStack alignItems="center" justifyItems="center" pt={"24"} mb={"10"}>
        <Image source={logo} alt="" width={240} h={135} />
      </VStack>

      <Heading
        title="Encontre seu duo!"
        subtitle="Conecte-se e comece a jogar..."
        p={6}
      />
    </Background>
  );
}
