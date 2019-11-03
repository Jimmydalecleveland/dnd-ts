import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import ActivityButton from '../ActivityButton'
import CharacterTitles from '../CharacterTitles'
import SectionHeader from '../SectionHeader'

const SkillSelection: React.FC<RouteComponentProps> = ({ history }) => {
  const { data, loading, error } = useQuery(SKILLS_QUERY)
  return (
    <section>
      <CharacterTitles />
      {!loading && !error && (
        <section>
          <SectionHeader>Skills</SectionHeader>
          {data.skills.map((skill: any) => (
            <div key={skill.ID}>
              <h1>{skill.ID}</h1>
              <h2>{skill.name}</h2>
            </div>
          ))}
        </section>
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
