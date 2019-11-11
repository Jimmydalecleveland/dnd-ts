import React from 'react'
import styled from 'styled-components'

import ToggleButton from './ToggleButton'

const MultiToggle: React.FC<IProps> = ({ items, onChange }) => {
  return (
    <Grid>
      {items.map(({ ID, name, disabled, isActive }) => (
        <ToggleButton
          key={ID}
          disabled={disabled}
          isActive={isActive}
          handleClick={() => onChange(ID)}
        >
          {name}
        </ToggleButton>
      ))}
    </Grid>
  )
}

interface IProps {
  items: Array<{
    ID: string
    name: string
    disabled: boolean
    isActive: boolean
  }>
  onChange(ID: string): void
}

const Grid = styled.div`
  display: grid;
  gap: 5px;
`

export default MultiToggle
