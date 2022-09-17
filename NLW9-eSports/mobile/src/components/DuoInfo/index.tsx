import { Text, VStack } from "native-base";
import { IColors } from "native-base/lib/typescript/theme/base/colors";

interface DuoProps {
  label: string;
  value: string;
  colorValue?: IColors;
}

export function Duoinfo({ label, value, colorValue }: DuoProps) {
  return (
    <VStack w="full" mb={4}>
      <Text color="gray.300" fontSize={"sm"} fontFamily="body" mb="1">
        {label}
      </Text>

      <Text
        color={colorValue ?? "white"}
        fontSize={"sm"}
        fontWeight="bold"
        numberOfLines={1}
      >
        {value}
      </Text>
    </VStack>
  );
}
