import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import 'typeface-barlow'
import 'typeface-rokkitt'
import darkTheme from './theme'

import Character from './components/Character'
import Characters from './components/Characters'
import CreateCharacter from './components/CreateCharacter'
import GlobalStyle from './components/GlobalStyle'
import Main from './components/Main'
import MobileNav from './components/MobileNav'
import Spell from './components/Spell'
import TestRoute from './components/TestRoute'

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
            <Route path="/test" component={TestRoute} />
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
