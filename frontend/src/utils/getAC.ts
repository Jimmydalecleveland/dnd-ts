import { CharacterPageQuery_character_armor } from '../pages/gql-types/CharacterPageQuery'

const getAC = (
  dexModifier: number,
  equippedArmor:
    | { ac: number; isDexAdded: boolean; maxDex: number | null }
    | undefined
    | null
): number => {
  // If this function was called without an equipped armor,
  // return the armorless ac value
  if (!equippedArmor) return dexModifier + 10

  let ac = equippedArmor.ac

  // If the armor adds the dexterity modifier, check if there is a
  // dexterity limit and add the appropriate bonus to ac.
  if (equippedArmor.isDexAdded) {
    if (equippedArmor.maxDex) {
      ac = ac + Math.min(dexModifier, equippedArmor.maxDex)
    } else {
      ac = ac + dexModifier
    }
  }

  return ac
}

export default getAC
