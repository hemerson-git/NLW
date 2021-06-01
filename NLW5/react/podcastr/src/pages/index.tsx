import api from "../services/api";

export default function Home() {
  return (
    <h1>index</h1>
  );
};

export async function getStaticProps() {
  const response = await api.get('/episodes');
  const { data } = await response;
  console.log(data);
  
  return {
    props: {
      episodes: data,
    },

    revalidate: 60 * 60 * 8, // 8h
  }
}
