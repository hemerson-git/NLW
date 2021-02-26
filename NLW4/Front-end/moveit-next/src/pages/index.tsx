import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";

import Head from 'next/head';

import styles from '../styles/pages/Home.module.css';
import ChallangeBox from "../components/ChallengeBox";
import ThemeButton from "../components/ThemeButton";
import { useContext } from "react";
import ChallengesContext from "../contexts/challengesContext";
import CountdownProvider from "../contexts/CountdownContext";

export default function Home() {
  const { isDarkModActive } = useContext(ChallengesContext);
  const dark = isDarkModActive ? styles.dark : '';
  
  return (
    <div className={`${styles.pBody} ${dark}`}> 
      <div className={`${styles.container} ${dark}`}>
        <Head>
          <title>Ínicio | Moveit</title>
        </Head>

        <ExperienceBar />

        <ThemeButton />

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
    </div>
  )
}
