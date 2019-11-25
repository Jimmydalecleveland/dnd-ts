import React from 'react'

import * as Styled from './SectionHeader.styles'

const SectionHeader = ({ children }: IProps) => (
  <Styled.SectionHeader>{children}</Styled.SectionHeader>
)

interface IProps {
  children: string
}

export default SectionHeader
