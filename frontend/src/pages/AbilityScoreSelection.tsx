import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'

import { useCharacter } from '../context'
import AbilityScoreRange from '../components/AbilityScoreRange'
import CharacterTitles from '../components/CharacterTitles'
import ActivityButton from '../components/ActivityButton'

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
    <section>
      <CharacterTitles />

      <AbilityScoresWrapper>
        {Object.entries(character.abilityScores).map((ability) => (
          <AbilityScoreRange
            key={ability[0]}
            ability={ability[0]}
            score={ability[1]}
            updateAbilityScore={updateAbilityScore}
          />
        ))}
      </AbilityScoresWrapper>
      <ActivityButton
        handleClick={() => history.push('/create-character/skills')}
      >
        NEXT: SKILLS
      </ActivityButton>
    </section>
  )
}

const AbilityScoresWrapper = styled.section`
  max-width: 450px;
  margin: 0 auto;
`

export default AbilityScoreSelection
