import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { AnimatePresence } from 'framer-motion'

import { useCharacter } from '../context'
import { Backgrounds, BackgroundFeaturesPrefetch } from '../graphql-types'
import { animationContainer } from '../components/FeatureItem'
import * as Styled from './BackgroundSelection.styles'
import SectionHeader from '../components/SectionHeader'
import ToggleButton from '../components/ToggleButton'
import ActivityButton from '../components/ActivityButton'
import BackgroundFeatures from '../components/BackgroundFeatures'
import CharacterTitles from '../components/CharacterTitles'

const BackgroundSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()
  const { loading, error, data } = useQuery<Backgrounds>(BACKGROUNDS_QUERY)
  const [getBackgroundFeatures] = useLazyQuery<BackgroundFeaturesPrefetch>(
    BACKGROUND_FEATURES_QUERY
  )

  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <CharacterTitles />

      {!loading && !error && (
        <section>
          <SectionHeader>BACKGROUND</SectionHeader>
          <Styled.BackgroundList>
            {data.backgrounds.map((background) => (
              <ToggleButton
                key={background.ID}
                isActive={
                  character.background &&
                  character.background.ID === background.ID
                }
                handleClick={() => {
                  getBackgroundFeatures({
                    variables: { backgroundID: background.ID },
                  })
                  setCharacter({ ...character, background })
                }}
              >
                {background.name}
              </ToggleButton>
            ))}
          </Styled.BackgroundList>
        </section>
      )}

      <Styled.BottomWrapper>
        <ToggleButton
          disabled={character.background ? !character.background.ID : true}
          isActive={showModal}
          handleClick={() => setShowModal(true)}
        >
          {character.background
            ? `${character.background.name} details`
            : 'Select a background'}
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
                {character.background && (
                  <div>
                    <BackgroundFeatures
                      backgroundID={character.background.ID}
                      headline={`${character.background.name} Features`}
                    ></BackgroundFeatures>
                  </div>
                )}
              </div>
            </Styled.Modal>
          </AnimatePresence>
        )}
        <ActivityButton
          disabled={
            character.background && character.background.ID ? false : true
          }
          handleClick={() => history.push('/create-character/ability-scores')}
        >
          Next: Ability Scores
        </ActivityButton>
      </Styled.BottomWrapper>
    </div>
  )
}

const BACKGROUNDS_QUERY = gql`
  query Backgrounds {
    backgrounds {
      ID
      name
      startingGp
    }
  }
`

const BACKGROUND_FEATURES_QUERY = gql`
  query BackgroundFeaturesPrefetch($backgroundID: ID!) {
    background(ID: $backgroundID) {
      features {
        ID
        name
        description
      }
    }
  }
`

export default BackgroundSelection
