import { gql } from 'apollo-boost'
import client from './apolloClient'
import logger from './logger'

async function determineEquipmentChoices(charClassName: string): Promise<any> {
  const {
    data: { weapons: allMartialMeleeWeapons },
  } = await client.query({
    query: gql`
      query AllMartialMeleeWeapons {
        weapons(filter: { skillType: "martial", rangeType: "melee" }) {
          ID
          name
        }
      }
    `,
  })

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
          choices: allMartialMeleeWeapons,
          amount: 1,
        },
      ],
    ],
  }

  console.log({ allMartialMeleeWeapons })

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
