// === FILENAME: src/styles/GlobalStyle.js ===
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --blue: #3BA3EF;
    --blue-transparent: #3BA3EFEB;
    --white: #FFFFFF;
    --black: #000000;
    --dark-blue: #1A6BB5;
    --light-blue: #7EC8F7;
    --gradient-1: linear-gradient(135deg, #3BA3EF, #1A6BB5);
    --gradient-2: linear-gradient(180deg, #000000, #0D2A45);
    --overlay: rgba(0, 0, 0, 0.55);
    --card-bg: #0D1B2A;
    --font-display: 'Outfit', sans-serif;
    --font-body: 'Inter', sans-serif;
    --fem-accent: #C084FC;
    --bocha-accent: #10B981;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #000000;
    color: #FFFFFF;
    font-family: var(--font-body);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: var(--font-body);
  }

  img {
    max-width: 100%;
    display: block;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #000;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--blue);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--dark-blue);
  }
`;

export default GlobalStyle;
