/* tslint:disable object-literal-sort-keys */
// Mutations and Query should remain at the top of this object for proper visual hierarchy
const resolvers = {
  Mutation: {
    createCharacter: (
      _: any,
      {
        name,
        raceID,
        subraceID,
      }: { name: string; raceID: string; subraceID: string },
      { dataSources }: any
    ) => dataSources.characterAPI.createCharacter({ name, raceID, subraceID }),
    deleteCharacter: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.characterAPI.deleteCharacter({ ID }),
  },
  Query: {
    character: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.characterAPI.getCharacter({ ID }),
    characters: (_: any, __: any, { dataSources }: any) =>
      dataSources.characterAPI.getCharacters(),
    race: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.raceAPI.getRace({ ID }),
    races: (_: any, __: any, { dataSources }: any) =>
      dataSources.raceAPI.getRaces(),
    raceTraits: (
      _: any,
      { raceID }: { raceID: string },
      { dataSources }: any
    ) => dataSources.raceAPI.getRaceTraits({ raceID }),
    spell: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.spellAPI.getSpell({ ID }),
    spells: (_: any, __: any, { dataSources }: any) =>
      dataSources.spellAPI.getSpells(),
    charClass: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.charClassAPI.getCharClass({ ID }),
    charClasses: (_: any, __: any, { dataSources }: any) =>
      dataSources.charClassAPI.getCharClasses(),
  },

  CharClass: {
    features: (CharClass: ICharClass, _: any, { dataSources }: any) =>
      dataSources.charClassAPI.getFeatures({ ID: CharClass.ID }),
  },

  Character: {
    race: (Character: ICharacter, _: any, { dataSources }: any) =>
      dataSources.characterAPI.getCharacterRace({ ID: Character.ID }),
    subrace: (Character: ICharacter, _: any, { dataSources }: any) =>
      dataSources.characterAPI.getCharacterSubrace({ ID: Character.ID }),
  },

  Race: {
    subraces: (Race: IRace, _: any, { dataSources }: any) =>
      dataSources.raceAPI.getSubraces({ ID: Race.ID }),
    traits: (Race: IRace, _: any, { dataSources }: any) =>
      dataSources.raceAPI.getRaceTraits({ raceID: Race.ID }),
  },

  Subrace: {
    traits: (Subrace: IRace, _: any, { dataSources }: any) =>
      dataSources.raceAPI.getRaceTraits({ raceID: Subrace.ID }),
  },
}

interface ICharClass {
  ID: number
  name: string
}

interface ICharacter {
  ID: number
  name: string
}

interface IRace {
  ID: number
  name: string
  parentRaceID: number | null
}

export default resolvers
