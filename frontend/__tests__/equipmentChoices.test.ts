import determineEquipmentChoices from '../src/equipmentChoices'

const expected = [
  [
    // Option 1
    {
      text: 'Greataxe',
      amount: 1,
    },
    // Option 2 (select)
    {
      text: 'Any Martial Melee Weapon',
      choices: ['Short Sword', 'Battle Axe', 'Maul', 'Pike', 'Lance', 'Whip'],
      amount: 1,
    },
  ],
]

describe('determineEquipmentChoices', () => {
  it('should return choices, given a character class', () => {
    expect(determineEquipmentChoices('barbarian')).toEqual(
      expect.arrayContaining(expected)
    )
  })
})
