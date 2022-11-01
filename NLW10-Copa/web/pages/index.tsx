import { useEffect } from "react";

interface HomeProps {
  count: number;
}

export default function Home(props: HomeProps) {
  return (
    <main>
      <h1>Contagem: {props.count}</h1>
    </main>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3333/pools/count");
  const data = await response.json();

  console.log(data);

  return {
    props: {
      count: data.count,
    },
  };
};
