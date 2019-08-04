import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider, withTheme } from 'styled-components'
import 'typeface-barlow'
import 'typeface-rokkitt'
import darkTheme from './theme'

import Character from './components/Character'
import Characters from './components/Characters'
import CreateCharacter from './components/CreateCharacter'
import GlobalStyle from './components/GlobalStyle'
import Main from './components/Main'
import MobileNav from './components/MobileNav'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={darkTheme}>
      <>
        <GlobalStyle />
        <BrowserRouter>
          <Main>
            <Route exact path="/characters/" component={Characters} />
            <Route
              exact
              path="/create-character/"
              component={CreateCharacter}
            />
            <Route path={`/character/:id`} component={Character} />
          </Main>
          <MobileNav />
        </BrowserRouter>
      </>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
