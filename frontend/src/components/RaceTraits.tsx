import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { motion } from 'framer-motion'
import React from 'react'

import SectionHeader from './SectionHeader'

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
}

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
        <motion.div key={raceTrait.ID} variants={item}>
          <h3>{raceTrait.name}</h3>
          <p>{raceTrait.description}</p>
        </motion.div>
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

interface IRaceTrait {
  ID: string
  name: string
  description: string
}

interface IQueryData {
  raceTraits: IRaceTrait[]
}

interface IQueryVariables {
  raceID: string
}

export default RaceTraits
