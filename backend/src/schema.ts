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
    skills: [Skill]!
    weapons(filter: WeaponFilter): [Weapon]!
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
    skills: [Skill]
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
    skills: [Skill]
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
    numSkillProficiencies: Int!
    features: [CharClassFeature]!
    skills: [Skill]
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

  type Skill {
    ID: ID!
    name: String!
    ability: String!
  }

  type Weapon {
    ID: ID!
    name: String!
    damage: String!
    const: String!
    weight: String
    skillType: String!
    rangeType: String!
  }

  input WeaponFilter {
    skillType: String
    rangeType: String
  }
`

export default typeDefs
