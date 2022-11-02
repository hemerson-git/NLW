import { FormEvent, useState } from "react";
import Image from "next/image";

// IMAGES
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import usersAvatarExampleImg from "../assets/users-avatar-example.png";
import checkImage from "../assets/icon-check.svg";

// SERVICES
import { API } from "../services/api";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function handleCreatePool(event: FormEvent) {
    event.preventDefault();
    try {
      const { data } = await API.post("/pools", {
        title: poolTitle,
      });

      console.log(data.code);

      navigator.clipboard.writeText(data.code);
      alert(
        "Bolão criado com sucesso! Código copiado para a área de transferência."
      );
      setPoolTitle("");
    } catch (error) {
      alert("Falha ao criar o bolão, por favor, tente novamente!");
    }
  }

  return (
    <div className="max-w-[1124px] min-h-screen mx-auto grid grid-cols-2 items-center gap-28">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="" />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{userCount}</span> pessoas já
            estão usando
          </strong>
        </div>

        <form onSubmit={handleCreatePool} className="flex mt-10 gap-2">
          <input
            onChange={(event) => setPoolTitle(event.currentTarget.value)}
            className="
              flex-1 px-6 py-4 rounded bg-gray-800 border 
              border-gray-600 text-sm text-gray-100
            "
            type="text"
            placeholder="Qual nome do seu bolão?"
            value={poolTitle}
            required
          />

          <button
            className="
              bg-yellow-500 px-6 py-4 rounded font-bold text-gray-900 text-sm uppercase
              hover:bg-yellow-700 hover:transition-colors
            "
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="text-gray-300 text-sm mt-4 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <footer
          className="
          mt-10 pt-10 border-t border-gray-600 divide-x divide-gray-600 grid grid-cols-2
          text-gray-100
        "
        >
          <div className="flex gap-6 items-center">
            <Image src={checkImage} alt="" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold">+ {poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="flex gap-6 items-center justify-end">
            <Image src={checkImage} alt="" />

            <div className="flex flex-col">
              <span className="text-2xl font-bold">+ {guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </footer>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel da NLW Copa"
        quality={100}
      />
    </div>
  );
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      API.get("/pools/count"),
      API.get("/guesses/count"),
      API.get("/users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};
