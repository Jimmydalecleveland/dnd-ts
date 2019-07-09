const resolvers = {
  Query: {
    spells: (_: any, __: any, { dataSources }: any) => dataSources.spellAPI.getSpells(),
    spell: (_: any, { ID }: { ID: string }, { dataSources }: any) => dataSources.spellAPI.getSpell({ ID }),
    characters: (_: any, __: any, { dataSources }: any) => dataSources.characterAPI.getCharacters(),
    character: (_: any, { ID }: { ID: string }, { dataSources }: any) => dataSources.characterAPI.getCharacter({ ID }),
  },
}

export default resolvers
