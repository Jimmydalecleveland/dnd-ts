import { gql } from 'apollo-boost'
import React, { useState } from 'react'
import { Mutation, Query } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import background from '../images/stone-steps.jpg'
import RaceTraits from './RaceTraits'
import ToggleButton from './ToggleButton'

const CreateCharacter = ({ history }: RouteComponentProps) => {
  const [name, setName] = useState('')
  const [chosenRaceObj, setChosenRaceObj] = useState(null)
  const [chosenRaceID, setChosenRaceID] = useState('')
  const [chosenSubraceID, setChosenSubraceID] = useState('')

  const setChosenRace = (value: string, races: IData['races']): void => {
    const raceObj = races.filter((race) => race.ID === value)[0]
    setChosenRaceID(value)
    setChosenRaceObj(raceObj)
    setChosenSubraceID('')
  }

  return (
    <StyledSection>
      <StyledInput htmlFor="name">
        <span>Name:</span>
        <input
          id="name"
          type="text"
          placeholder="Enter Thy Name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setName(event.target.value)
          }
        />
      </StyledInput>
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

              <RaceList>
                {data.races.map((race) => (
                  <ToggleButton
                    key={race.ID}
                    isActive={chosenRaceID === race.ID}
                    handleClick={() => setChosenRace(race.ID, data.races)}
                  >
                    {race.name}
                  </ToggleButton>
                ))}
              </RaceList>
            </>
          )
        }}
      </Query>
      {chosenRaceID && <RaceTraits raceID={chosenRaceID} />}
      {chosenSubraceID && <RaceTraits raceID={chosenSubraceID} />}
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
    </StyledSection>
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

const StyledSection = styled.section`
  height: 100vh;
  padding: 15px;
  background-color: #3c424e;
  background-image: url(${background});
  background-blend-mode: overlay;
`

const StyledInput = styled.label`
  font-size: 20px;
  font-family: 'Segoe UI', sans-serif;
  font-weight: bold;

  input {
    width: 100%;
    background: transparent;
    border: solid 3px #737477;
    border: ${({ theme }) => `solid 1px ${theme.colors.outline}`};
    padding: 10px 20px;
    font-size: 26px;
    color: #fff;
  }
`

const RaceList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  width: 100%;
  margin: 15px 0 15px;
`

export default CreateCharacter
