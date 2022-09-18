import { IPressableProps, Text, VStack } from "native-base";
import { Pressable } from "native-base";
import { Duoinfo } from "../DuoInfo";
import { GameController } from "phosphor-react-native";

export interface AdsCardProps {
  id: string;
  hourStart: string;
  hourEnd: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

type Props = IPressableProps & {
  data: AdsCardProps;
  onConnect: () => void;
};

export function AdsCard({ data, onConnect, ...rest }: Props) {
  const [hourEnd] = data.hourEnd.split(":");
  const [hourStart] = data.hourStart.split(":");

  return (
    <VStack
      w={200}
      bg="gray.700"
      padding={5}
      borderRadius="md"
      mr={4}
      alignItems="center"
    >
      <Duoinfo label="Nome" value={data.name} />
      <Duoinfo label="Tempo de Jogo" value={`${data.yearsPlaying} anos`} />
      <Duoinfo
        label="Disponibilidade"
        value={`${data.weekDays.length} \u2022 ${hourEnd}h - ${hourStart}h`}
      />
      <Duoinfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={data.useVoiceChannel ? "green.500" : "danger.500"}
      />

      <Pressable
        onPress={onConnect}
        bg="primary.500"
        _pressed={{ opacity: 0.8 }}
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        rounded="md"
        w="full"
        h={"9"}
        {...rest}
      >
        <GameController color="white" size={20} />
        <Text color="white" ml="2">
          Conectar
        </Text>
      </Pressable>
    </VStack>
  );
}
