import { ApolloServer } from 'apollo-server'
import CharacterAPI from './datasources/character'
import RaceAPI from './datasources/race'
import CharClassAPI from './datasources/charClass'
import BackgroundAPI from './datasources/background'
import SpellAPI from './datasources/spell'
import SkillAPI from './datasources/skill'
import EquipmentAPI from './datasources/equipment'
import resolvers from './resolvers'
import typeDefs from './schema'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources: () => ({
    backgroundAPI: new BackgroundAPI(),
    charClassAPI: new CharClassAPI(),
    characterAPI: new CharacterAPI(),
    raceAPI: new RaceAPI(),
    spellAPI: new SpellAPI(),
    skillAPI: new SkillAPI(),
    equipmentAPI: new EquipmentAPI(),
  }),
})

server.listen().then(({ url }: { url: string }) => {
  // tslint:disable-next-line: no-console
  console.log(`Server ready at ${url}`)
})
