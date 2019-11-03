import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import ActivityButton from '../ActivityButton'
import CharacterTitles from '../CharacterTitles'

const SkillSelection: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <section>
      <CharacterTitles />
      <ActivityButton
        handleClick={() => history.push('/create-character/submit')}
      >
        NEXT: SUBMIT
      </ActivityButton>
    </section>
  )
}

export default SkillSelection
