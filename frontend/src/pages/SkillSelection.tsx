import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

import { Skills } from './gql-types/Skills'
import logger from '../logger'
import { useCharacter } from '../context'
import { IAbilityScores } from '../interfaces'
import * as Styled from './SkillSelection.styles'
import ActivityButton from '../components/ActivityButton'
import CharacterTitles from '../components/CharacterTitles'
import ProficiencyList from '../components/ProficiencyList'
import MultiToggle from '../components/MultiToggle'
import TitledList from '../components/TitledList'

const SkillSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()
  if (!character.charClass || !character.race) {
    return <h1>You should not be here!</h1>
  }

  const { data, error } = useQuery<Skills>(SKILLS_QUERY, {
    variables: {
      charClassID: character.charClass.ID,
      raceID: character.race.ID,
      backgroundID: character.background.ID,
    },
  })

  if (error) {
    logger(
      'Skills Query returned an error.',
      {
        charClassID: character.charClass.ID,
        raceID: character.race.ID,
        backgroundID: character.background.ID,
      },
      error
    )
    return null
  }

  const toggleSkill = (skillID: string) => {
    const skills = [...character.skills]

    // Remove skill if it already exists in skills array
    if (skills.includes(skillID)) {
      skills.splice(skills.indexOf(skillID), 1)
      setCharacter({ ...character, skills: [...skills] })
      return
    }

    // Do nothing if skill limit is reached, otherwise
    if (skills.length >= character.charClass.numSkillProficiencies) {
      return
    } else {
      skills.push(skillID)
      setCharacter({ ...character, skills: [...skills] })
    }
  }

  const items = () => {
    const result = data.charClass.skills.map(({ ID, name }) => {
      const disabled =
        data.race.skills.map((raceSkill) => raceSkill.ID).includes(ID) ||
        data.background.skills
          .map((backgroundSkill) => backgroundSkill.ID)
          .includes(ID)
      const isActive = character.skills && character.skills.includes(ID)
      return { ID, name, disabled, isActive }
    })
    return result
  }

  return (
    <section>
      <CharacterTitles />
      {data && data.race && data.skills && data.background && (
        <Styled.Grid>
          <section>
            <MultiToggle
              items={items()}
              remaining={
                character.charClass.numSkillProficiencies -
                character.skills.length
              }
              onChange={toggleSkill}
            />
            {data.race.skills.length > 0 && (
              <TitledList title={character.race.name} list={data.race.skills} />
            )}
            {data.background.skills.length > 0 && (
              <TitledList
                title={character.background.name}
                list={data.background.skills}
              />
            )}
          </section>
          <ProficiencyList
            list={{
              characterAbilityScores: character.abilityScores,
              skills: data.skills,
              raceSkills: data.race.skills,
              backgroundSkills: data.background.skills,
              charClassSkills: character.skills,
            }}
          />
        </Styled.Grid>
      )}
      <ActivityButton
        handleClick={() => history.push('/create-character/equipment')}
      >
        NEXT: EQUIPMENT
      </ActivityButton>
    </section>
  )
}

const SKILLS_QUERY = gql`
  query Skills($charClassID: ID!, $raceID: ID!, $backgroundID: ID!) {
    skills {
      ID
      name
      ability
    }
    charClass(ID: $charClassID) {
      skills {
        ID
        name
      }
    }
    race(ID: $raceID) {
      skills {
        ID
        name
      }
    }
    background(ID: $backgroundID) {
      skills {
        ID
        name
      }
    }
  }
`

export default SkillSelection
