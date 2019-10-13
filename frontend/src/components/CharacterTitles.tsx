import React from 'react'
import styled from 'styled-components'
import { useCharacter } from '../context'

const CharacterTitles = () => {
  const { character } = useCharacter()

  return (
    <Wrapper>
      <Race>
        {character.subrace ? character.subrace.name : character.race.name}
      </Race>
      {character.charClass && <CharClass>{character.charClass.name}</CharClass>}
      {character.background && (
        <Background>{character.background.name}</Background>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-bottom: 8px;
  text-align: center;
`

const Race = styled.h3`
  color: white;
  opacity: 0.6;
  font-size: 18px;
  line-height: 1;
  text-transform: uppercase;
`

const CharClass = styled.h3`
  color: ${({ theme }) => theme.colors.outline};
  opacity: 0.6;
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.25ch;
`

const Background = styled.h3`
  color: ${({ theme }) => theme.colors.highlight};
  opacity: 0.5;
  font-size: 16px;
  line-height: 1;
  text-transform: uppercase;
`
export default CharacterTitles
