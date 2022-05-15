import { useState } from "react";

import { CloseButton } from "../CloseButton";
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";

import BugImageURL from "../../assets/Bug.svg";
import IDEAImageURL from "../../assets/Idea.svg";
import ThoughtImageURL from "../../assets/Thought.svg";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: BugImageURL,
      alt: "Imagem de um inseto",
    },
  },

  IDEA: {
    title: "Ideia",
    image: {
      source: IDEAImageURL,
      alt: "Imagem de uma lâmpada",
    },
  },

  OTHER: {
    title: "Outro",
    image: {
      source: ThoughtImageURL,
      alt: "Imagem de um balão de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<null | FeedbackType>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleSelectFeedbackType(type: FeedbackType) {
    setFeedbackType(type);
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleSendFeedback() {
    setFeedbackSent(true);
  }

  return (
    <div
      className="
      bg-zinc-900 
      p-4 
      relative 
      rounded-2xl 
      mb-4 
      flex 
      flex-col 
      items-center 
      shadow-lg
      w-[calc(100vw-2rem)]
      md:w-auto
      "
    >
      {feedbackSent ? (
        <FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep
              onFeedbackTypeChanged={handleSelectFeedbackType}
            />
          ) : (
            <FeedbackContentStep
              selectedFeedbackType={feedbackType}
              onFeedbackTypeRestarted={handleRestartFeedback}
              onFeedbackSent={handleSendFeedback}
            />
          )}
        </>
      )}

      <footer>
        <span className="text">
          Feito com 💜 pela{" "}
          <a
            href="https://rocketseat.com.br"
            className="underline underline-offset-2"
          >
            RocketSeat
          </a>
        </span>
      </footer>
    </div>
  );
}
