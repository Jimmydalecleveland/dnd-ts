import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AnimatePresence, motion } from 'framer-motion'

import { useCharacter } from '../context'
import { CharClasses, CharClassFeaturesPrefetch } from '../graphql-types'
import { animationContainer } from '../components/FeatureItem'
import * as Styled from './ClassSelection.styles'
import ActivityButton from '../components/ActivityButton'
import ClassFeatures from '../components/ClassFeatures'
import SectionHeader from '../components/SectionHeader'
import ToggleButton from '../components/ToggleButton'
import CharacterTitles from '../components/CharacterTitles'

const ClassSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()
  const { loading, error, data } = useQuery<CharClasses>(CLASSES_QUERY)
  const [getClassFeatures] = useLazyQuery<CharClassFeaturesPrefetch>(
    CLASS_FEATURES_QUERY
  )

  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <CharacterTitles />

      {!loading && !error && (
        <section>
          <SectionHeader>CLASS</SectionHeader>
          <Styled.ClassList>
            {data.charClasses.map((charClass) => (
              <ToggleButton
                key={charClass.ID}
                isActive={
                  character.charClass && character.charClass.ID === charClass.ID
                }
                handleClick={() => {
                  getClassFeatures({ variables: { charClassID: charClass.ID } })
                  setCharacter({ ...character, charClass })
                }}
              >
                {charClass.name}
              </ToggleButton>
            ))}
          </Styled.ClassList>
        </section>
      )}

      <Styled.BottomWrapper>
        <ToggleButton
          disabled={!character.charClass}
          isActive={showModal}
          handleClick={() => setShowModal(true)}
        >
          {character.charClass
            ? `${character.charClass.name} details`
            : 'Select a Class'}
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
                {character.charClass && (
                  <div>
                    <ClassFeatures
                      charClassID={character.charClass.ID}
                      headline={`${character.charClass.name} Features`}
                    ></ClassFeatures>
                  </div>
                )}
              </div>
            </Styled.Modal>
          </AnimatePresence>
        )}
        <ActivityButton
          disabled={
            character.charClass && character.charClass.ID ? false : true
          }
          handleClick={() => history.push('/create-character/background')}
        >
          Next: Background
        </ActivityButton>
      </Styled.BottomWrapper>
    </div>
  )
}

const CLASSES_QUERY = gql`
  query CharClasses {
    charClasses {
      ID
      name
      numSkillProficiencies
    }
  }
`

const CLASS_FEATURES_QUERY = gql`
  query CharClassFeaturesPrefetch($charClassID: ID!) {
    charClass(ID: $charClassID) {
      features {
        ID
        name
        description
        classLevel
      }
    }
  }
`

export default ClassSelection
