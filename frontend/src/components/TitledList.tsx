import React from 'react'

import * as Styled from './TitledList.styles'
import SectionHeader from './SectionHeader'

const TitledList: React.FC<IProps> = ({ title, list }) => {
  return (
    <Styled.List>
      <SectionHeader>{title}</SectionHeader>
      {list.map(({ ID, name }) => (
        <p key={ID}>{name}</p>
      ))}
    </Styled.List>
  )
}

interface IProps {
  title: string
  list: Array<{
    ID: string
    name: string
  }>
}

export default TitledList
