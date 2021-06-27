import { useHistory, useParams } from "react-router-dom";

import "./styles.scss";
import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";

// import { useAuth } from "../../contexts/AuthContext";
import { useRoom } from "../../hooks/useRoom";

import RoomCode from "../../components/RoomCode";
import Question from "../../components/Question";
import CustomButtom from "../../components/Button";

import { database } from "../../services/firebase";

type RoomParams = {
  id: string;
};

function AdminRoom() {
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const { id: roomId } = params;
  const { questions, title } = useRoom(roomId);
  const history = useHistory();

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    const userConfirmation = window.confirm(
      "Tem certeza que deseja excluir esta pergunta?"
    );

    if (userConfirmation) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />

          <div>
            <RoomCode code={roomId} />

            <CustomButtom isOutlined onClick={handleEndRoom}>
              Encerrar Sala
            </CustomButtom>
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
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Apagar Pergunta" />
              </button>
            </Question>
          );
        })}
      </main>
    </div>
  );
}

export default AdminRoom;
