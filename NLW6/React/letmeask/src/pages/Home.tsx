import { useHistory } from "react-router-dom";

import "../styles/auth.scss";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleLogoImg from "../assets/images/google-icon.svg";

import CustomButton from "../components/Button";
import { auth, firebase } from "../services/firebase";

function Home() {
  const history = useHistory();

  async function handleCreateRoom() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleLogoImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

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
