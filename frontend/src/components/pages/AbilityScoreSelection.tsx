import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'

import { useCharacter } from '../../context'
import AbilityScoreRange from '../AbilityScoreRange'
import CharacterTitles from '../CharacterTitles'
import ActivityButton from '../ActivityButton'

const AbilityScoreSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()

  const updateAbilityScore = (ability: string, score: number) => {
    if (score > 20 || score < 0) {
      return
    }

    setCharacter({
      ...character,
      abilityScores: { ...character.abilityScores, [ability]: score },
    })
  }

  return (
    <div>
      <CharacterTitles />

      <AbilityScoresWrapper>
        {Object.entries(character.abilityScores).map((ability) => (
          <AbilityScoreRange
            ability={ability[0]}
            score={ability[1]}
            updateAbilityScore={updateAbilityScore}
          />
        ))}
      </AbilityScoresWrapper>
      <ActivityButton
        handleClick={() => history.push('/create-character/submit')}
      >
        NEXT: CLASS
      </ActivityButton>
    </div>
  )
}

const AbilityScoresWrapper = styled.section`
  max-width: 450px;
  margin: 0 auto;
`

export default AbilityScoreSelection
