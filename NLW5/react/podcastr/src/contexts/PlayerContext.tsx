import { createContext, ReactNode, useContext, useState } from "react";

interface Episode {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

interface PlayerContextData {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  playPrevious: () => void;
  playNext: () => void;
  clearProgress: () => void;
}

const PlayerContext = createContext({} as PlayerContextData);

export default PlayerContext;

type PlayerContextProviderProps = {
  children: ReactNode;
};

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setPlayingState(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearProgress() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;
  const hasPrevious = currentEpisodeIndex > 0;

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );

      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
      return;
    }

    if (hasNext) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );

      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
      return;
    }

    if (hasPrevious) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffling,
        setPlayingState,
        play,
        playList,
        playPrevious,
        playNext,
        hasNext,
        hasPrevious,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        clearProgress,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
