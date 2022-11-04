import { useState, useEffect } from "react";
import { Box, FlatList, useToast } from "native-base";
import { getName } from "country-list";

// COMPONENTS
import { Game, GameProps } from "../../components/Game";

// SERVICES
import { API } from "../../services/api";
import { Loading } from "../Loading";
import { EmptyMyPoolList } from "../EmptyMyPoolList";

interface Props {
  pollId: string;
  code: string;
}

export function Guesses({ pollId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const { data } = await API.get(`/polls/${pollId}/games`);
      setGames(data.games);
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

  async function handleConfirmGuess(gameId: string) {
    try {
      setIsLoading(true);

      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        toast.show({
          title: "Informe o placar do palpite!",
          placement: "top",
          bg: "red.500",
        });
      }

      await API.post(`/polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: "Palpite enviado com sucesso, agora é só torcer!",
        placement: "top",
        bg: "green.500",
      });
    } catch (error) {
      console.log(error);

      toast.show({
        title: "Não foi enviar o palpite, tente novamente!",
        placement: "top",
        bg: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <FlatList
      data={games}
      keyExtractor={(game) => game.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleConfirmGuess(item.id)}
        />
      )}
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} />}
    />
  );
}
