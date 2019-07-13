import { gql } from 'apollo-boost'
import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

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

        return (
          <>
            {data.characters.map((character) => (
              <div key={character.ID}>
                <Link to={`/character/${character.ID}`}>{character.name}</Link>
              </div>
            ))}
            <Link to="/create-character">Create New Character</Link>
          </>
        )
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
