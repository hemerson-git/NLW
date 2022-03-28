import { ToggleThemeProvider } from "../contexts/ThemeContext";
import { GlobalStyle } from "../styles/styles";

function MyApp({ Component, pageProps }) {
  return (
    <ToggleThemeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ToggleThemeProvider>
  );
}

export default MyApp;
