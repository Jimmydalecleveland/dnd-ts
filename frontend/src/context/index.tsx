import React, { createContext, useContext, useState } from 'react'

const CharacterContext = createContext({
  character: { race: { name: '' } },
  setCharacter: (f: any) => f,
})

const CharacterProvider: React.FC = ({ children }) => {
  const [character, setCharacter] = useState({ race: { name: '' } })

  return (
    <CharacterContext.Provider value={{ character, setCharacter }}>
      {children}
    </CharacterContext.Provider>
  )
}

export default CharacterProvider

export const useCharacter = () => useContext(CharacterContext)
