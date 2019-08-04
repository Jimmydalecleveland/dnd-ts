import React from 'react'
import styled from 'styled-components'

const MobileNav = () => {
  const moo = ''
  return <StyledMobileNav />
}

const StyledMobileNav = styled.nav`
  z-index: 3;
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
`

export default MobileNav
