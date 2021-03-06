import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import { Link } from 'react-router-dom'
import { ICharacter } from '../interfaces'

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
  characters: [ICharacter]
}

export default Characters
