import { gql } from 'apollo-boost'
import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router-dom'

const Character = ({ characterID, history }: IProps) => {
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

        return (
          <div>
            <h1>{data.character.name}</h1>
            <Mutation
              mutation={DELETE_CHARACTER}
              variables={{ ID: data.character.ID }}
              onCompleted={() => history.push('/characters/')}
            >
              {(deleteCharacter: () => void) => (
                <button onClick={() => deleteCharacter()}>Delete</button>
              )}
            </Mutation>
          </div>
        )
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

const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($ID: ID!) {
    deleteCharacter(ID: $ID)
  }
`

interface IProps extends RouteComponentProps {
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
