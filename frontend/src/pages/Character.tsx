import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { RouteComponentProps } from 'react-router-dom'

import { CharacterPageQuery } from '../graphql-types'
import { useCharacter } from '../context'
import { SectionHeader } from '../components/SectionHeader.styles'
import CharacterTitles from '../components/CharacterTitles'
import ProficiencyList from '../components/ProficiencyList'

const Character = ({ match, history }: RouteComponentProps<IProps>) => {
  const { character, setCharacter } = useCharacter()
  const { id: characterID } = match.params
  const { loading, data } = useQuery<CharacterPageQuery, IQueryVariables>(
    CHARACTER_PAGE_QUERY,
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
        {Object.entries(abilityScores).map((ability) => {
          if (ability[0] === '__typename') {
            return
          }
          return (
            <p key={ability[0]}>
              {ability[0]}: {ability[1]}
            </p>
          )
        })}
      </section>

      <section>
        <SectionHeader>Skills</SectionHeader>
        {/* <ProficiencyList
          list={{
            characterAbilityScores: abilityScores,
            skills: data.skills,
          }}
        ></ProficiencyList> */}
      </section>

      <button onClick={() => deleteCharacter()}>Delete</button>
    </div>
  )
}

interface IProps {
  id: string
}

interface IQueryVariables {
  ID: string
}

interface IMutationVariables {
  ID: string
}

const CHARACTER_PAGE_QUERY = gql`
  query CharacterPageQuery($ID: ID!) {
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
        numSkillProficiencies
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
    skills {
      ID
      name
      ability
    }
  }
`

const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($ID: ID!) {
    deleteCharacter(ID: $ID)
  }
`

export default Character
