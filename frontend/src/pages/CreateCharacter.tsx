import React from 'react'
import { Route } from 'react-router-dom'
import BackgroundSelection from './BackgroundSelection'
import ClassSelection from './ClassSelection'
import RaceSelection from './RaceSelection'
import AbilityScoreSelection from './AbilityScoreSelection'
import SkillSelection from './SkillSelection'
import SubmitCharacter from './SubmitCharacter'
import EquipmentSelection from './EquipmentSelection'

const CreateCharacter = () => {
  return (
    <>
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
        path="/create-character/equipment"
        component={EquipmentSelection}
      />
      <Route
        exact
        path="/create-character/submit"
        component={SubmitCharacter}
      />
    </>
  )
}

export default CreateCharacter
