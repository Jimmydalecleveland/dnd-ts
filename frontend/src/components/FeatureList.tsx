import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { motion } from 'framer-motion'
import React from 'react'
import {ICharClass, ICharClassFeature} from '../interfaces'
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

const ClassFeatures = ({ charClassID, headline }: IProps) => {
  const { loading, data } = useQuery<IQueryData, IQueryVariables>(
    CLASS_FEATURES_QUERY,
    { variables: { charClassID }, }
  )
  if (loading) {
    return <p>...loading</p>
  }

  return (
    <section>
      <SectionHeader>{headline}</SectionHeader>
      {data.charClass.features.map((feature) => (
        <motion.div key={feature.ID} variants={item}>
          <h3>{feature.name} - Level {feature.level}</h3>
          <p>{feature.description}</p>
        </motion.div>
      ))}
    </section>
  )
}

const CLASS_FEATURES_QUERY = gql`
  query CharClassFeatures($charClassID: ID!) {
    charClass(ID: $charClassID) {
      features {
        ID
        name
        description
        level
      }
    }
  }
`

interface IProps {
  charClassID: string
  headline: string
}

interface IQueryData {
  charClass: ICharClass
}

interface IQueryVariables {
  charClassID: string
}

export default ClassFeatures
