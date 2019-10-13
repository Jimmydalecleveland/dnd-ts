import React from 'react'

import { useCharacter } from '../../context'
import SectionHeader from '../SectionHeader'

const StatSelection = () => {
  const { character, setCharacter } = useCharacter()

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
        <AbilityScoreRange attribute="strength" value={10} />
        <AbilityScoreRange attribute="dexterity" value={8} />
        <AbilityScoreRange attribute="intelligence" value={15} />
      </section>
    </div>
  )
}

const AbilityScoreRange = ({ attribute, value = 10 }: IProps) => {
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
              (index + 1) * 2 - 1 <= value ? 'white' : 'transparent',
          }}
          data-attribute-block={`${attribute}${index + 1}`}
        />
        <span
          style={{
            flex: 1,
            backgroundColor: (index + 1) * 2 <= value ? 'white' : 'transparent',
          }}
          data-attribute-block={`${attribute}${index + 1}`}
        />
      </span>
    ))
  }

  return (
    <div>
      <h1>{attribute}</h1>
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
    </div>
  )
}

interface IProps {
  attribute: string
  value?: number
}

export default StatSelection
