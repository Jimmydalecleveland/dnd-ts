import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import {
  Skills,
  Skills_skills,
  Skills_background_skills,
} from '../../graphql-types'
import ActivityButton from '../ActivityButton'
import CharacterTitles from '../CharacterTitles'
import ProficiencyList from '../ProficiencyList'
import { useCharacter } from '../../context'
import { IAbilityScores } from '../../interfaces'

const generateSkillSet = (
  skills: Skills_skills[],
  backgroundSkills: Skills_background_skills[],
  characterAbilityScores: IAbilityScores
) => {
  const backgroundSkillIDs = backgroundSkills.map((skill) => skill.ID)

  return skills.map((skill) => {
    const value = Math.floor((characterAbilityScores[skill.ability] - 10) / 2)
    const proficient = backgroundSkillIDs.includes(skill.ID)
    return { ID: skill.ID, name: skill.name, proficient, value }
  })
}

const SkillSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()
  const { data } = useQuery<Skills>(SKILLS_QUERY, {
    variables: { backgroundID: character.background.ID },
  })

  return (
    <section>
      <CharacterTitles />
      {data && (
        <ProficiencyList
          list={generateSkillSet(
            data.skills,
            data.background.skills,
            character.abilityScores
          )}
        />
      )}
      <ActivityButton
        handleClick={() => history.push('/create-character/submit')}
      >
        NEXT: SUBMIT
      </ActivityButton>
    </section>
  )
}

const SKILLS_QUERY = gql`
  query Skills($backgroundID: ID!) {
    skills {
      ID
      name
      ability
    }
    background(ID: $backgroundID) {
      skills {
        ID
      }
    }
  }
`

export default SkillSelection
