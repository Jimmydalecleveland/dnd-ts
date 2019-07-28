import { gql } from 'apollo-boost'
import React from 'react'
import { Query } from 'react-apollo'

import SectionHeader from './SectionHeader'

const RaceTraits = ({ raceID, headline }: IProps) => (
  <Query<IData> query={RACETRAITS_QUERY} variables={{ raceID }}>
    {({ data, loading, error }) => {
      if (loading) {
        return <p>...loading</p>
      }
      if (error) {
        return <p>error: {error}</p>
      }
      return (
        <section>
          <SectionHeader>{headline}</SectionHeader>
          {data.raceTraits.map((raceTrait) => (
            <React.Fragment key={raceTrait.ID}>
              <h3>{raceTrait.name}</h3>
              <p>{raceTrait.description}</p>
            </React.Fragment>
          ))}
        </section>
      )
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
  headline: string
}

interface IRaceTrait {
  ID: string
  name: string
  description: string
}

interface IData {
  raceTraits: IRaceTrait[]
}

export default RaceTraits
