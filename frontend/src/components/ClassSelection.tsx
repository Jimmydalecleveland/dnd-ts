import React from 'react'
import { useCharacter } from '../context'

const ClassSelection = () => {
  const { character, setCharacter } = useCharacter()
  return (
    <div>
      <h1>{character.name}</h1>
      <h2>{character.race.name}</h2>
      {character.subrace && <h3>{character.subrace.name}</h3>}
    </div>
  )
}

export default ClassSelection
