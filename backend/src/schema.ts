import { gql } from 'apollo-server'

const typeDefs = gql`
  type Mutation {
    createCharacter(name: String!): Character!
    deleteCharacter(ID: ID!): Int
  }

  type Query {
    spells: [Spell]!
    spell(ID: ID!): Spell
    characters: [Character]!
    character(ID: ID!): Character
  }

  type Spell {
    ID: ID!
    name: String!
  }

  type Character {
    ID: ID!
    name: String!
  }
`

export default typeDefs
