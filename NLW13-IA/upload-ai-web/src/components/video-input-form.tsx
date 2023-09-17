import { Separator } from "@radix-ui/react-separator";
import { FileVideo, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { convertVideoToAudio } from "@/utils/convertVideoToAudio";
import { api } from "@/lib/axios";
import { PROGRESS } from "@/utils/constants";

type Status =
  | "waiting"
  | "converting"
  | "uploading"
  | "generating"
  | "success"
  | "error";

type VideoInputFormProps = {
  onVideoUploaded: (id: string) => void;
};

export function VideoInputForm({ onVideoUploaded }: VideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [progressStatus, setProgressStatus] = useState<Status>("waiting");
  const promptInputRef = useRef<HTMLTextAreaElement>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) {
      return;
    }

    const selectedFile = files[0];

    setVideoFile(selectedFile);
  }

  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const prompt = promptInputRef.current?.value;

    if (!videoFile) return;

    try {
      setProgressStatus("converting");
      const audioFile = await convertVideoToAudio(videoFile);

      const data = new FormData();

      data.append("file", audioFile);

      setProgressStatus("uploading");
      const response = await api.post("/videos", data);

      const videoId = response.data.video.id;

      setProgressStatus("generating");
      await api.post(`/videos/${videoId}/transcription`, {
        prompt,
      });

      setProgressStatus("success");
      onVideoUploaded(videoId);
    } catch (e) {
      setProgressStatus("error");
      console.log("Something went wrong, please try again!");
    }
  }

  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }

    setProgressStatus("waiting");

    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  return (
    <form className="space-y-6" onSubmit={handleUploadVideo}>
      <label
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col 
          gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 transition-opacity"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            <FileVideo className="w-4 h-4" />
            Select a video
          </>
        )}
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription-prompt">Transcription Prompt</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription-prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Enter keywords included in the video, separated by commas (,)."
        />
      </div>

      <Button
        type="submit"
        data-success={progressStatus === "success"}
        variant={progressStatus === "error" ? "destructive" : "default"}
        className={`w-full data-[success=true]:bg-emerald-500`}
        disabled={progressStatus !== "waiting" && progressStatus !== "error"}
      >
        {progressStatus === "waiting" ? (
          <>
            {PROGRESS.waiting}
            <Upload className="w-4 h-4 ml-2" />
          </>
        ) : (
          PROGRESS[progressStatus]
        )}
      </Button>
    </form>
  );
}
