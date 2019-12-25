import React, { createContext, useContext, useState } from 'react'
import { ICharacter } from '../interfaces'

// TODO: remove dummyData for development
import dummyCharacter from './dummyData'

const defaultCharacterShape = {}

const CharacterContext = createContext<ICharacterContext>({
  character: defaultCharacterShape,
  setCharacter: (f: any) => f,
})
CharacterContext.displayName = 'CreateCharacterContext'

export const useCharacter = () =>
  useContext<ICharacterContext>(CharacterContext)

const CharacterProvider: React.FC = ({ children }) => {
  const [character, setCharacter] = useState<ICharacter>(defaultCharacterShape)
  console.log({ character })
  return (
    <CharacterContext.Provider value={{ character, setCharacter }}>
      {children}
    </CharacterContext.Provider>
  )
}

interface ICharacterContext {
  character: ICharacter
  setCharacter: React.Dispatch<React.SetStateAction<ICharacter>>
}

export default CharacterProvider
