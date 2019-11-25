import React from 'react'

import * as Styled from './ToggleButton.styles'

const ToggleButton: React.FC<IProps> = ({
  disabled = false,
  isActive,
  handleClick,
  children,
}) => (
  <Styled.ToggleButton
    disabled={disabled}
    className={isActive && 'active'}
    onClick={handleClick}
  >
    {children}
  </Styled.ToggleButton>
)

interface IProps {
  children: string
  disabled?: boolean
  isActive: boolean
  handleClick(): void
}

export default ToggleButton
