import { gql } from 'apollo-boost'
import React, { useState } from 'react'
import { Mutation, Query } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

const CreateCharacter = ({ history }: RouteComponentProps) => {
  const [name, setName] = useState('')
  const [chosenRace, setChosenRace] = useState('')

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
      <Query<IData> query={RACES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) {
            return <p>...loading</p>
          }
          if (error) {
            return <p>error: {error}</p>
          }
          return (
            <label htmlFor="race">
              <span>Race:</span>
              <select
                name="race"
                id="race"
                value={chosenRace}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                  setChosenRace(event.target.value)
                }
              >
                <option>Select a race...</option>
                {data.races.map((race) => (
                  <option key={race.ID} value={race.ID}>
                    {race.name}
                  </option>
                ))}
              </select>
            </label>
          )
        }}
      </Query>
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

const RACES_QUERY = gql`
  query Races {
    races {
      ID
      name
    }
  }
`

const CREATE_CHARACTER = gql`
  mutation CreateCharacter($name: String!) {
    createCharacter(name: $name) {
      ID
    }
  }
`

interface IRace {
  ID: string
  name: string
}

// interface IData extends Array<IRace> {}
interface IData {
  races: IRace[]
}

export default CreateCharacter
