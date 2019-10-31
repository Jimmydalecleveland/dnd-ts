import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { CharClassFeatures } from '../graphql-types'
import SectionHeader from './SectionHeader'
import FeatureItem from './FeatureItem'

const ClassFeatures = ({ charClassID, headline }: IProps) => {
  const { loading, data } = useQuery<CharClassFeatures, IQueryVariables>(
    CLASS_FEATURES_QUERY,
    { variables: { charClassID } }
  )
  if (loading) {
    return <p>...loading</p>
  }

  return (
    <section>
      <SectionHeader>{headline}</SectionHeader>
      {data.charClass.features.map((feature) => (
        <FeatureItem
          key={feature.ID}
          title={`${feature.name} - Level ${feature.level}`}
          description={feature.description}
        />
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

interface IQueryVariables {
  charClassID: string
}

export default ClassFeatures
