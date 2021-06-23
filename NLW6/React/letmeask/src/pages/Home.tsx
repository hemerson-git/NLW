import { useHistory } from "react-router-dom";

import "../styles/auth.scss";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleLogoImg from "../assets/images/google-icon.svg";

import { useAuth } from "../contexts/AuthContext";
import CustomButton from "../components/Button";

function Home() {
  const history = useHistory();
  const { signInWithGoogle, user } = useAuth();

  async function handleCreateRoom() {
    const result = await signInWithGoogle();

    if (result) {
      history.push("/rooms/new");
    }
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
          {!user ? (
            <button className="create-room" onClick={handleCreateRoom}>
              <img src={googleLogoImg} alt="Logo do Google" />
              Crie sua sala com o Google
            </button>
          ) : (
            <p>{user.name}</p>
          )}

          <div className="separator">Ou entre em uma sala</div>

          <form action="">
            <input type="text" placeholder="Digite o código da sala" />
            <CustomButton type="submit">Entrar na sala</CustomButton>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Home;
