import React from 'react'
import styled from 'styled-components'

const TitledList: React.FC<IProps> = ({ title, list }) => {
  return (
    <List>
      <h3>{title}</h3>
      {list.map(({ ID, name }) => (
        <div key={ID}>{name}</div>
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

const List = styled.div``

export default TitledList
