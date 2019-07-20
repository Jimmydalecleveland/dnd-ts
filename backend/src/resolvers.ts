const resolvers = {
  Mutation: {
    createCharacter: (
      _: any,
      { name }: { name: string },
      { dataSources }: any
    ) => dataSources.characterAPI.createCharacter({ name }),
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
    spell: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.spellAPI.getSpell({ ID }),
    spells: (_: any, __: any, { dataSources }: any) =>
      dataSources.spellAPI.getSpells(),
  },
  Race: {
    subRaces: (Race: IRace, _: any, { dataSources }: any) =>
      dataSources.raceAPI.getSubRaces({ ID: Race.ID }),
  },
}

interface IRace {
  ID: number
  name: string
  parentRaceID: number | null
}

export default resolvers
