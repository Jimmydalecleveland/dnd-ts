import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { IBackground } from '../interfaces'
import SectionHeader from './SectionHeader'
import FeatureItem from './FeatureItem'

const BackgroundFeatures = ({ backgroundID, headline }: IProps) => {
  const { loading, data } = useQuery<IQueryData, IQueryVariables>(
    BACKGROUND_FEATURES_QUERY,
    { variables: { backgroundID } }
  )
  if (loading) {
    return <p>...loading</p>
  }

  return (
    <section>
      <SectionHeader>{headline}</SectionHeader>
      {data.background.features.map((feature) => (
        <FeatureItem
          key={feature.ID}
          title={feature.name}
          description={feature.description}
        />
      ))}
    </section>
  )
}

const BACKGROUND_FEATURES_QUERY = gql`
  query BackgroundFeatures($backgroundID: ID!) {
    background(ID: $backgroundID) {
      features {
        ID
        name
        description
      }
    }
  }
`
interface IProps {
  backgroundID: string
  headline: string
}

interface IQueryData {
  background: IBackground
}

interface IQueryVariables {
  backgroundID: string
}

export default BackgroundFeatures
