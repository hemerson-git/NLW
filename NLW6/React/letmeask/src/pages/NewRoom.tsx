import { Link, useHistory } from "react-router-dom";

import CustomButton from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

import "../styles/auth.scss";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import { useEffect } from "react";

function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

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

          <form action="">
            <input type="text" placeholder="Nome da sala" />
            <CustomButton type="submit">Criar sala</CustomButton>
          </form>

          <p>
            Quer entrar em uma sala já existente?
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default NewRoom;