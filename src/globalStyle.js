import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: Helvetica, Arial, sans-serif;
}

body {
  margin: 0px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgb(23, 33, 94);
  background: radial-gradient(
    circle at top right,
    rgba(23, 33, 94, 0.9) 0,
    #f2b04f 25%
  );
}
`;
 
export default GlobalStyle;