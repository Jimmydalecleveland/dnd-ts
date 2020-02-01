import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { useCharacter } from '../context'
import { RouteComponentProps } from 'react-router-dom'
import { getModifier } from '../utils/helpers'

const SubmitCharacter = ({ history }: RouteComponentProps) => {
  const [submitCharacter, { data, error, loading }] = useMutation(
    SUBMIT_CHARACTER,
    {
      onCompleted({ createCharacter }) {
        history.push(`/character/${createCharacter}`)
      },
    }
  )
  const {
    character: {
      name,
      abilityScores,
      race: { ID: raceID },
      subrace: { ID: subraceID = null },
      charClass: { ID: charClassID, hitDice },
      background: { ID: backgroundID },
      skills,
      startingEquipment,
    },
  } = useCharacter()

  if (loading) {
    return <h1>Loading . . .</h1>
  }
  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>
  }

  const maxHP = getModifier(abilityScores.con) + Number(hitDice.replace('1d', ''))

  return (
    <div>
      <button
        onClick={() =>
          submitCharacter({
            variables: {
              name,
              raceID,
              subraceID,
              charClassID,
              backgroundID,
              abilityScores,
              skills,
              items: startingEquipment,
              maxHP,
              HP: maxHP
            },
          })
        }
      >
        Submit
      </button>
    </div>
  )
}

const SUBMIT_CHARACTER = gql`
  mutation SubmitCharacter(
    $name: String!
    $raceID: ID!
    $subraceID: ID
    $charClassID: ID!
    $backgroundID: ID!
    $abilityScores: AbilityScoresInput!
    $skills: [ID]!
    $items: [ItemInput]!
    $maxHP: Int!
    $HP: Int!
  ) {
    createCharacter(
      name: $name
      raceID: $raceID
      subraceID: $subraceID
      charClassID: $charClassID
      backgroundID: $backgroundID
      abilityScores: $abilityScores
      skills: $skills
      items: $items
      maxHP: $maxHP
      HP: $HP
    )
  }
`

export default SubmitCharacter
