import { gql } from 'apollo-boost'
import React from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

const Character = ({ characterID }: IProps) => {
  return (
    <Query<IData, IVariables>
      query={CHARACTER_QUERY}
      variables={{ ID: characterID }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <p>loading...</p>
        }
        if (error) {
          return <p>Error: {error}</p>
        }

        return <h1>{data.character.name}</h1>
      }}
    </Query>
  )
}

const CHARACTER_QUERY = gql`
  query CharacterQuery($ID: ID!) {
    character(ID: $ID) {
      ID
      name
    }
  }
`

interface IProps {
  characterID: number
}

interface IData {
  character: {
    ID: string
    name: string
  }
}

interface IVariables {
  ID: number
}

export default Character
