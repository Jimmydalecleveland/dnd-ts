import React from 'react'

import { useCharacter } from '../../context'
import SectionHeader from '../SectionHeader'
import AbilityScoreRange from '../AbilityScoreRange'
import CharacterTitles from '../CharacterTitles'

const StatSelection = () => {
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

      <section>
        {Object.entries(character.abilityScores).map((ability) => (
          <AbilityScoreRange
            ability={ability[0]}
            score={ability[1]}
            updateAbilityScore={updateAbilityScore}
          />
        ))}
      </section>
    </div>
  )
}

export default StatSelection
