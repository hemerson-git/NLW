import { useState } from "react";
import { Github, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useCompletion } from "ai/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";

export function App() {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<string | null>(null);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-Type": "application/json",
    }
  });

  function handleSetVideoId(id: string) {
    setVideoId(id);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-3 flex items-center justify-between border-b">
        <h1 className="text-xl font-bold">upload.ai</h1>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Developed with 💜 on the NLW
          </span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant="outline">
            <Github className="w-4 h-4 mr-2" />
            Github
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 flex gap-6">
        <section className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              placeholder="Include you prompt to the AI..."
              className="resize-none p-4 leading-relaxed"
              value={input}
              onChange={handleInputChange}
            />

            <Textarea
              placeholder="AI output generated"
              readOnly
              className="resize-none p-4 leading-relaxed"
              value={completion}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Remember: You can use the Variable{" "}
            <code className="text-violet-400">{`{transcription}`}</code> on your
            prompt to add the selected video content transcription.
          </p>
        </section>

        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={handleSetVideoId} />

          <Separator />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="">Prompt</label>

              <PromptSelect onPromptSelect={setInput} />
            </div>

            <div className="space-y-2">
              <label htmlFor="">Model</label>

              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className="italic text-xs text-muted-foreground block">
                You will be able to customize this options soon.
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperature</Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />

              <span className="block text-xs leading-relaxed text-muted-foreground italic">
                Higher value tends to result in more creative outputs, although
                with potential mistakes.
              </span>
            </div>

            <Separator />

            <Button type="submit" className="w-full" disabled={isLoading}>
              Run
              <Wand2 className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  );
}

export default App;
