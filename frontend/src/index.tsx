import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Character from './components/Character'
import Characters from './components/Characters'
import CreateCharacter from './components/CreateCharacter'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route exact path="/characters/" component={Characters} />
      <Route exact path="/create-character/" component={CreateCharacter} />
      <Route
        path={`/character/:id`}
        render={(props) => <Character characterID={props.match.params.id} />}
      />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
