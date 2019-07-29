import { gql } from 'apollo-boost'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Mutation, Query } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import background from '../images/stone-steps.jpg'
import RaceTraits from './RaceTraits'
import SectionHeader from './SectionHeader'
import ToggleButton from './ToggleButton'

const CreateCharacter = ({ history }: RouteComponentProps) => {
  const [name, setName] = useState('')
  const [chosenRaceID, setChosenRaceID] = useState('')
  const [chosenRaceObj, setChosenRaceObj] = useState(null)
  const [chosenSubraceID, setChosenSubraceID] = useState(null)
  const [chosenSubraceObj, setChosenSubraceObj] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const setChosenRace = (value: string, races: IData['races']): void => {
    const raceObj = races.filter((race) => race.ID === value)[0]
    setChosenRaceID(value)
    setChosenRaceObj(raceObj)
    setChosenSubraceID('')
  }

  const setChosenSubrace = (value: string) => {
    const subraceObj = chosenRaceObj.subraces.filter(
      (subrace: IRace) => subrace.ID === value
    )[0]
    setChosenSubraceID(value)
    setChosenSubraceObj(subraceObj)
  }

  return (
    <StyledSection>
      <StyledInput htmlFor="name">
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
            <section>
              <SectionHeader>RACE</SectionHeader>
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

              {chosenRaceID && chosenRaceObj.subraces.length > 0 && (
                <section>
                  <SectionHeader>SUBRACE</SectionHeader>
                  <RaceList>
                    {chosenRaceObj.subraces.map((subrace: IRace) => (
                      <ToggleButton
                        key={subrace.ID}
                        isActive={chosenSubraceID === subrace.ID}
                        handleClick={() => setChosenSubrace(subrace.ID)}
                      >
                        {subrace.name}
                      </ToggleButton>
                    ))}
                  </RaceList>
                </section>
              )}
            </section>
          )
        }}
      </Query>
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
      <button onClick={() => setShowModal(true)}>Show Info</button>
      {showModal && (
        <Modal
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <span className="close-button" onClick={() => setShowModal(false)}>
            X
          </span>
          <div>
            {chosenRaceID && (
              <div>
                <RaceTraits
                  raceID={chosenRaceID}
                  headline={chosenRaceObj.name}
                />
              </div>
            )}
            {chosenSubraceID && (
              <div>
                <RaceTraits
                  raceID={chosenSubraceID}
                  headline={chosenSubraceObj.name}
                />
              </div>
            )}
          </div>
        </Modal>
      )}
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
  position: relative;
  z-index: 1;
  height: 100vh;
  padding: 15px;
  background-color: #3c424e;
  background-image: url(${background});
  background-blend-mode: overlay;
`

const StyledInput = styled.label`
  display: block;
  margin-bottom: 20px;
  font-size: 20px;
  font-family: 'Segoe UI', sans-serif;
  font-weight: bold;

  input {
    width: 100%;
    background: transparent;
    border: solid 3px #737477;
    border: ${({ theme }) => `solid 1px ${theme.colors.outline}`};
    padding: 10px 20px;
    font-size: 22px;
    color: #fff;

    &:focus {
      border: solid 1px ${({ theme }) => theme.colors.primaryTransparent};
    }
  }
`

const RaceList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  width: 100%;
  margin: 0 0 20px;
`

const Modal = styled(motion.section)`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.9);

  > .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    font-family: 'Barlow', sans-serif;
    font-weight: 900;
    font-size: 20px;
  }

  > div {
    padding: 20px;
    height: 100%;
    overflow-y: scroll;
    border: solid 1px ${({ theme }) => theme.colors.outline};
    background-image: linear-gradient(
      245deg,
      rgba(200, 200, 200, 0.1),
      rgb(0, 0, 0) 90%
    );
  }
`

export default CreateCharacter
