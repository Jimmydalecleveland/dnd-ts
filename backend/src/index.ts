import { ApolloServer } from 'apollo-server'
import typeDefs from './schema'
import SpellAPI from './datasources/spell'
import CharacterAPI from './datasources/character'
import resolvers from './resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    spellAPI: new SpellAPI(),
    characterAPI: new CharacterAPI(),
  }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
