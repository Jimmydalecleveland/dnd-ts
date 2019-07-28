import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider, withTheme } from 'styled-components'
import 'typeface-barlow'
import 'typeface-rokkitt'
import darkTheme from './theme'

import Character from './components/Character'
import Characters from './components/Characters'
import CreateCharacter from './components/CreateCharacter'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
})

const GlobalStyle = createGlobalStyle<{ theme: typeof darkTheme }>`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Rokkitt', serif;
    color: #fff;
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

  h3 {
    margin-bottom: 6px;
    text-transform: capitalize;
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.outline};
  }
`

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={darkTheme}>
      <>
        <GlobalStyle />
        <BrowserRouter>
          <Route exact path="/characters/" component={Characters} />
          <Route exact path="/create-character/" component={CreateCharacter} />
          <Route path={`/character/:id`} component={Character} />
        </BrowserRouter>
      </>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
