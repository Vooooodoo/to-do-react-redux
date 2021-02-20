import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: #2A2C2F;
    padding: 30px;
    min-width: 320px;
    font-family: 'Roboto', Arial, sans-serif;
    color: #FFFFFF;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
  }

  main, footer {
    max-width: 550px;
    margin: 0 auto;
  }

  button {
    background-color: #af1045;
    padding: 0;
    cursor: pointer;
    color: white;
    border: none;
  }

  button:hover {
    background-color: #97113d;
  }

  .transition {
    transition: .3s linear;
  }
`
export default GlobalStyle;
