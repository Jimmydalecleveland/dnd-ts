import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { SpellQuery } from '../graphql-types'

const Spell = ({ match }: RouteComponentProps<IProps>) => {
  const { id: spellID } = match.params
  const { loading, data } = useQuery<SpellQuery, IVariables>(SPELL_QUERY, {
    variables: {
      ID: spellID,
    },
  })

  if (loading) {
    return <p>loading...</p>
  }

  return <h1>{data.spell.name}</h1>
}

interface IProps {
  id: string
}

const SPELL_QUERY = gql`
  query SpellQuery($ID: ID!) {
    spell(ID: $ID) {
      ID
      name
    }
  }
`

interface IVariables {
  ID: string
}

export default Spell
