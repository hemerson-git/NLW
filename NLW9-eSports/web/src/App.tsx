import { useState } from "react";
import { MagnifyingGlassPlus } from "phosphor-react";

import logoImg from "./assets/logo.svg";

function App() {
  const [count, setCount] = useState(0);

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
        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game_1.jpg" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">League of Legends</strong>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>

        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game_2.jpg" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">Dota 2</strong>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>

        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game_3.jpg" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">CS:GO</strong>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>

        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game_4.jpg" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">Apex Legends</strong>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>

        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game_5.jpg" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">Fortnite</strong>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>

        <a href="" className="relative rounded-lg overflow-hidden">
          <img src="/game_6.jpg" alt="" />

          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white">WarCraft</strong>
            <span className="text-zinc-300 text-sm block mt-1">4 anúncios</span>
          </div>
        </a>
      </section>

      <section className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black">
              Não encontrou o seu duo?
            </strong>

            <span className="text-zinc-400 block">
              Plublique um anúncio para encontrar novos players!
            </span>
          </div>

          <button
            type="button"
            className="py-3 px-4 bg-violet-500 text-white rounded flex items-center gap-2 hover:bg-violet-600 transition-colors"
          >
            <MagnifyingGlassPlus size={24} />
            Publicar Anúncio
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
