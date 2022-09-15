import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "./assets/logo.svg";

// COMPONENTS
import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import { GameController } from "phosphor-react";

// SERVICES
import { api } from "./services/api";
import { Input } from "./components/Form/input";

interface APIGamesProps {
  id: string;
  bannerUrl: string;
  title: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<APIGamesProps[]>([] as APIGamesProps[]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/games");
      setGames(data);
    })();
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex items-center flex-col my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui
      </h1>

      <section className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
            title={game.title}
          />
        ))}
      </section>

      <Dialog.Root>
        <CreateAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed backdrop-blur-sm transition-opacity" />

          <Dialog.Content
            className="fixed bg-[#2A2634] py-8 px-10 
            text-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2
            rounded-md shadow-lg shadow-black/25"
          >
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>

            <form action="" className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>

                <Input
                  id="game"
                  placeholder="Selecione o game que deseja jogar"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input
                    type="number"
                    id="yearsPlaying"
                    placeholder="Tudo bem ser ZERO"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual o seu Discord?</label>
                  <Input type="text" id="discord" placeholder="Usuario#1234" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando constuma jogar?</label>

                  <div className="grid grid-cols-4 gap-2">
                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Domingo"
                    >
                      D
                    </button>

                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Segunda-Feira"
                    >
                      S
                    </button>

                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Terça-Feira"
                    >
                      T
                    </button>

                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Quarta-Feira"
                    >
                      Q
                    </button>

                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Quinta-Feira"
                    >
                      Q
                    </button>

                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Sexta-Feira"
                    >
                      S
                    </button>

                    <button
                      className="w-8 h-8 rounded bg-zinc-900"
                      title="Sábado"
                    >
                      S
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" id="hourStart" placeholder="De" />
                    <Input type="time" id="hourEnd" placeholder="Até" />
                  </div>
                </div>
              </div>

              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checkbox" id="" />
                Costumo que conectar ao chat de voz
              </div>

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
      </Dialog.Root>
    </div>
  );
}

export default App;
