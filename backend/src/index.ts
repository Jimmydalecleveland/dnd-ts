import { ApolloServer } from 'apollo-server'
import CharacterAPI from './datasources/character'
import SpellAPI from './datasources/spell'
import resolvers from './resolvers'
import typeDefs from './schema'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    spellAPI: new SpellAPI(),
    characterAPI: new CharacterAPI(),
  }),
});

server.listen().then(({ url }) => {
  // tslint:disable-next-line: no-console
  console.log(`Server ready at ${url}`)
})
