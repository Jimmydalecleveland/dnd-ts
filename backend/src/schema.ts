import { gql } from 'apollo-server'

const typeDefs = gql`
  type Mutation {
    createCharacter(name: String!, raceID: ID!, subraceID: ID!): Character!
    deleteCharacter(ID: ID!): Int
  }

  type Query {
    spells: [Spell]!
    spell(ID: ID!): Spell
    characters: [Character]!
    character(ID: ID!): Character
    races: [Race]!
    race(ID: ID!): Race
  }

  type Spell {
    ID: ID!
    name: String!
  }

  type Character {
    ID: ID!
    name: String!
    race: Race
    subrace: Subrace
  }

  type Race {
    ID: ID!
    name: String!
    subraces: [Subrace]
  }

  type Subrace {
    ID: ID!
    name: String!
  }
`

export default typeDefs
