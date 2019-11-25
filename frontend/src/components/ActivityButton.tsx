import React from 'react'

import * as Styled from './ActivityButton.styles'

const ActivityButton: React.FC<IProps> = ({
  disabled = false,
  handleClick,
  children,
}) => (
  <Styled.ActivityButton disabled={disabled} onClick={handleClick}>
    <span className="border border-top-left" />
    <span className="border border-left" />
    <span className="border border-bottom-left" />
    <span className="border border-bottom-right" />
    <span className="border border-right-bottom" />
    <span className="border border-right-top" />
    <span className="border border-top-right" />
    {children}
  </Styled.ActivityButton>
)
interface IProps {
  children: string
  disabled?: boolean
  handleClick?(): void
}

export default ActivityButton
