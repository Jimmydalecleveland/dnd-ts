import React from 'react'
import styled from 'styled-components'
import SectionHeader from './SectionHeader'

const TitledList: React.FC<IProps> = ({ title, list }) => {
  return (
    <List>
      <SectionHeader>{title}</SectionHeader>
      {list.map(({ ID, name }) => (
        <p key={ID}>{name}</p>
      ))}
    </List>
  )
}

interface IProps {
  title: string
  list: Array<{
    ID: string
    name: string
  }>
}

const List = styled.div`
  margin-bottom: 40px;

  p {
    text-align: center;
    text-transform: uppercase;
  }
`

export default TitledList
