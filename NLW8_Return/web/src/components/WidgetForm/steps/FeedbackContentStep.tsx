import { useState } from "react";
import { ArrowLeft } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "..";

import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../../ScreenshotButton";

interface FeedbackContentStepProps {
  selectedFeedbackType: FeedbackType;
  onFeedbackTypeRestarted: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  selectedFeedbackType,
  onFeedbackTypeRestarted,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const feedbackTypeInfo = feedbackTypes[selectedFeedbackType];

  function handleScreenshotTook(imageURL: string | null) {
    setScreenshot(imageURL);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(comment);

    if (screenshot) {
      console.log(screenshot);
    }

    onFeedbackSent();
  }

  return (
    <>
      <header className="flex items-center justify-center">
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-200"
          onClick={onFeedbackTypeRestarted}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl flex items-center leading-6 gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
          />

          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={(event) => handleSubmit(event)}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-400 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex mt-2 gap-2">
          <ScreenshotButton
            onScreenshotTook={handleScreenshotTook}
            screenshot={screenshot}
          />

          <button
            type="submit"
            disabled={comment.trim().length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
