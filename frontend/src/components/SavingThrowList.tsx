import React from 'react'

import * as Styled from './ProficiencyList.styles'
import { ISkill } from '../interfaces'
import { getModifier } from '../utils/helpers'

const SavingThrowList: React.FC<IProps> = ({ list }) => {
  const proficiencies = generateSkillSet(list)

  return (
    <Styled.ListWrapper>
      {proficiencies.map((proficiency) => (
        <Styled.Proficiency
          key={proficiency.ability}
          proficient={proficiency.proficient}
        >
          <span className="name">{proficiency.ability}</span>
          <span className="value">
            {proficiency.value >= 0 && '+'}
            {proficiency.value}
          </span>
        </Styled.Proficiency>
      ))}
    </Styled.ListWrapper>
  )
}

export const generateSkillSet = ({
  proficiencies,
  characterAbilityScores,
}: {
  proficiencies: string[]
  characterAbilityScores: any
}): Array<{ ability: string; proficient: boolean; value: number }> => {
  const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha']
  return abilities.map((ability) => {
    const proficient = proficiencies.includes(ability)
    let value = getModifier(characterAbilityScores[ability])
    if (proficient) {
      // TODO: should not be hard coded
      value = value + 2
    }
    return { ability, proficient, value }
  })
}

interface IProps {
  list: {
    characterAbilityScores: any
    proficiencies: string[]
  }
}

export default SavingThrowList
