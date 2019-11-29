import { gql } from 'apollo-boost'
import client from './apolloClient'
import logger from './logger'

/**
 * Used for the first level equipment choices step in creating a character.
 * The GraphQL server will be hit for the various equipment types and a large
 * map (with each class as a key) will be used to look up the appropriate questions and options.
 * @param {string} charClassName  - The character class to look up
 */
async function determineEquipmentChoices(charClassName: string): Promise<any> {
  const allMartialMeleeWeapons = await getWeapons('martial', 'melee')
  const allSimpleWeapons = await getWeapons('simple')

  const equipmentChoices: { [key: string]: any[] } = {
    barbarian: [
      // choose one
      [
        // Option 1
        {
          text: 'a greataxe',
          amount: 1,
        },
        // Option 2 (select)
        {
          text: 'any martial melee weapon',
          amount: 1,
          choices: allMartialMeleeWeapons,
        },
      ],
      [
        {
          text: 'two handaxes',
          amount: 2,
        },
        {
          text: 'any simple weapon',
          amount: 1,
          choices: allSimpleWeapons,
        },
      ],
    ],
    bard: [
      // choose one
      [
        // Option 1
        {
          text: 'a rapier',
          amount: 1,
        },
        // Option 2
        {
          text: 'any simple weapon',
          amount: 1,
          choices: allSimpleWeapons,
        },
      ],
    ],
  }

  return equipmentChoices[charClassName]
}

/**
 *  Gets all weapons from the GraphQL server, and allows 2 filter options to be passed.
 * @param {string} skillType - "simple" or "martial"
 * @param {string} rangeType - "melee" or "ranged"
 */
async function getWeapons(
  skillType?: 'simple' | 'martial',
  rangeType?: 'melee' | 'ranged'
) {
  try {
    const {
      data: { weapons },
    } = await client.query({
      variables: {
        skillType,
        rangeType,
      },
      query: gql`
        query allWeaponsFiltered($skillType: String, $rangeType: String) {
          weapons(filter: { skillType: $skillType, rangeType: $rangeType }) {
            ID
            name
          }
        }
      `,
    })

    return weapons
  } catch (error) {
    logger('allMartialMeleeWeapons query returned an error', error)
  }
}

export default determineEquipmentChoices
