import React from 'react'
import * as Styled from './CharacterTitles.styles'
import { useCharacter } from '../context'

/**
 * Displays a stylized character's race/subrace, class, and background
 * @remarks
 * useCharacter context is used to obtain character information
 */
const CharacterTitles: React.FC = () => {
  const { character } = useCharacter()

  return (
    <Styled.Wrapper>
      {character.race && (
        <Styled.Race>
          {character.subrace ? character.subrace.name : character.race.name}
        </Styled.Race>
      )}
      {character.charClass && (
        <Styled.CharClass>{character.charClass.name}</Styled.CharClass>
      )}
      {character.background && (
        <Styled.Background>{character.background.name}</Styled.Background>
      )}
    </Styled.Wrapper>
  )
}

export default CharacterTitles
