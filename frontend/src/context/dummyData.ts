import { ICharacter } from '../interfaces'

const dummyCharacter: ICharacter = {
  ID: '',
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
}

export default dummyCharacter
