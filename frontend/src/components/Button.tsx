import React from 'react'
import styled from 'styled-components'

const Button: React.FC<IProps> = ({
  disabled = false,
  handleClick,
  children,
}) => (
  <StyledButton disabled={disabled} onClick={handleClick}>
    {children}
  </StyledButton>
)

const StyledButton = styled.button`
  color: ${({ theme, disabled }) => (disabled ? theme.colors.outline : '#fff')};
  background-color: ${({ theme }) => theme.colors.secondaryTransparent};
  border: none;
  padding: 10px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
  transition: background-color 0.3s, border-color 0.3s;
`

interface IProps {
  children: JSX.Element
  disabled?: boolean
  handleClick(): void
}

export default Button
