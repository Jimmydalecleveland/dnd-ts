import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Spells from './components/Spells'

const client = new ApolloClient({
  uri: "http://localhost:4000"
})

ReactDOM.render(<ApolloProvider client={client}><Spells spellID={3} /></ApolloProvider>, document.getElementById("root"))
