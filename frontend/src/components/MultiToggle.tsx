import React from 'react'
import styled from 'styled-components'

import ToggleButton from './ToggleButton'

const MultiToggle: React.FC<IProps> = ({ items, remaining, onChange }) => {
  return (
    <>
      <TitleWrapper>
        <Title>
          Class Choices
          <br />
          <span>Remaining</span>
        </Title>
        <RemainingHexagon remaining={remaining}>
          <svg width="auto" height="100%" viewBox="0 0 114 120">
            <polygon points="60,120 112,90 112,30 60,0 8,30 8,90"></polygon>
            <text x="53%" y="53%" dominantBaseline="middle" textAnchor="middle">
              {remaining}
            </text>
          </svg>
        </RemainingHexagon>
      </TitleWrapper>
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
    </>
  )
}

interface IProps {
  items: Array<{
    ID: string
    name: string
    disabled: boolean
    isActive: boolean
  }>
  remaining: number
  onChange(ID: string): void
}

const Grid = styled.div`
  display: grid;
  gap: 5px;
  margin-bottom: 40px;
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.h3`
  color: #fff;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-align: center;

  span {
    font-size: 16px;
  }
`

const RemainingHexagon = styled.div<{ remaining: number }>`
  display: flex;
  width: 48px;
  height: 54px;
  margin-top: -5px;
  margin-bottom: 20px;

  svg {
    polygon {
      fill: transparent;
      stroke: ${({ theme }) => theme.colors.outline};
      stroke-width: 5;
    }

    text {
      fill: ${({ theme, remaining }) =>
        remaining ? theme.colors.secondary : theme.colors.outline};
      font-size: 62px;
      font-weight: 600;
    }
  }
`
export default MultiToggle
