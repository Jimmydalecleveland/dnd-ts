import { gql } from 'apollo-boost'
import client from './apolloClient'
import logger from './logger'

async function determineEquipmentChoices(charClassName: string): Promise<any> {
  let allMartialMeleeWeapons

  try {
    const {
      data: { weapons },
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

    allMartialMeleeWeapons = weapons
  } catch (error) {
    logger('allMartialMeleeWeapons query returned an error', error)
  }

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
