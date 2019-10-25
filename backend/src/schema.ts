import { gql } from 'apollo-server'

const typeDefs = gql`
  type Mutation {
    createCharacter(
      name: String!
      raceID: ID!
      subraceID: ID
      charClassID: ID!
      backgroundID: ID!
      abilityScores: AbilityScoresInput
    ): Character!
    deleteCharacter(ID: ID!): Int
  }

  type Query {
    spells: [Spell]!
    spell(ID: ID!): Spell
    characters: [Character]!
    character(ID: ID!): Character
    races: [Race]!
    race(ID: ID!): Race
    raceTraits(raceID: ID!): [RaceTrait]!
    backgrounds: [Background]!
    background(ID: ID!): Background
    charClasses: [CharClass]!
    charClass(ID: ID!): CharClass
  }

  type Spell {
    ID: ID!
    name: String!
  }

  type Character {
    ID: ID!
    name: String!
    race: Race!
    subrace: Subrace
    charClass: CharClass!
    background: Background!
    abilityScores: AbilityScores!
    HP: String
    maxHP: String
  }

  type Race {
    ID: ID!
    name: String!
    subraces: [Subrace]
    traits: [RaceTrait]!
  }

  type Subrace {
    ID: ID!
    name: String!
    traits: [RaceTrait]!
  }

  type RaceTrait {
    ID: ID!
    name: String!
    description: String!
  }

  type Background {
    ID: ID!
    name: String!
    features: [BackgroundFeature]!
  }

  type BackgroundFeature {
    ID: ID!
    name: String!
    description: String!
  }

  type CharClassFeature {
    ID: ID!
    name: String!
    description: String!
    level: Int!
  }

  type CharClass {
    ID: ID!
    name: String!
    features: [CharClassFeature]!
  }

  type AbilityScores {
    str: Int!
    dex: Int!
    con: Int!
    int: Int!
    wis: Int!
    cha: Int!
  }

  input AbilityScoresInput {
    str: Int!
    dex: Int!
    con: Int!
    int: Int!
    wis: Int!
    cha: Int!
  }
`

export default typeDefs
