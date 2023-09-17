import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/lib/axios";

type PromptProps = {
  id: string;
  template: string;
  title: string;
};

type PromptSelectProps = {
  onPromptSelect: (template: string) => void;
};

export function PromptSelect({ onPromptSelect }: PromptSelectProps) {
  const [prompts, setPrompts] = useState<PromptProps[] | null>(null);

  function handlePromptChange(promptId: string) {
    const selectedPrompt = prompts?.find((prompt) => prompt.id === promptId);

    if (!selectedPrompt) return;

    onPromptSelect(selectedPrompt.template);
  }

  useEffect(() => {
    async function getPrompts() {
      const response = await api.get("/prompts");
      const { prompts } = response.data;
      setPrompts(prompts);
    }

    getPrompts();
  }, []);

  return (
    <Select onValueChange={handlePromptChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a prompt..." />
      </SelectTrigger>

      <SelectContent>
        {prompts?.map((prompt) => (
          <SelectItem key={prompt.id} value={prompt.id}>
            {prompt.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
