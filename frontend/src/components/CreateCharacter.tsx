import React, { createContext, useContext, useState } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import CharacterProvider from '../context'
import RaceSelection from './RaceSelection'

const CreateCharacter = () => {
  return (
    <CharacterProvider>
      <Route exact path="/create-character" component={RaceSelection} />
    </CharacterProvider>
  )
}

export default CreateCharacter
