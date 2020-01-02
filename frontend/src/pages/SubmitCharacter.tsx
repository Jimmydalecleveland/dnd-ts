import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { useCharacter } from '../context'
import { RouteComponentProps } from 'react-router-dom'

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
      charClass: { ID: charClassID },
      background: { ID: backgroundID },
      skills,
      startingEquipment: { weapons, gear },
    },
  } = useCharacter()

  if (loading) {
    return <h1>Loading . . .</h1>
  }
  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>
  }
  console.log('MEW', weapons, gear)

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
              weapons,
              gear,
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
    $weapons: [WeaponInput]!
    $gear: [GearInput]!
  ) {
    createCharacter(
      name: $name
      raceID: $raceID
      subraceID: $subraceID
      charClassID: $charClassID
      backgroundID: $backgroundID
      abilityScores: $abilityScores
      skills: $skills
      weapons: $weapons
      gear: $gear
    )
  }
`

export default SubmitCharacter
