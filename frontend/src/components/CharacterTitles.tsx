import React from 'react'
import * as Styled from './CharacterTitles.styles'

/**
 * Displays a stylized character's name, race/subrace, class, and background
 */
const CharacterTitles: React.FC<IProps> = ({
  charName,
  race,
  subrace,
  charClass,
  background,
}) => {
  return (
    <Styled.Wrapper>
      {charName && <Styled.CharName>{charName}</Styled.CharName>}
      {race && <Styled.Race>{subrace || race}</Styled.Race>}
      {charClass && <Styled.CharClass>{charClass}</Styled.CharClass>}
      {background && <Styled.Background>{background}</Styled.Background>}
    </Styled.Wrapper>
  )
}

interface IProps {
  charName?: string
  race?: string
  subrace?: string
  charClass?: string
  background?: string
}

export default CharacterTitles
