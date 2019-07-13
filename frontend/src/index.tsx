import ApolloClient from 'apollo-boost'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ReactDOM from 'react-dom'

import Characters from './components/Characters'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Characters />
  </ApolloProvider>,
  document.getElementById('root')
)
