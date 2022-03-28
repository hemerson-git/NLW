import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
    --white: #ffffff;
    --background: #f2f3f5;
    --gray-line: #DCDDE0;
    --text: #666667;
    --text-highlight: #B3B9FF;
    --title: #2E384D;
    --red: #E83F5B;
    --green: #4CD62B;
    --blue: #5953B8;
    --blue-dark: #4953b8;
    --blue-twitter: #2AA9E0;

    --background-dark: #191622;
    --background-semidark: #44475a;
    --purple: #988BC7;
    --foreground: #E1E1E6;
    --pink: #FF79C6;
  }
  
  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 93.75%;
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    background-color: var(--background);
    color: var(--text);
  }

  body.dark {
    background-color: var(--background-dark);
  }

  body,
  input,
  textarea,
  button {
    font: 400 16px "Inter", sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .container {
    height: 100%;
    max-width: 992px;
    margin: auto;
    padding: 2.5rem 2rem;

    display: flex;
    flex-direction: column;
  }
`;

export const Header = styled.header`
  display: flex;
  margin-bottom: 32px;
  gap: 16px;
`;
