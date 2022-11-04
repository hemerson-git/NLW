import { HStack } from "native-base";
import CountryFlag from "react-native-country-flag";

import { Input } from "../Input";

interface Props {
  code: string;
  position: "left" | "right";
  onChangeText: (value: string) => void;
  score?: number | null;
}

export function Team({ code, position, onChangeText, score }: Props) {
  return (
    <HStack alignItems="center">
      {position === "left" && (
        <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />
      )}

      {!score ? (
        <Input
          w={10}
          h={9}
          textAlign="center"
          fontSize="xs"
          keyboardType="numeric"
          onChangeText={onChangeText}
        />
      ) : (
        <Input
          w={10}
          h={9}
          textAlign="center"
          fontSize="xs"
          keyboardType="numeric"
          onChangeText={onChangeText}
          value={String(score)}
          _disabled={{
            bg: "gray.900",
          }}
          isDisabled
        />
      )}

      {position === "right" && (
        <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />
      )}
    </HStack>
  );
}
