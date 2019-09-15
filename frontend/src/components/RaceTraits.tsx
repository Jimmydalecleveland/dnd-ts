import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { motion } from 'framer-motion'

import { IRaceTrait } from '../interfaces'
import SectionHeader from './SectionHeader'
import FeatureItem from './FeatureItem'

const RaceTraits = ({ raceID, headline }: IProps) => {
  const { loading, data } = useQuery<IQueryData, IQueryVariables>(
    RACETRAITS_QUERY,
    {
      variables: { raceID },
    }
  )
  if (loading) {
    return <p>...loading</p>
  }

  return (
    <section>
      <SectionHeader>{headline}</SectionHeader>
      {data.raceTraits.map((raceTrait) => (
        <FeatureItem
          key={raceTrait.ID}
          title={raceTrait.name}
          description={raceTrait.description}
        />
      ))}
    </section>
  )
}

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

interface IQueryData {
  raceTraits: IRaceTrait[]
}

interface IQueryVariables {
  raceID: string
}

export default RaceTraits
