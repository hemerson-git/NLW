import { useContext } from "react";

import Head from "next/head";
import { GetServerSideProps } from "next";

// Components
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import ChallangeBox from "../components/ChallengeBox";
import ThemeButton from "../components/ThemeButton";

import styles from "../styles/pages/Home.module.css";

// Contexts
import CountdownProvider from "../contexts/CountdownContext";
import ThemeContext from "../contexts/ThemeContext";
import { ChallengeProvider } from "../contexts/challengesContext";

// Styleds
import { Header } from "../styles/styles";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const { isDarkThemeActive } = useContext(ThemeContext);
  const dark = isDarkThemeActive ? styles.dark : "";

  return (
    <div className={`${styles.pBody} ${dark}`}>
      <ChallengeProvider
        level={props.level}
        currentExperience={props.currentExperience}
        challengesCompleted={props.challengesCompleted}
      >
        <div className={`${styles.container}`}>
          <Head>
            <title>Ínicio | Moveit</title>
          </Head>

          <Header>
            <ExperienceBar />
            <ThemeButton />
          </Header>

          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>

              <div>
                <ChallangeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengeProvider>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
