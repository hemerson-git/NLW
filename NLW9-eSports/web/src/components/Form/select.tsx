import { InputHTMLAttributes } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { CaretDown } from "phosphor-react";

interface SelectProps extends RadixSelect.SelectProps {
  items: {
    title: string;
    value: string;
  }[];
}

export function Select({ items, ...rest }: SelectProps) {
  return (
    <RadixSelect.Root {...rest}>
      <RadixSelect.Trigger
        className="
          flex whitespace-nowrap text-ellipsis gap-1 
          items-center justify-between bg-zinc-900 py-3 px-4 
          rounded text-sm text-zinc-500"
      >
        <RadixSelect.Value placeholder="Selecione o game que deseja jogar" />
        <RadixSelect.Icon>
          <CaretDown />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content>
          <RadixSelect.ScrollUpButton />

          <RadixSelect.Viewport className="bg-zinc-100/60 px-2 py-4 rounded-md backdrop-blur-sm">
            {items.map((item) => (
              <RadixSelect.Item
                value={item.value}
                key={item.value}
                className="
                    hover:bg-violet-600 hover:text-white px-2 rounded-sm
                    transition-colors cursor-pointer
                  "
              >
                <RadixSelect.ItemText>{item.title}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator />
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>

          <RadixSelect.ScrollDownButton />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
