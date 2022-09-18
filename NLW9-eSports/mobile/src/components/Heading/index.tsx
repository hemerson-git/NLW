import { Heading as Title, HStack, Text, VStack } from "native-base";
import { IVStackProps } from "native-base/lib/typescript/components/primitives/Stack/VStack";

interface HeadingProps extends IVStackProps {
  title: string;
  subtitle: string;
}

export function Heading({ title, subtitle, ...props }: HeadingProps) {
  return (
    <VStack w="full" padding={8} {...props}>
      <Title fontSize="2xl" fontFamily="heading" color="white">
        {title}
      </Title>

      <Text color="gray.400" fontSize="md" fontFamily="body">
        {subtitle}
      </Text>
    </VStack>
  );
}
