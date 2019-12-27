import React from 'react'

import * as Styled from './ProficiencyList.styles'
import SectionHeader from './SectionHeader'
import { IAbilityScores } from '../interfaces'
import {
  Skills,
  Skills_skills,
  Skills_background_skills,
  Skills_race_skills,
} from '../graphql-types'

const ProficiencyList: React.FC<IProps> = ({ list }) => {
  const proficiencies = generateSkillSet(list)

  return (
    <section>
      <SectionHeader>Skills</SectionHeader>
      <Styled.ListWrapper>
        {proficiencies.map((proficiency) => (
          <Styled.Proficiency
            key={proficiency.ID}
            proficient={proficiency.proficient}
          >
            <span className="name">{proficiency.name}</span>
            <span className="value">
              {proficiency.value >= 0 && '+'}
              {proficiency.value}
            </span>
          </Styled.Proficiency>
        ))}
      </Styled.ListWrapper>
    </section>
  )
}

/**
 * Takes in Character's ability scores and the skills pertaining to each choice the user has made
 * thus far and gives back a list of every possible skill and the character's current value for each.
 * @param {Object} characterAbilityScores - str,dex,con,int,wis,cha values
 * @param {Object} skillProficiencies - Object comprised of every skill, and character's skills
 * from choices thus far
 * @param {Object[]} skillProficiencies[].skills - Every skill
 * @param {Object[]} skillProficiencies[].backgroundSkills - Skills from user's background choice
 * @param {Object[]} skillProficiencies[].raceSkills - Skills from user's race choice
 * @param {string[]} skillProficiencies[].charClassSkills - Character's currently selected skill IDs
 * @returns {Object[]} An array of every skill, each containing a skill's ID, name, proficient boolean,
 * and numeric value
 */
export const generateSkillSet = ({
  characterAbilityScores,
  skills,
  backgroundSkills,
  raceSkills,
  charClassSkills,
}: {
  characterAbilityScores: IAbilityScores
  skills: Skills_skills[]
  backgroundSkills: Skills_background_skills[]
  raceSkills: Skills_race_skills[]
  charClassSkills: string[]
}) => {
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
interface IProps {
  list: {
    characterAbilityScores: IAbilityScores
    skills: Skills_skills[]
    backgroundSkills: Skills_background_skills[]
    raceSkills: Skills_race_skills[]
    charClassSkills: string[]
  }
}

export default ProficiencyList
