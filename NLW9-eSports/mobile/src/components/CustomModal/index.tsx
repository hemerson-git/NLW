import { useRef, useState } from "react";
import {
  Box,
  Center,
  IModalProps,
  Modal,
  Pressable,
  Spinner,
  Text,
  useTheme,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import * as Clipboard from "expo-clipboard";

import successAnimation from "../../assets/success.json";
import { Heading } from "../Heading";

interface CustomModalProps extends IModalProps {
  discord: string;
  closeModal: () => void;
}

export function CustomModal({
  discord,
  closeModal,
  ...rest
}: CustomModalProps) {
  const animation = useRef(null);
  const { colors } = useTheme();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsLoading(true);
    await Clipboard.setStringAsync(discord);
    toast.show({
      description: "Discord Copiado para a área de transferencia!",
      background: "success.500",
      fontWeight: "semibold",
    });
    setIsLoading(false);
    closeModal();
  }

  return (
    <Center safeArea>
      <Modal
        flex={1}
        justifyContent="center"
        alignItems="center"
        _backdrop={{
          bg: "overlay",
          opacity: "1",
        }}
        onClose={closeModal}
        {...rest}
      >
        <Modal.Content
          bg="gray.700"
          w={311}
          borderRadius={2}
          alignItems="center"
          justifyContent="center"
        >
          <Modal.CloseButton
            icon={<MaterialIcons size={20} color="gray.300" />}
            onPress={closeModal}
            _pressed={{
              backgroundColor: "primary.500",
              color: "white",
            }}
          />

          <Modal.Body alignItems="center">
            <Box
              h={82}
              mt={6}
              overflow="hidden"
              alignItems="center"
              justifyContent="center"
            >
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: 180,
                  height: 180,

                  backgroundColor: colors.gray[700],
                }}
                source={successAnimation}
              />
            </Box>

            <Heading
              title="Let's Play!"
              subtitle="Agora é só começar a jogar!"
              alignItems="center"
            />

            <Text
              textAlign="center"
              color="gray.100"
              fontSize="md"
              fontWeight="semibold"
              mt={6}
              mb={2}
            >
              Adicione no seu discord
            </Text>

            <Pressable
              onPress={handleCopyDiscordToClipboard}
              bg="gray.900"
              w={231}
              h={12}
              justifyContent="center"
              alignItems="center"
              rounded={1}
              _pressed={{ opacity: 0.8 }}
              disabled={isLoading}
            >
              <Text color="gray.300" fontSize="md" fontFamily="body">
                {isLoading ? <Spinner color="primary.500" /> : discord}
              </Text>
            </Pressable>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
