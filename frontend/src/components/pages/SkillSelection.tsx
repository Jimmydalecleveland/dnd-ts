import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import {
  Skills,
  Skills_skills,
  Skills_background_skills,
  Skills_race_skills,
} from '../../graphql-types'
import ActivityButton from '../ActivityButton'
import CharacterTitles from '../CharacterTitles'
import ProficiencyList from '../ProficiencyList'
import { useCharacter } from '../../context'
import { IAbilityScores } from '../../interfaces'

const generateSkillSet = (
  skills: Skills_skills[],
  backgroundSkills: Skills_background_skills[],
  raceSkills: Skills_race_skills[],
  characterAbilityScores: IAbilityScores
) => {
  const backgroundSkillIDs = backgroundSkills.map((skill) => skill.ID)
  const raceSkillIDs = raceSkills.map((skill) => skill.ID)
  const allSkillIDs = [...backgroundSkillIDs, ...raceSkillIDs]

  return skills.map((skill) => {
    const value = Math.floor((characterAbilityScores[skill.ability] - 10) / 2)
    const proficient = allSkillIDs.includes(skill.ID)
    return { ID: skill.ID, name: skill.name, proficient, value }
  })
}

const SkillSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()
  const { data } = useQuery<Skills>(SKILLS_QUERY, {
    variables: {
      raceID: character.race.ID,
      backgroundID: character.background.ID,
    },
  })

  return (
    <section>
      <CharacterTitles />
      {data && (
        <ProficiencyList
          list={generateSkillSet(
            data.skills,
            data.background.skills,
            data.race.skills,
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
  query Skills($raceID: ID!, $backgroundID: ID!) {
    skills {
      ID
      name
      ability
    }
    race(ID: $raceID) {
      skills {
        ID
      }
    }
    background(ID: $backgroundID) {
      skills {
        ID
      }
    }
  }
`

export default SkillSelection
