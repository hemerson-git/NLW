import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import logoImg from "./assets/logo.svg";

// COMPONENTS
import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import { CreateAdModal } from "./components/CreateAdModal";

// SERVICES
import { api } from "./services/api";

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
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
