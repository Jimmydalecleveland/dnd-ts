import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import { Skills, Skills_skills } from '../../graphql-types'
import ActivityButton from '../ActivityButton'
import CharacterTitles from '../CharacterTitles'
import ProficiencyList from '../ProficiencyList'
import { useCharacter } from '../../context'
import { IAbilityScores } from '../../interfaces'

const generateSkillSet = (
  skills: Skills_skills[],
  characterAbilityScores: IAbilityScores
) =>
  skills.map((skill) => {
    const value = Math.floor((characterAbilityScores[skill.ability] - 10) / 2)
    return { ID: skill.ID, name: skill.name, proficient: true, value }
  })

const SkillSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()
  const { data, loading, error } = useQuery<Skills>(SKILLS_QUERY)

  return (
    <section>
      <CharacterTitles />
      {!loading && !error && (
        <ProficiencyList
          list={generateSkillSet(data.skills, character.abilityScores)}
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
  query Skills {
    skills {
      ID
      name
      ability
    }
  }
`

export default SkillSelection
