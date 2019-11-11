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
import logger from '../../logger'
import { useCharacter } from '../../context'
import { IAbilityScores } from '../../interfaces'
import ActivityButton from '../ActivityButton'
import CharacterTitles from '../CharacterTitles'
import ProficiencyList from '../ProficiencyList'
import ToggleButton from '../ToggleButton'
import MultiToggle from '../MultiToggle'
import TitledList from '../TitledList'

const generateSkillSet = (
  characterAbilityScores: IAbilityScores,
  {
    skills,
    backgroundSkills,
    raceSkills,
    charClassSkills,
  }: {
    skills: Skills_skills[]
    backgroundSkills: Skills_background_skills[]
    raceSkills: Skills_race_skills[]
    charClassSkills: string[]
  }
) => {
  const backgroundSkillIDs = backgroundSkills.map((skill) => skill.ID)
  const raceSkillIDs = raceSkills.map((skill) => skill.ID)
  const allProficientSkillIDs = [
    ...backgroundSkillIDs,
    ...raceSkillIDs,
    ...charClassSkills,
  ]

  return skills.map((skill) => {
    const proficient = allProficientSkillIDs.includes(skill.ID)
    let value = Math.floor((characterAbilityScores[skill.ability] - 10) / 2)
    if (proficient) {
      value = value + 2
    }
    return { ID: skill.ID, name: skill.name, proficient, value }
  })
}

const SkillSelection = ({ history }: RouteComponentProps) => {
  const { character, setCharacter } = useCharacter()
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
    if (skills.length >= 2) {
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
      const isActive = character.skills.includes(ID)
      return { ID, name, disabled, isActive }
    })
    return result
  }

  return (
    <section>
      <CharacterTitles />
      {data && data.race && data.skills && data.background && (
        <>
          <section>
            <MultiToggle items={items()} onChange={toggleSkill} />
            {data.race.skills.length > 0 && (
              <TitledList
                title={character.race.name}
                list={data.race.skills}
              ></TitledList>
            )}
            {data.background.skills.length > 0 && (
              <>
                <h3>{character.background.name}</h3>
                {data.background.skills.map((skill) => (
                  <p key={skill.ID}>{skill.name}</p>
                ))}
              </>
            )}
          </section>
          <ProficiencyList
            list={generateSkillSet(character.abilityScores, {
              skills: data.skills,
              raceSkills: data.race.skills,
              backgroundSkills: data.background.skills,
              charClassSkills: character.skills,
            })}
          />
        </>
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
