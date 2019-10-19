import { createGlobalStyle } from 'styled-components'
import darkTheme from '../theme'
import 'typeface-barlow'
import 'typeface-cambay'

export default createGlobalStyle<{ theme: typeof darkTheme }>`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Cambay', serif;
    line-height: 1.2;
    color: #fff;
    background-color: #000;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  button {
    font-family: 'Barlow', sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-top: 0;
  }

  h2 {
    font-size: 18px;
    font-weight: 500;
  }

  h3 {
    margin-bottom: 6px;
    text-transform: capitalize;
    font-size: 18px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.outline};
  }
`
