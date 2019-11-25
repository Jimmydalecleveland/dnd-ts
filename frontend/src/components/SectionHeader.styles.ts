import styled from 'styled-components'

export const SectionHeader = styled.h2`
  margin: 0 0 10px;
  padding-bottom: 3px;
  text-align: center;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  border-bottom: solid 1px ${({ theme }) => theme.colors.primaryTransparent};
`
