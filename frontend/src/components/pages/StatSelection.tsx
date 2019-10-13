import React from 'react'

import { useCharacter } from '../../context'
import SectionHeader from '../SectionHeader'
import { ICharacter } from '../../interfaces'

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
        <h3>Ability Points Remaining: 7</h3>
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

const AbilityScoreRange = ({
  ability,
  score = 10,
  updateAbilityScore,
}: IProps) => {
  const createPointBlocks = () => {
    return [...Array(10)].map((slot, index) => (
      <span
        key={index}
        style={{ display: 'flex', border: 'solid 2px white', height: 12 }}
        className="filled"
      >
        <span
          style={{
            flex: 1,
            backgroundColor:
              (index + 1) * 2 - 1 <= score ? 'white' : 'transparent',
          }}
          data-attribute-block={`${ability}${index + 1}`}
        />
        <span
          style={{
            flex: 1,
            backgroundColor: (index + 1) * 2 <= score ? 'white' : 'transparent',
          }}
          data-attribute-block={`${ability}${index + 1}`}
        />
      </span>
    ))
  }

  return (
    <div>
      <h1>{ability}</h1>
      <span>Score: 10</span>
      <span>Modifier: 0</span>

      <div
        style={{
          display: 'grid',
          gridColumnGap: '3px',
          gridTemplateColumns: 'repeat(10, 1fr)',
        }}
      >
        {createPointBlocks()}
      </div>
      <button onClick={() => updateAbilityScore(ability, score - 1)}>-</button>
      <button onClick={() => updateAbilityScore(ability, score + 1)}>+</button>
    </div>
  )
}

interface IProps {
  ability: string
  score?: number
  updateAbilityScore(ability: string, score: number): void
}

export default StatSelection
