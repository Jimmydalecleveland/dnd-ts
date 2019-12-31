import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { RouteComponentProps } from 'react-router-dom'

import {
  CharacterPageQuery,
  CharacterPageQueryVariables,
} from './gql-types/CharacterPageQuery'
import { SectionHeader } from '../components/SectionHeader.styles'
import CharacterTitles from '../components/CharacterTitles'
import ProficiencyList from '../components/ProficiencyList'
import ActivityButton from '../components/ActivityButton'

const Character = ({ match, history }: RouteComponentProps<IProps>) => {
  const { id: characterID } = match.params
  const { loading, data } = useQuery<
    CharacterPageQuery,
    CharacterPageQueryVariables
  >(CHARACTER_PAGE_QUERY, {
    variables: {
      ID: characterID,
    },
  })
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

  const {
    name,
    race,
    subrace,
    charClass,
    background,
    abilityScores,
    skills,
    weapons,
  } = data.character

  return (
    <div>
      <CharacterTitles
        charName={name}
        race={race.name}
        subrace={subrace && subrace.name}
        charClass={charClass.name}
        background={background.name}
      />

      <section>
        <SectionHeader>Calculated Stats</SectionHeader>
        <h3>Speed: missing</h3>
        <h3>Hit Die: {charClass.hitDice}</h3>
        <h3>
          Max HP:{' '}
          {Math.floor(abilityScores.con - 10) / 2 +
            Number(charClass.hitDice.replace('1d', ''))}
        </h3>
        <h3>Proficiency Bonus: </h3>
        <h3>AC: {Math.floor(10 + (abilityScores.dex - 10) / 2)}</h3>
        <h3>
          Passive Perception: {Math.floor(10 + (abilityScores.wis - 10) / 2)}
        </h3>
      </section>

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
        <ProficiencyList
          list={{
            characterAbilityScores: abilityScores,
            skills: data.skills,
            backgroundSkills: background.skills,
            raceSkills: race.skills,
            charClassSkills: skills,
          }}
        ></ProficiencyList>
      </section>

      <section>
        <SectionHeader>Equipment</SectionHeader>
        <h3>Weapons</h3>
        {weapons.map((weapon) => (
          <p key={weapon.ID}>
            {weapon.quantity}x {weapon.name}
          </p>
        ))}
      </section>

      <ActivityButton handleClick={() => deleteCharacter()}>
        Delete
      </ActivityButton>
    </div>
  )
}

interface IProps {
  id: string
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
        speed
        skills {
          ID
          name
          ability
        }
      }
      subrace {
        ID
        name
        speed
      }
      charClass {
        ID
        name
        numSkillProficiencies
        hitDice
      }
      background {
        ID
        name
        skills {
          ID
          name
          ability
        }
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
