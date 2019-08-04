import React from 'react'
import styled from 'styled-components'

const ToggleButton: React.FC<IProps> = ({
  disabled = false,
  isActive,
  handleClick,
  children,
}) => (
  <StyledToggleButton
    disabled={disabled}
    className={isActive && 'active'}
    onClick={handleClick}
  >
    {children}
  </StyledToggleButton>
)

const StyledToggleButton = styled.button`
  color: ${({ theme, disabled }) => (disabled ? theme.colors.outline : '#fff')};
  border: ${({ theme }) => `solid 1px ${theme.colors.outline}`};
  padding: 10px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
  background-color: transparent;
  transition: background-color 0.3s, border-color 0.3s;

  &.active {
    background-color: ${({ theme }) => theme.colors.primaryTransparent};
    border-color: transparent;
  }
`

interface IProps {
  children: string
  disabled?: boolean
  isActive: boolean
  handleClick(): void
}

export default ToggleButton
