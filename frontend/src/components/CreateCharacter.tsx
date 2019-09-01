import React, { createContext, useContext, useState } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import RaceSelection from './RaceSelection'
export const Character = createContext(null)

const CreateCharacter = ({ history }: RouteComponentProps) => {
  const [playerCharacter, setPlayerCharacter] = useState({})

  return (
    <Character.Provider value={setPlayerCharacter}>
      <Route exact path="/create-character" component={RaceSelection} />
    </Character.Provider>
  )
}

export default CreateCharacter
