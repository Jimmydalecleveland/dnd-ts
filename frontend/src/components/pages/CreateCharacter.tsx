import React, { createContext, useContext, useState } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import CharacterProvider from '../../context'
import BackgroundSelection from './BackgroundSelection'
import ClassSelection from './ClassSelection'
import RaceSelection from './RaceSelection'

const CreateCharacter = () => {
  return (
    <CharacterProvider>
      <Route exact path="/create-character" component={RaceSelection} />
      <Route exact path="/create-character/class" component={ClassSelection} />
      <Route exact path="/create-character/background" component={BackgroundSelection} />
    </CharacterProvider>
  )
}

export default CreateCharacter
