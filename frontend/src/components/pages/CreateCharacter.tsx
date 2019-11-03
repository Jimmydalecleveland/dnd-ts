import React from 'react'
import { Route } from 'react-router-dom'
import CharacterProvider from '../../context'
import BackgroundSelection from './BackgroundSelection'
import ClassSelection from './ClassSelection'
import RaceSelection from './RaceSelection'
import AbilityScoreSelection from './AbilityScoreSelection'
import SkillSelection from './SkillSelection'
import SubmitCharacter from './SubmitCharacter'

const CreateCharacter = () => {
  return (
    <CharacterProvider>
      <Route exact path="/create-character" component={RaceSelection} />
      <Route exact path="/create-character/class" component={ClassSelection} />
      <Route
        exact
        path="/create-character/background"
        component={BackgroundSelection}
      />
      <Route
        exact
        path="/create-character/ability-scores"
        component={AbilityScoreSelection}
      />
      <Route exact path="/create-character/skills" component={SkillSelection} />
      <Route
        exact
        path="/create-character/submit"
        component={SubmitCharacter}
      />
    </CharacterProvider>
  )
}

export default CreateCharacter
