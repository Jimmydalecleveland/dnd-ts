import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

import { animationContainer } from '../FeatureItem'
import { useCharacter } from '../../context'
import { IBackground, IBackgroundFeature } from '../../interfaces'
import SectionHeader from '../SectionHeader'
import ToggleButton from '../ToggleButton'
import ActivityButton from '../ActivityButton'
import BackgroundFeatures from '../BackgroundFeatures'

const BackgroundSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()
  const { loading, error, data } = useQuery<IBackgroundsData>(BACKGROUNDS_QUERY)
  const [getBackgroundFeatures] = useLazyQuery<IBackgroundData>(
    BACKGROUND_FEATURES_QUERY
  )

  const [showModal, setShowModal] = useState(false)

  return (
    <div>
      <h1>{character.name}</h1>
      <h2>{character.race.name}</h2>
      {character.subrace && <h3>{character.subrace.name}</h3>}
      {character.charClass && <h3>{character.charClass.name}</h3>}

      {!loading && !error && (
        <section>
          <SectionHeader>BACKGROUND</SectionHeader>
          <BackgroundList>
            {data.backgrounds.map((background) => (
              <ToggleButton
                key={background.ID}
                isActive={character.background.ID === background.ID}
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
          </BackgroundList>
        </section>
      )}

      <StyledBottomWrapper>
        <ToggleButton
          disabled={!character.background.ID}
          isActive={showModal}
          handleClick={() => setShowModal(true)}
        >
          {`${character.background.name} details`}
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
                    <BackgroundFeatures
                      backgroundID={character.background.ID}
                      headline={`${character.background.name} Features`}
                    ></BackgroundFeatures>
                  </div>
                )}
              </div>
            </Modal>
          </AnimatePresence>
        )}
        <ActivityButton
          disabled={character.background.ID ? false : true}
          handleClick={() => history.push('/create-character/stats')}
        >
          Next: Ability Scores
        </ActivityButton>
      </StyledBottomWrapper>
    </div>
  )
}

const BackgroundList = styled.div`
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

interface IBackgroundsData {
  backgrounds: IBackground[]
}

interface IBackgroundData {
  background: {
    features: IBackgroundFeature[]
  }
}

const BACKGROUNDS_QUERY = gql`
  query Backgrounds {
    backgrounds {
      ID
      name
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
