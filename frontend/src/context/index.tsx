import React, { createContext, useContext, useState } from 'react'

const defaultCharacterShape = {
  name: '',
  race: { ID: '', name: '', subrace: '' },
}

const CharacterContext = createContext({
  character: defaultCharacterShape,
  setCharacter: (f: any) => f,
})

export const useCharacter = () => useContext(CharacterContext)

const CharacterProvider: React.FC = ({ children }) => {
  const [character, setCharacter] = useState<ICharacter>(defaultCharacterShape)

  return (
    <CharacterContext.Provider value={{ character, setCharacter }}>
      {children}
    </CharacterContext.Provider>
  )
}

interface ICharacter {
  name: string
  race: {
    ID: string
    name: string
    subrace: string
  }
}

interface ICharacterContext {
  character: ICharacter
  setCharacter: ({  }: ICharacter) => void
}

export default CharacterProvider
