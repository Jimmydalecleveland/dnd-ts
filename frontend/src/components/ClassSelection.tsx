import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import styled from 'styled-components'
import { useCharacter } from '../context'
import { ICharClass } from '../interfaces'
import SectionHeader from './SectionHeader'
import ToggleButton from './ToggleButton'

const ClassSelection = () => {
  const { character, setCharacter } = useCharacter()
  const { loading, error, data } = useQuery<IQueryData>(CLASSES_QUERY)

  return (
    <div>
      <h1>{character.name}</h1>
      <h2>{character.race.name}</h2>
      {character.subrace && <h3>{character.subrace.name}</h3>}
      {character.charClass && <h3>{character.charClass.name}</h3>}

      {!loading && !error && (
        <section>
          <SectionHeader>CLASS</SectionHeader>
          <ClassList>
            {data.charClasses.map((charClass) => (
              <ToggleButton
                key={charClass.ID}
                isActive={character.charClass.ID === charClass.ID}
                handleClick={() => setCharacter({ ...character, charClass })}
              >
                {charClass.name}
              </ToggleButton>
            ))}
          </ClassList>
        </section>
      )}
    </div>
  )
}

interface IQueryData {
  charClasses: ICharClass[]
}

const ClassList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  width: 100%;
  margin: 0 0 20px;
`

const CLASSES_QUERY = gql`
  query CharClasses {
    charClasses {
      ID
      name
    }
  }
`

export default ClassSelection
