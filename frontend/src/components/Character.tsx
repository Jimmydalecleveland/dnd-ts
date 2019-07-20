import { gql } from 'apollo-boost'
import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

const Character = ({ match, history }: RouteComponentProps<IProps>) => {
  const { id: characterID } = match.params
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
              onCompleted={() => history.push('/characters')}
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

interface IProps {
  id: string
}

interface IData {
  character: {
    ID: string
    name: string
  }
}

interface IVariables {
  ID: string
}

export default Character
