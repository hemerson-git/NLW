import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { Share } from "react-native";
import { HStack, useToast, VStack } from "native-base";

// COMPONENTS
import { Header } from "../../components/Header";
import { Loading } from "../../components/Loading";
import { PollProps } from "../../components/PollCard";
import { PollHeader } from "../../components/PollHeader";
import { EmptyMyPoolList } from "../../components/EmptyMyPoolList";
import { Guesses } from "../../components/Guesses";
import { Option } from "../../components/Option";

// SERVICES
import { API } from "../../services/api";

interface RouteParams {
  id: string;
}

export interface PollDetailsProps {}

export function PollDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [poll, setPoll] = useState({} as PollProps);
  const [selectedOption, setSelectedOption] = useState<"guesses" | "ranking">(
    "guesses"
  );

  const toast = useToast();
  const route = useRoute();

  const { id } = route.params as RouteParams;

  async function fetchDetails() {
    try {
      setIsLoading(true);

      const { data } = await API.get(`/polls/${id}`);

      setPoll(data.poll);
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi possível carregar os detalhes do bolão",
        placement: "top",
        bg: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poll.code,
    });
  }

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <VStack flex={1} bg="gray.900">
      <Header
        title={poll.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {poll._count?.participants > 0 ? (
        <VStack>
          <PollHeader data={poll} />

          <HStack bg="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Meus Palpites"
              isSelected={selectedOption === "guesses"}
              onPress={() => setSelectedOption("guesses")}
            />

            <Option
              title="Ranking do Grupo"
              isSelected={selectedOption === "ranking"}
              onPress={() => setSelectedOption("ranking")}
            />
          </HStack>

          <Guesses pollId={poll.id} code={poll.code} />
        </VStack>
      ) : (
        <EmptyMyPoolList code={poll.code} />
      )}
    </VStack>
  );
}
