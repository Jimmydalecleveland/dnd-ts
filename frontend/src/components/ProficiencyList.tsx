import React from 'react'
import styled from 'styled-components'

import SectionHeader from './SectionHeader'

const ProficiencyList: React.FC<IProps> = ({ list }) => {
  return (
    <section>
      <SectionHeader>Skills</SectionHeader>
      {list.map((proficiency) => (
        <Proficiency key={proficiency.ID} proficient={proficiency.proficient}>
          <span className="name">{proficiency.name}</span>
          <span className="value">
            {proficiency.value >= 0 && '+'}
            {proficiency.value}
          </span>
        </Proficiency>
      ))}
    </section>
  )
}

const Proficiency = styled.div<{ proficient: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  text-transform: uppercase;

  .name {
    flex: 1;
    text-align: right;
    margin-right: 20px;
  }

  .value {
    font-size: 20px;
    color: ${({ theme, proficient }) =>
      proficient ? theme.colors.primary : 'white'};
  }
`

interface IProps {
  list: Array<{ ID: string; name: string; value: number; proficient: boolean }>
}

export default ProficiencyList
