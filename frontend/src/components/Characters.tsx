import { gql } from 'apollo-boost'
import React from 'react'
import { Query } from 'react-apollo'

const Characters = () => {
  return (
    <Query<IData> query={CHARACTERS_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>loading...</p>
        }
        if (error) {
          return <p>Error: {error}</p>
        }

        return data.characters.map((character) => (
          <p key={character.ID}>{character.name}</p>
        ))
      }}
    </Query>
  )
}

const CHARACTERS_QUERY = gql`
  query CharactersQuery {
    characters {
      ID
      name
    }
  }
`

interface IData {
  characters: [
    {
      ID: string
      name: string
    }
  ]
}

export default Characters
