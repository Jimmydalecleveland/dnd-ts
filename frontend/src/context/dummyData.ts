import { ICharacter } from '../interfaces'

const dummyCharacter: ICharacter = {
  ID: '',
  name: 'Logen Ninefingers',
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
    ID: '27',
    name: 'wood elf',
  },
  charClass: {
    ID: '5',
    name: 'barbarian',
    numSkillProficiencies: 2,
  },
  background: {
    ID: '10',
    name: 'sailor',
  },
  abilityScores: {
    str: 20,
    dex: 17,
    con: 12,
    int: 9,
    wis: 6,
    cha: 0,
  },
  skills: [],
  // startingEquipment: {
  //   weapons: [
  //     {
  //       ID: '1',
  //       quantity: 1,
  //     },
  //   ],
  // },
}

export default dummyCharacter
