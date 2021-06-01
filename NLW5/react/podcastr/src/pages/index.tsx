import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import api from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

type episode = {
  id: string;
  title: string;
  members: string;
};

type HomeProps = {
  episodes: [episode];
};

export default function Home(props: HomeProps) {
  return <p>{JSON.stringify(props.episodes)}</p>;
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get("/episodes", {
    params: {
      _limit: 5,
      _sort: "published_at",
      _order: "desk",
    },
  });
  const { data } = response;

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", { locale: ptBR, }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    };
  });

  return {
    props: {
      episodes,
    },

    revalidate: 60 * 60 * 8, // 8h
  };
};
