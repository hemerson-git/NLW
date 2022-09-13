import { useState } from "react";

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

      <div className="grid grid-cols-6 gap-6 mt-16">
        <a href="" className="relative">
          <img src="/game_1.jpg" alt="" className="rounded-md" />

          <div className="w-full pt-16 pb-4 px-4 absolute text-white bottom-0">
            <strong>League of Legends</strong>
          </div>
        </a>

        <a href="">
          <img src="/game_2.jpg" alt="" className="rounded-md" />
        </a>

        <a href="">
          <img src="/game_3.jpg" alt="" className="rounded-md" />
        </a>

        <a href="">
          <img src="/game_4.jpg" alt="" className="rounded-md" />
        </a>

        <a href="">
          <img src="/game_5.jpg" alt="" className="rounded-md" />
        </a>

        <a href="">
          <img src="/game_6.jpg" alt="" className="rounded-md" />
        </a>
      </div>
    </div>
  );
}

export default App;
