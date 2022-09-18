import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "keen-slider/keen-slider.min.css";

import logoImg from "./assets/logo.svg";

// COMPONENTS
import { CreateAdBanner } from "./components/CreateAdBanner";
import { GameBanner } from "./components/GameBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { Slider } from "./components/Slider";

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/games");
      setGames(data);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="xl:max-w-[990px] 2xl:max-w-[1334px] mx-auto flex items-center flex-col my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{" "}
        está aqui
      </h1>

      <section className="mt-16 max-w-full">
        <Slider showArrows>
          {games.map((game, index) => (
            <div className={`keen-slider__slide number-slide${index}`}>
              <GameBanner
                key={game.id}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads}
                title={game.title}
              />
            </div>
          ))}
        </Slider>
      </section>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
