import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AnimatePresence } from 'framer-motion'

import { animationContainer } from '../components/FeatureItem'
import { useCharacter } from '../context'
import { Races } from '../graphql-types'
import * as Styled from './RaceSelection.styles'
import ActivityButton from '../components/ActivityButton'
import RaceTraits from '../components/RaceTraits'
import SectionHeader from '../components/SectionHeader'
import ToggleButton from '../components/ToggleButton'

const RaceSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()
  const { data, loading, error } = useQuery<Races>(RACES_QUERY)

  const [showModal, setShowModal] = useState(false)

  const [getRaceTraits] = useLazyQuery(RACETRAITS_QUERY)

  const detailButtonText = () => {
    if (character.subrace) {
      return `${character.subrace.name} details`
    }
    if (character.race) {
      return `${character.race.name} details`
    }

    return 'Select a race'
  }

  const isNextButtonDisabled = () => {
    if (character.name && character.race.ID) {
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

  const setChosenRace = (value: string, races: Races['races']): void => {
    const raceObj = races.filter((race) => race.ID === value)[0]
    setCharacter({ ...character, race: raceObj, subrace: null })
  }

  const setChosenSubrace = (value: string) => {
    const subraceObj = character.race.subraces.filter(
      (subrace) => subrace.ID === value
    )[0]
    setCharacter({ ...character, subrace: subraceObj })
  }

  if (loading) {
    return <h1>Loading . . .</h1>
  }
  console.log(data)

  return (
    <Styled.GridSection>
      <Styled.Input htmlFor="name">
        <input
          id="name"
          type="text"
          value={character.name}
          placeholder="Enter Thy Name"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setCharacter({ ...character, name: event.target.value })
          }
        />
      </Styled.Input>
      {loading && <p>...loading</p>}
      {error && <p>error: {error}</p>}
      {!loading && !error && (
        <section>
          <SectionHeader>RACE</SectionHeader>
          <Styled.RaceList>
            {data.races.map((race) => (
              <ToggleButton
                key={race.ID}
                isActive={character.race && character.race.ID === race.ID}
                handleClick={() => {
                  getRaceTraits({ variables: { raceID: race.ID } })
                  setChosenRace(race.ID, data.races)
                }}
              >
                {race.name}
              </ToggleButton>
            ))}
          </Styled.RaceList>

          {character.race &&
            character.race.subraces &&
            character.race.subraces.length > 0 && (
              <section>
                <SectionHeader>SUBRACE</SectionHeader>
                <Styled.RaceList>
                  {character.race.subraces.map((subrace) => (
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
                </Styled.RaceList>
              </section>
            )}
        </section>
      )}

      <Styled.BottomWrapper>
        <ToggleButton
          disabled={!character.race}
          isActive={showModal}
          handleClick={() => setShowModal(true)}
        >
          {detailButtonText()}
        </ToggleButton>
        {showModal && (
          <AnimatePresence>
            <Styled.Modal
              variants={animationContainer}
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
            </Styled.Modal>
          </AnimatePresence>
        )}
        <ActivityButton
          disabled={isNextButtonDisabled()}
          handleClick={() => history.push('/create-character/class')}
        >
          NEXT: CLASS
        </ActivityButton>
      </Styled.BottomWrapper>
    </Styled.GridSection>
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

const RACETRAITS_QUERY = gql`
  query RaceTraitsPrefetch($raceID: ID!) {
    raceTraits(raceID: $raceID) {
      ID
      name
      description
    }
  }
`

export default RaceSelection
