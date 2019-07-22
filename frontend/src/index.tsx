import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import Character from './components/Character'
import Characters from './components/Characters'
import CreateCharacter from './components/CreateCharacter'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
})

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: #fff;
  }
`

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route exact path="/characters/" component={Characters} />
      <Route exact path="/create-character/" component={CreateCharacter} />
      <Route path={`/character/:id`} component={Character} />
    </BrowserRouter>
    <GlobalStyle />
  </ApolloProvider>,
  document.getElementById('root')
)
