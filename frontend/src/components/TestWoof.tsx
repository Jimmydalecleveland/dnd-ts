import React from 'react'
import { useCharacter } from '../context'

const TestWoof = () => {
  const { character } = useCharacter()
  return <h1>Woof: {character.race.name}</h1>
}

export default TestWoof
