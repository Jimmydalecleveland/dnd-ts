import { gql } from 'apollo-boost'
import React, { useState } from 'react'
import { Mutation } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

const CreateCharacter = ({ history }: RouteComponentProps) => {
  const [name, setName] = useState('')

  return (
    <div>
      <label htmlFor="name">
        <span>Name:</span>
        <input
          id="name"
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
        />
      </label>
      <Mutation
        mutation={CREATE_CHARACTER}
        variables={{ name }}
        onCompleted={(result: any) =>
          history.push(`/character/${result.createCharacter.ID}`)
        }
      >
        {(createCharacter: () => void) => (
          <button onClick={() => createCharacter()}>Submit</button>
        )}
      </Mutation>
    </div>
  )
}

const CREATE_CHARACTER = gql`
  mutation CreateCharacter($name: String!) {
    createCharacter(name: $name) {
      ID
    }
  }
`

export default CreateCharacter
