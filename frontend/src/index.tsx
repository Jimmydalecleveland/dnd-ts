import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Character from './components/Character'
import Characters from './components/Characters'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route exact path="/characters/" component={Characters} />
      <Route
        path={`/character/:id`}
        render={(props) => <Character characterID={props.match.params.id} />}
      />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
