import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { useCharacter } from '../context'

const SubmitCharacter = () => {
  const [submitCharacter, { data, error, loading }] = useMutation(
    SUBMIT_CHARACTER
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
      startingEquipment: { weapons },
    },
  } = useCharacter()

  console.log(weapons)
  if (loading) {
    return <h1>Loading . . .</h1>
  }
  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>
  }

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
            },
          })
        }
      >
        Submit
      </button>
      {data && (
        <div>
          <h1>{JSON.stringify(data)}</h1>
          <h2>{data.createCharacter.ID}</h2>
        </div>
      )}
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
    )
  }
`

export default SubmitCharacter
