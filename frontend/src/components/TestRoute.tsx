import React, { createContext, useContext, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import CharacterProvider, { useCharacter } from '../context'
import TestWoof from './TestWoof'

const TestRoute = () => {
  const [race, setRace] = useState(null)
  const [subrace, setSubrace] = useState(null)

  return (
    <CharacterProvider>
      test route
      <SomeLinks />
      <Link to="/test/woof">Test Woof</Link>
      <Link to="/test/some">Some link</Link>
      <Route exact path="/test/woof" component={TestWoof}></Route>
      <Route exact path="/test/some" component={SomeComponent}></Route>
    </CharacterProvider>
  )
}

const SomeLinks = () => {
  const { character, setCharacter } = useCharacter()

  return (
    <>
      <button
        type="button"
        onClick={() => setCharacter({ name: 'Woofy', race: { name: 'dwarf' } })}
      >
        Set Race to Dwarf
      </button>
      <button
        type="button"
        onClick={() =>
          setCharacter({
            ...character,
            race: { name: 'dwarf', subrace: 'hill dwarf' },
          })
        }
      >
        Set Sub Race to Hill Dwarf
      </button>
      <button
        type="button"
        onClick={() =>
          setCharacter({
            ...character,
            race: { ...character.race, name: 'elf' },
          })
        }
      >
        Set Race to Elf
      </button>
    </>
  )
}

const SomeComponent = () => {
  const { character } = useCharacter()
  return (
    <>
      <h1>Some Component: {character.name}</h1>
      <h2>
        {character.race.name} -- {character.race.subrace}
      </h2>
    </>
  )
}

export default TestRoute