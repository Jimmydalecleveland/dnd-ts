import { gql } from 'apollo-boost'
import React, { useState } from 'react'
import { Mutation, Query } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import RaceTraits from './RaceTraits'

const CreateCharacter = ({ history }: RouteComponentProps) => {
  const [name, setName] = useState('')
  const [chosenRaceObj, setChosenRaceObj] = useState(null)
  const [chosenRaceID, setChosenRaceID] = useState('')
  const [chosenSubraceID, setChosenSubraceID] = useState('')

  const setChosenRace = (value: string, races: IData['races']): void => {
    const raceObj = races.filter((race) => race.ID === value)[0]
    setChosenRaceID(value)
    setChosenRaceObj(raceObj)
  }

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
            <>
              <label htmlFor="race">
                <span>Race:</span>
                <select
                  name="race"
                  id="race"
                  value={chosenRaceID}
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    setChosenRace(event.target.value, data.races)
                  }
                >
                  <option value="" disabled>
                    Select a race...
                  </option>
                  {data.races.map((race) => (
                    <option key={race.ID} value={race.ID}>
                      {race.name}
                    </option>
                  ))}
                </select>
              </label>

              {chosenRaceID && chosenRaceObj.subraces.length > 0 && (
                <label htmlFor="subrace">
                  <span>Subrace:</span>
                  <select
                    name="subrace"
                    id="subrace"
                    value={chosenSubraceID}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setChosenSubraceID(event.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select a race...
                    </option>
                    {chosenRaceObj.subraces.map((subrace: IRace) => (
                      <option key={subrace.ID} value={subrace.ID}>
                        {subrace.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </>
          )
        }}
      </Query>
      <RaceTraits raceID={chosenRaceID} />
      <Mutation
        mutation={CREATE_CHARACTER}
        variables={{ name, raceID: chosenRaceID, subraceID: chosenSubraceID }}
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
      subraces {
        ID
        name
      }
    }
  }
`

const CREATE_CHARACTER = gql`
  mutation CreateCharacter($name: String!, $raceID: ID!, $subraceID: ID!) {
    createCharacter(name: $name, raceID: $raceID, subraceID: $subraceID) {
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
