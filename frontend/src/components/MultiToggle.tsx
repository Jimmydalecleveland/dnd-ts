import React from 'react'

import * as Styled from './MultiToggle.styles'
import ToggleButton from './ToggleButton'

/**
 * One or more selectable options as a group of {@link ToggleButton} components
 * @param {Object[]} items - Each item will become a ToggleButton
 * @param {string} items[].ID - Used for key value in map
 * @param {string} items[].name - ToggleButton's text
 * @param {boolean} items[].disabled - Disables and styles ToggleButton when true
 * @param {boolean} items[].isActive - Display ToggleButton with selected style
 *
 * @param {number} remaining - Value to show for remaining ToggleButtons that can be active
 * @param {function(): void} onChange - Passed to ToggleButton with current items[].ID
 */

const MultiToggle: React.FC<IProps> = ({ items, remaining, onChange }) => {
  return (
    <>
      <Styled.TitleWrapper>
        <Styled.Title>
          Class Choices
          <br />
          <span>Remaining</span>
        </Styled.Title>
        <Styled.RemainingHexagon remaining={remaining}>
          <svg width="auto" height="100%" viewBox="0 0 114 120">
            <polygon points="60,120 112,90 112,30 60,0 8,30 8,90"></polygon>
            <text x="53%" y="53%" dominantBaseline="middle" textAnchor="middle">
              {remaining}
            </text>
          </svg>
        </Styled.RemainingHexagon>
      </Styled.TitleWrapper>
      <Styled.Grid>
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
      </Styled.Grid>
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

export default MultiToggle
