import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

// const allWeapons = WEAPONS_QUERY()
// const allMartialWeapons = MARTIAL_WEAPONS_QUERY()

// const equipmentChoices = {
//   barbarian: [
//     [
//       { amount: 1, info: allWeapons.Greataxe },
//       { amount: 1, info:  allMartialWeapons, multipleChoice: true },
//     ],
//     [
//       { amount: 2, name: 'Handaxe' },
//       { amount: 1, name: 'Simple Weapon' },
//     ],
//   ],
// }

const equipmentChoices: { [key: string]: any[] } = {
  barbarian: [
    // choose one
    [
      // Choice 1
      {
        text: 'Greataxe',
        amount: 1,
      },
      // Choice 2 (select)
      {
        text: 'Any Martial Melee Weapon',
        choices: ['Short Sword', 'Battle Axe', 'Maul', 'Pike', 'Lance', 'Whip'],
        amount: 1,
      },
    ],
  ],
}

function determineEquipmentChoices(charClassName: string): any {
  return equipmentChoices[charClassName]
  // return equipmentChoices[charClassName].map(choice => {
  //   if (choice.multipleChoice) {
  //     return //select input
  //   }

  //   return choice.name
  // })
}

// const WEAPON_QUERY = gql`
//   query Weapon($weaponName: String!) {
//     weapon(name: $weaponName)
//     ID
//     name
//     damage
//   }
// `

export default determineEquipmentChoices
