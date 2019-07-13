import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'

import Spells from './components/Spells'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Spells spellID={3} />
  </ApolloProvider>,
  document.getElementById('root')
)
