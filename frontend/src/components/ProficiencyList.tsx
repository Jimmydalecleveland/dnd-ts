import React from 'react'

import * as Styled from './ProficiencyList.styles'
import SectionHeader from './SectionHeader'

const ProficiencyList: React.FC<IProps> = ({ list }) => {
  return (
    <section>
      <SectionHeader>Skills</SectionHeader>
      <Styled.ListWrapper>
        {list.map((proficiency) => (
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

interface IProps {
  list: Array<{ ID: string; name: string; value: number; proficient: boolean }>
}

export default ProficiencyList
