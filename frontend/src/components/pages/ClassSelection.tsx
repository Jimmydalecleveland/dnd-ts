import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

import { animationContainer } from '../FeatureItem'
import { useCharacter } from '../../context'
import { ICharClass } from '../../interfaces'
import ActivityButton from '../ActivityButton'
import ClassFeatures from '../ClassFeatures'
import SectionHeader from '../SectionHeader'
import ToggleButton from '../ToggleButton'


const ClassSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()
  const { loading, error, data } = useQuery<IQueryData>(CLASSES_QUERY)
  const [getClassFeatures, { data: charClassData }] = useLazyQuery<
    ICharClassQueryData
  >(CLASS_FEATURES_QUERY)

  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <h1>{character.name}</h1>
      <h2>{character.race.name}</h2>
      {character.subrace && <h3>{character.subrace.name}</h3>}
      {character.charClass && <h3>{character.charClass.name}</h3>}

      {!loading && !error && (
        <section>
          <SectionHeader>CLASS</SectionHeader>
          <ClassList>
            {data.charClasses.map((charClass) => (
              <ToggleButton
                key={charClass.ID}
                isActive={character.charClass.ID === charClass.ID}
                handleClick={() => {
                  getClassFeatures({ variables: { charClassID: charClass.ID } })
                  setCharacter({ ...character, charClass })
                }}
              >
                {charClass.name}
              </ToggleButton>
            ))}
          </ClassList>
        </section>
      )}

      <StyledBottomWrapper>
        <ToggleButton
          disabled={!character.charClass}
          isActive={showModal}
          handleClick={() => setShowModal(true)}
        >
          {`${character.charClass.name} details`}
        </ToggleButton>
        {showModal && (
          <AnimatePresence>
            <Modal
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
                    <ClassFeatures charClassID={character.charClass.ID} headline="Class Features"></ClassFeatures>
                  </div>
                )}
              </div>
            </Modal>
          </AnimatePresence>
        )}
      <ActivityButton disabled={character.charClass.ID ? false : true}
          handleClick={() => history.push('/create-character/background')}
      >Next: Background</ActivityButton>
      </StyledBottomWrapper>
    </div>
  )
}

interface IQueryData {
  charClasses: ICharClass[]
}

interface ICharClassQueryData {
  charClass: {
    features: IFeature[]
  }
}

interface IFeature {
  ID: string
  name: string
  description: string
  level: number
}

const ClassList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  width: 100%;
  margin: 0 0 20px;
`

const StyledBottomWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr minmax(100px, 1fr);
  margin-top: auto;
  grid-gap: 10px;
  justify-content: space-between;
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

const CLASSES_QUERY = gql`
  query CharClasses {
    charClasses {
      ID
      name
    }
  }
`

const CLASS_FEATURES_QUERY = gql`
  query CharClassFeatures($charClassID: ID!) {
    charClass(ID: $charClassID) {
      features {
        ID
        name
        description
        level
      }
    }
  }
`

export default ClassSelection
