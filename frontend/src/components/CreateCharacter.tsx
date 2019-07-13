import { gql } from 'apollo-boost'
import React, { useState } from 'react'
import { Mutation } from 'react-apollo'

const CreateCharacter = () => {
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
      <Mutation mutation={CREATE_CHARACTER} variables={{ name }}>
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
      name
    }
  }
`

export default CreateCharacter
