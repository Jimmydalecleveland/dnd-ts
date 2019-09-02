import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { useCharacter } from '../context'
import ActivityButton from './ActivityButton'
import RaceTraits from './RaceTraits'
import SectionHeader from './SectionHeader'
import ToggleButton from './ToggleButton'

const container = {
  hidden: { opacity: 1, scale: 0.4 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      damping: 20,
      staggerChildren: 0.1,
      stiffness: 260,
      type: 'spring',
      when: 'beforeChildren',
    },
  },
}

const RaceSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()
  const { loading, error, data } = useQuery<IQueryData>(RACES_QUERY)

  const [showModal, setShowModal] = useState(false)

  const [getRaceTraits] = useLazyQuery(RACETRAITS_QUERY)

  const [createCharacter] = useMutation<IMutationData, IMutationVariables>(
    CREATE_CHARACTER,
    {
      onCompleted: (result) =>
        history.push(`/character/${result.createCharacter.ID}`),
      variables: {
        name: character.name,
        raceID: character.race.ID,
        subraceID: character.subrace ? character.subrace.ID : null,
      },
    }
  )

  const detailButtonText = () => {
    if (!character.race.ID) {
      return 'Select a race'
    }
    if (character.subrace) {
      return `${character.subrace.name} details`
    }
    if (character.race) {
      return `${character.race.name} details`
    }
  }

  const isNextButtonDisabled = () => {
    if (character.race) {
      if (character.race.subraces.length > 0) {
        if (character.subrace) {
          return false
        }
      } else {
        return false
      }
    }

    return true
  }

  const setChosenRace = (value: string, races: IQueryData['races']): void => {
    const raceObj = races.filter((race) => race.ID === value)[0]
    setCharacter({ ...character, race: raceObj, subrace: null })
  }

  const setChosenSubrace = (value: string) => {
    const subraceObj = character.race.subraces.filter(
      (subrace) => subrace.ID === value
    )[0]
    setCharacter({ ...character, subrace: subraceObj })
  }

  return (
    <StyledGridSection>
      <StyledInput htmlFor="name">
        <input
          id="name"
          type="text"
          value={character.name}
          placeholder="Enter Thy Name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCharacter({ ...character, name: event.target.value })
          }
        />
      </StyledInput>
      {loading && <p>...loading</p>}
      {error && <p>error: {error}</p>}
      {!loading && !error && (
        <section>
          <SectionHeader>RACE</SectionHeader>
          <RaceList>
            {data.races.map((race: IRace) => (
              <ToggleButton
                key={race.ID}
                isActive={character.race.ID === race.ID}
                handleClick={() => {
                  getRaceTraits({ variables: { raceID: race.ID } })
                  setChosenRace(race.ID, data.races)
                }}
              >
                {race.name}
              </ToggleButton>
            ))}
          </RaceList>

          {character.race.subraces.length > 0 && (
            <section>
              <SectionHeader>SUBRACE</SectionHeader>
              <RaceList>
                {character.race.subraces.map((subrace: IRace) => (
                  <ToggleButton
                    key={subrace.ID}
                    isActive={
                      character.subrace && character.subrace.ID === subrace.ID
                    }
                    handleClick={() => {
                      getRaceTraits({ variables: { raceID: subrace.ID } })
                      setChosenSubrace(subrace.ID)
                    }}
                  >
                    {subrace.name}
                  </ToggleButton>
                ))}
              </RaceList>
            </section>
          )}
        </section>
      )}

      <StyledBottomWrapper>
        <ToggleButton
          disabled={!character.race}
          isActive={showModal}
          handleClick={() => setShowModal(true)}
        >
          {detailButtonText()}
        </ToggleButton>
        {showModal && (
          <AnimatePresence>
            <Modal
              variants={container}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <span
                className="close-button"
                onClick={() => setShowModal(false)}
              >
                X
              </span>
              <div>
                {character.race && (
                  <div>
                    <RaceTraits
                      raceID={character.race.ID}
                      headline={character.race.name}
                    />
                  </div>
                )}
                {character.subrace && (
                  <div>
                    <RaceTraits
                      raceID={character.subrace.ID}
                      headline={character.subrace.name}
                    />
                  </div>
                )}
              </div>
            </Modal>
          </AnimatePresence>
        )}
        <ActivityButton
          disabled={isNextButtonDisabled()}
          handleClick={createCharacter}
        >
          Next
        </ActivityButton>
      </StyledBottomWrapper>
    </StyledGridSection>
  )
}

interface IRace {
  ID: string
  name: string
}

interface IQueryData {
  races: IRace[]
}

interface IMutationData {
  createCharacter: {
    ID: string
  }
}

interface IMutationVariables {
  name: string
  raceID: string
  subraceID: string
}

const StyledGridSection = styled.section`
  display: grid;
  grid-template-rows: 70px 1fr 1fr;
  height: 100%;
`

const StyledBottomWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 100px;
  margin-top: auto;
  grid-gap: 10px;
  justify-content: space-between;
`

const StyledInput = styled.label`
  display: block;
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
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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

const RACETRAITS_QUERY = gql`
  query RaceTraits($raceID: ID!) {
    raceTraits(raceID: $raceID) {
      ID
      name
      description
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

export default RaceSelection
