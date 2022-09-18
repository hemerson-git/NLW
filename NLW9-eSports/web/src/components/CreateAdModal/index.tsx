import { FormEvent, useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as CheckBox from "@radix-ui/react-checkbox";
import * as Toggle from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";

// COMPONENTS
import { Input } from "../Form/input";
import { Select } from "../Form/select";

// SERVICES
import { api } from "../../services/api";

interface APIGamesProps {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<APIGamesProps[]>([] as APIGamesProps[]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<string>();
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/games");
      setGames(data);
    })();
  }, []);

  const handleCreateAd = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await api.post(`/games/${data.selectedGame}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      });

      console.log(data);

      alert("Anúncio Criado com sucesso!");
    } catch (err) {
      alert("Erro ao Criar anúncio!");
    }
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed backdrop-blur-sm transition-opacity" />

      <Dialog.Content
        className="fixed bg-[#2A2634] py-8 px-10 
        text-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
          rounded-md shadow-lg shadow-black/25 select-none
        "
      >
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>

            <Select
              items={games.map((game) => {
                return { title: game.title, value: game.id };
              })}
              value={selectedGame}
              onValueChange={setSelectedGame}
              name="selectedGame"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              name="name"
              id="name"
              placeholder="Como te chamam dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input
                name="yearsPlaying"
                type="number"
                id="yearsPlaying"
                placeholder="Tudo bem ser ZERO"
                min={0}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual o seu Discord?</label>
              <Input
                name="discord"
                type="text"
                id="discord"
                placeholder="Usuario#1234"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando constuma jogar?</label>

              <Toggle.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <Toggle.Item
                  value="0"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  D
                </Toggle.Item>

                <Toggle.Item
                  value="1"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </Toggle.Item>

                <Toggle.Item
                  value="2"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  T
                </Toggle.Item>

                <Toggle.Item
                  value="3"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </Toggle.Item>

                <Toggle.Item
                  value="4"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  Q
                </Toggle.Item>

                <Toggle.Item
                  value="5"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </Toggle.Item>

                <Toggle.Item
                  value="6"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                >
                  S
                </Toggle.Item>
              </Toggle.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  name="hourStart"
                  id="hourStart"
                  placeholder="De"
                />

                <Input
                  type="time"
                  name="hourEnd"
                  id="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <CheckBox.Root
              className="w-6 h-6 rounded bg-zinc-900"
              name="useVoiceChannel"
              checked={useVoiceChannel}
              onCheckedChange={(checked) =>
                checked === true
                  ? setUseVoiceChannel(true)
                  : setUseVoiceChannel(false)
              }
            >
              <CheckBox.Indicator className="flex items-center justify-center">
                <Check className="w-4 h-4 text-emerald-400" />
              </CheckBox.Indicator>
            </CheckBox.Root>
            Costumo que conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-3">
            <Dialog.Close
              type="button"
              className="
              bg-zinc-500 px-5 h-12 rounded-md font-semibold
                hover:bg-zinc-600 trasition-colors
              "
            >
              Cancelar
            </Dialog.Close>

            <button
              type="submit"
              className="
              bg-violet-500 px-5 h-12 rounded-md font-semibold 
                flex items-center gap-3 hover:bg-violet-600 transition-colors
              "
            >
              <GameController size={24} />
              Encontrar Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
