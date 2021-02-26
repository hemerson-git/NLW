import { ChallengeProvider } from '../contexts/challengesContext';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {  
  return (
    <ChallengeProvider>
      <Component {...pageProps} />
    </ChallengeProvider>
  )
}

export default MyApp
