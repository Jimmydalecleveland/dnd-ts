import { gql } from 'apollo-boost'
import React from 'react'
import { Query } from 'react-apollo'

const RaceTraits = ({ raceID }: IProps) => (
  <Query<IRaceTraitData> query={RACETRAITS_QUERY} variables={{ raceID }}>
    {({ data, loading, error }) => {
      if (loading) {
        return <p>...loading</p>
      }
      if (error) {
        return <p>error: {error}</p>
      }
      return data.raceTraits.map((raceTrait) => (
        <>
          <h3>{raceTrait.name}</h3>
          <p>{raceTrait.description}</p>
        </>
      ))
    }}
  </Query>
)

const RACETRAITS_QUERY = gql`
  query RaceTraits($raceID: ID!) {
    raceTraits(raceID: $raceID) {
      ID
      name
      description
    }
  }
`

interface IProps {
  raceID: string
}

interface IRaceTrait {
  ID: string
  name: string
  description: string
}

interface IRaceTraitData {
  raceTraits: IRaceTrait[]
}

export default RaceTraits
