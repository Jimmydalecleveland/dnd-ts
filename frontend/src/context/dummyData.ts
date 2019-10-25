import { ICharacter } from '../interfaces'

const dummyCharacter: ICharacter = {
  ID: '',
  // name: 'Logen Ninefingers',
  name: 'Ravalynn woofsnake',
  race: {
    ID: '16',
    name: 'elf',
    subraces: [
      {
        ID: '26',
        name: 'high elf',
      },
      {
        ID: '27',
        name: 'wood elf',
      },
      {
        ID: '28',
        name: 'dark elf',
      },
    ],
  },
  subrace: {
    ID: '26',
    name: 'high elf',
  },
  charClass: {
    ID: '1',
    features: [],
    name: 'wizard',
  },
  background: {
    ID: '1',
    features: [],
    name: 'acolyte',
  },
  abilityScores: {
    str: 20,
    dex: 8,
    con: 11,
    int: 15,
    wis: 18,
    cha: 12,
  },
}

export default dummyCharacter
