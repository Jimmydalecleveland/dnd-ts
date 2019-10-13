import { ICharacter } from '../interfaces'

const dummyCharacter: ICharacter = {
  ID: '',
  background: {
    ID: '1',
    features: [],
    name: 'acolyte',
  },
  charClass: {
    ID: '',
    features: [],
    name: '',
  },
  name: 'a',
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
  abilityScores: {
    strength: 10,
    dexterity: 8,
    constitution: 10,
    intelligence: 15,
    wisdom: 14,
    charisma: 11,
  },
}

export default dummyCharacter
