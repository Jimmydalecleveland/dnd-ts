import { gql } from 'apollo-boost'
import React from 'react'
import { useQuery } from 'react-apollo'
import { Link } from 'react-router-dom'

const Characters = () => {
  const { loading, data } = useQuery<IQueryData>(CHARACTERS_QUERY)
  if (loading) {
    return <p>loading...</p>
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
}

const CHARACTERS_QUERY = gql`
  query CharactersQuery {
    characters {
      ID
      name
    }
  }
`

interface IQueryData {
  characters: [
    {
      ID: string
      name: string
    }
  ]
}

export default Characters
