import React from 'react'
import styled from 'styled-components'

import background from '../images/stone-steps.jpg'

const Main: React.FC = ({ children }) => {
  const moo = ''
  return <StyledMain>{children}</StyledMain>
}

const StyledMain = styled.main`
  z-index: 1;
  position: relative;
  height: calc(100vh - 50px);
  padding: 15px;
  background-color: #3c424e;
  background-image: url(${background});
  background-position: top center;
  background-blend-mode: overlay;
`

export default Main
