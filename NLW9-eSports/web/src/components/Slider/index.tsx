import { MouseEventHandler, ReactNode, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { CaretLeft, CaretRight } from "phosphor-react";

interface SliderProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  showArrows?: boolean;
}

export function Slider({ children, showArrows, ...rest }: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: {
      perView: 4,
      spacing: 16,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className="relative">
      <div ref={sliderRef} {...rest} className="keen-slider overflow-hidden">
        {children}
      </div>

      {loaded && showArrows && instanceRef.current && (
        <div className="buttons text-white absolute -top-14 right-0">
          <button
            type="button"
            className="text-white disabled:text-gray-500 rounded-full p-2"
            onClick={(e) =>
              (e.stopPropagation() as unknown as MouseEventHandler<HTMLButtonElement>) ||
              instanceRef.current?.prev()
            }
          >
            <CaretLeft size={24} color="white" />
          </button>

          <button
            type="button"
            className="text-white font-bold bg-violet-400/30 border transition-colors border-violet-700 rounded-full p-2 hover:bg-violet-400"
            onClick={(e) =>
              (e.stopPropagation() as unknown as MouseEventHandler<HTMLButtonElement>) ||
              instanceRef.current?.next()
            }
          >
            <CaretRight size={24} weight="bold" />
          </button>
        </div>
      )}
    </div>
  );
}
