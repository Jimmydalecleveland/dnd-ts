import React from 'react'
import styled from 'styled-components'

const ToggleButton = ({ isActive, handleClick, children }: IProps) => (
  <StyledToggleButton className={isActive && 'active'} onClick={handleClick}>
    {children}
  </StyledToggleButton>
)

const StyledToggleButton = styled.button`
  padding: 10px 15px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  border: ${({ theme }) => `solid 1px ${theme.colors.outline}`};
  background: none;

  &.active {
    background-color: ${({ theme }) => theme.colors.primaryTransparent};
    border-color: transparent;
  }
`

interface IProps {
  isActive: boolean
  children: string
  handleClick(): void
}

export default ToggleButton
