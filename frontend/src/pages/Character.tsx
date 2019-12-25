import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { RouteComponentProps } from 'react-router-dom'

import { useCharacter } from '../context'
import { ICharacter } from '../interfaces'
import { SectionHeader } from '../components/SectionHeader.styles'
import CharacterTitles from '../components/CharacterTitles'

const Character = ({ match, history }: RouteComponentProps<IProps>) => {
  const { character, setCharacter } = useCharacter()
  const { id: characterID } = match.params
  const { loading, data } = useQuery<IQueryData, IQueryVariables>(
    CHARACTER_QUERY,
    {
      variables: {
        ID: characterID,
      },
    }
  )
  const [deleteCharacter] = useMutation<{}, IMutationVariables>(
    DELETE_CHARACTER,
    {
      onCompleted: () => history.push('/characters'),
      variables: { ID: characterID },
    }
  )

  if (loading) {
    return <p>loading...</p>
  }

  if (!data.character) {
    return (
      <p>
        No character with ID <strong>&quot;{characterID}&quot;</strong> exists
      </p>
    )
  }

  console.log(data.character)
  setCharacter(data.character)

  const {
    name,
    race,
    subrace,
    charClass,
    background,
    abilityScores,
  } = character

  return (
    <div>
      <h1>{name}</h1>
      <CharacterTitles />

      <section>
        <SectionHeader>Ability Scores</SectionHeader>
        {Object.entries(abilityScores).map((ability) => (
          <p key={ability[0]}>
            {ability[0]}: {ability[1]}
          </p>
        ))}
      </section>

      <button onClick={() => deleteCharacter()}>Delete</button>
    </div>
  )
}

interface IProps {
  id: string
}

interface IQueryData {
  character: ICharacter
}

interface IQueryVariables {
  ID: string
}

interface IMutationVariables {
  ID: string
}

const CHARACTER_QUERY = gql`
  query CharacterQuery($ID: ID!) {
    character(ID: $ID) {
      ID
      name
      abilityScores {
        str
        dex
        wis
        cha
        int
        con
      }
      race {
        ID
        name
      }
      subrace {
        ID
        name
      }
      charClass {
        ID
        name
      }
      background {
        ID
        name
      }
      skills {
        ID
        name
        ability
      }
      weapons {
        ID
        name
        damage
        skillType
        quantity
      }
    }
  }
`

const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($ID: ID!) {
    deleteCharacter(ID: $ID)
  }
`

export default Character
