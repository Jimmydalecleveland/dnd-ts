import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import darkTheme from './theme'

import Character from './components/Character'
import Characters from './components/Characters'
import GlobalStyle from './GlobalStyle'
import Main from './components/Main'
import MobileNav from './components/MobileNav'
import CreateCharacter from './pages/CreateCharacter'
import Spell from './components/Spell'

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
            <Route exact path="/characters" component={Characters} />
            <Route path="/create-character" component={CreateCharacter} />
            <Route exact path="/character/:id" component={Character} />
            <Route exact path="/spell/:id" component={Spell} />
          </Main>
          <MobileNav />
        </BrowserRouter>
      </>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
