import { useParams } from "react-router-dom";

import "./styles.scss";
import logoImg from "../../assets/images/logo.svg";

// import { useAuth } from "../../contexts/AuthContext";
import { useRoom } from "../../hooks/useRoom";

import RoomCode from "../../components/RoomCode";
import Question from "../../components/Question";
import CustomButtom from "../../components/Button";

type RoomParams = {
  id: string;
};

function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const { id: roomId } = params;
  const { questions, title } = useRoom(roomId);

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />

          <div>
            <RoomCode code={roomId} />
            <CustomButtom isOutlined>Encerrar Sala</CustomButtom>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length && <span>{questions.length} Perguntas</span>}
        </div>

        {questions.map((question) => {
          return (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            />
          );
        })}
      </main>
    </div>
  );
}

export default AdminRoom;
