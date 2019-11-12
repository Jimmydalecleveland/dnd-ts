import styled from 'styled-components'

export const Wrapper = styled.section`
  margin-bottom: 8px;
  text-align: center;
`

export const Race = styled.h3`
  color: white;
  opacity: 0.6;
  font-size: 18px;
  line-height: 1;
  text-transform: uppercase;
`

export const CharClass = styled.h3`
  color: ${({ theme }) => theme.colors.outline};
  opacity: 0.6;
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.25ch;
`

export const Background = styled.h3`
  color: ${({ theme }) => theme.colors.highlight};
  opacity: 0.5;
  font-size: 16px;
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
`
