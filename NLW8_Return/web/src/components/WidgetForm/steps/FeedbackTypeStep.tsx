import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (feedbackType: FeedbackType) => void;
}

export function FeedbackTypeStep(props: FeedbackTypeStepProps) {
  const { onFeedbackTypeChanged } = props;

  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <button
            className="bg-zinc-800 rounded-lg py-5 w-24 flex flex-1 flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus:outline-none focus:outline-brand-500"
            onClick={() => onFeedbackTypeChanged(key as FeedbackType)}
            type="button"
            key={key}
          >
            <img src={value.image.source} alt={value.image.alt} />

            <span>{value.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}
