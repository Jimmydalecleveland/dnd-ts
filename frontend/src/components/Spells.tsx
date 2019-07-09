import React from 'react'
import { Query } from 'react-apollo'
import { gql, ApolloError } from 'apollo-boost'


const Spells = ({ spellID }: Props) => {
  return (
    <Query<Data, Variables> query={SPELL_QUERY} variables={{ ID: spellID }}>
      {({ loading, error, data }) => {
        if (loading) return <p>loading...</p>
        if (error) return <p>Error: {error}</p>

        return <h1>{data.spell.name}</h1>
      }}
    </Query>
  )
}

interface Props {
  spellID: number;
}

const SPELL_QUERY = gql`
  query SpellQuery($ID: ID!) {
    spell(ID: $ID) {
      ID
      name 
    }
  }
`

interface Data {
  spell: {
    ID: string
    name: string
  }
}

interface Variables {
  ID: number
}

export default Spells