import { Heading as Title, HStack, Text, VStack } from "native-base";
import { IVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";

interface HeadingProps extends IVStackProps {
  title: string;
  subtitle: string;
}

export function Heading({ title, subtitle, ...props }: HeadingProps) {
  return (
    <VStack {...props}>
      <Title fontSize="3xl" fontFamily="heading" color="white">
        {title}
      </Title>

      <Text color="gray.400" fontSize="xl" fontFamily="body">
        {subtitle}
      </Text>
    </VStack>
  );
}
