const resolvers = {
  Query: {
    character: (_: any, { ID }: { ID: string }, { dataSources }: any) => dataSources.characterAPI.getCharacter({ ID }),
    characters: (_: any, __: any, { dataSources }: any) => dataSources.characterAPI.getCharacters(),
    spell: (_: any, { ID }: { ID: string }, { dataSources }: any) => dataSources.spellAPI.getSpell({ ID }),
    spells: (_: any, __: any, { dataSources }: any) => dataSources.spellAPI.getSpells(),
  },
}

export default resolvers
