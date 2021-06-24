import { useHistory } from "react-router-dom";
import { FormEvent } from "react";

import "../styles/auth.scss";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleLogoImg from "../assets/images/google-icon.svg";

import { useAuth } from "../contexts/AuthContext";
import CustomButton from "../components/Button";
import { useState } from "react";
import { database } from "../services/firebase";

function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (user) {
      history.push("/rooms/new");
      return;
    }

    const result = await signInWithGoogle();

    if (result) {
      history.push("/rooms/new");
    }
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists.");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleLogoImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">Ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={(event) => setRoomCode(event.target.value)}
            />

            <CustomButton type="submit">Entrar na sala</CustomButton>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
