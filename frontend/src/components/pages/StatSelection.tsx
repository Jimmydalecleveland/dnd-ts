import React from 'react'

import { useCharacter } from '../../context'
import SectionHeader from '../SectionHeader'
import AbilityScoreRange from '../AbilityScoreRange'

const StatSelection = () => {
  const { character, setCharacter } = useCharacter()
  const updateAbilityScore = (ability: string, score: number) => {
    setCharacter({
      ...character,
      abilityScores: { ...character.abilityScores, [ability]: score },
    })
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <h2>{character.race.name}</h2>
      {character.subrace && <h3>{character.subrace.name}</h3>}
      {character.charClass && <h3>{character.charClass.name}</h3>}
      {character.background && <h3>{character.background.name}</h3>}

      <section>
        <SectionHeader>ABILITY SCORES</SectionHeader>
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
