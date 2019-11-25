import React from 'react'

import * as Styled from './Button.styles'

const Button: React.FC<IProps> = ({
  disabled = false,
  handleClick,
  children,
}) => (
  <Styled.Button disabled={disabled} onClick={handleClick}>
    {children}
  </Styled.Button>
)
interface IProps {
  children: JSX.Element
  disabled?: boolean
  handleClick(): void
}

export default Button
