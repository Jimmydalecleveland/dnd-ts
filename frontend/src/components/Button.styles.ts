import styled from 'styled-components'

export const Button = styled.button`
  color: ${({ theme, disabled }) => (disabled ? theme.colors.outline : '#fff')};
  background-color: ${({ theme }) => theme.colors.secondaryTransparent};
  border: none;
  padding: 10px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
  transition: background-color 0.3s, border-color 0.3s;
`
