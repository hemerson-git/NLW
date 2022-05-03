import { ChatTeardropDots } from "phosphor-react";
import { Popover } from "@headlessui/react";

export function Widget() {
  return (
    <Popover className="absolute bottom-4 right-4">
      <Popover.Panel>
        <p>Hello, World!</p>
      </Popover.Panel>

      <Popover.Button
        className="
        bg-brand-500 
        rounded-full 
        text-white 
        px-3 h-12 
        flex 
        items-center 
        group"
      >
        <ChatTeardropDots className="w-6 h-6" />
        <span
          className="
          max-w-0 
          overflow-hidden 
          group-hover:max-w-xs 
          transition-all 
          duration-500 ease-linear"
        >
          <span className="pl-2"></span>
          Feedback
        </span>
      </Popover.Button>
    </Popover>
  );
}
