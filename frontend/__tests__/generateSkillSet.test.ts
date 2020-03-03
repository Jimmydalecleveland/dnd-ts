import { generateSkillSet } from '../src/components/ProficiencyList'
import { ISkill } from '../src/interfaces'

describe('generateSkillSet', () => {
  const skills = [
    {
      ID: "1",
      name: "arcana",
      ability: "int"
    },
    {
      ID: "2",
      name: "acrobatics",
      ability: "dex"
    },
    {
      ID: "3",
      name: "animal handling",
      ability: "wis"
    },
    {
      ID: "4",
      name: "athletics",
      ability: "str"
    },
  ]
  
  const characterAbilityScores = {
    str: 20,
    dex: 8,
    con: 11,
    int: 15,
    wis: 18,
    cha: 12,
  }

  test('should return array of skills with "proficient" and "value" keys added', () => {
    // no skills proficiencies are passed in (empty arrays) to ensure the function still
    // returns the proper shape
    const skillSet = generateSkillSet({
      characterAbilityScores,
      skills,
      raceSkills: [],
      backgroundSkills: [],
      charClassSkills: [],
    })

    // character int score of 15 gives a +2 modifier, with no proficiency
    // the value should remain 2
    expect(skillSet).toContainEqual({
      ID: '1',
      name: 'arcana',
      proficient: false,
      value: 2,
    })
  })

  test('should apply proficiency bonus when class skill proficiency is chosen', () => {
    const skillSet = generateSkillSet({
      characterAbilityScores,
      skills,
      raceSkills: [],
      backgroundSkills: [],
      charClassSkills: [
        {
          ID: "1",
          name: "arcana",
          ability: "int"
        },
      ],
    })

    // character int score of 15 gives a +2 modifier, plus 2 proficiency
    // at level 1 gives a value == 4
    expect(skillSet).toContainEqual({
      ID: '1',
      name: 'arcana',
      proficient: true,
      value: 4,
    })
  })

  test('should apply proficiency bonus when chosen race has skill proficiency', () => {
    const skillSet = generateSkillSet({
      characterAbilityScores,
      skills,
      raceSkills: [
        {
          ID: "2",
          name: "acrobatics",
          ability: "dex"
        },
      ],
      backgroundSkills: [],
      charClassSkills: [],
    })

    // character dex score of 8 gives a -1 modifier, plus 2 proficiency
    // at level 1 gives a value == 1
    expect(skillSet).toContainEqual({
      ID: '2',
      name: 'acrobatics',
      proficient: true,
      value: 1,
    })
  })

  test('should apply proficiency bonus when chosen background has skill proficiency', () => {
    const skillSet = generateSkillSet({
      characterAbilityScores,
      skills,
      raceSkills: [],
      backgroundSkills: [
        {
          ID: "3",
          name: "animal handling",
          ability: "wis"
        },
      ],
      charClassSkills: [],
    })

    // character wis score of 18 gives a +4 modifier, plus 2 proficiency
    // at level 1 gives a value == 6
    expect(skillSet).toContainEqual({
      ID: '3',
      name: 'animal handling',
      proficient: true,
      value: 6,
    })
  })

  test('should apply proficiency bonus when chosen background has multiple skill proficiencies', () => {
    const skillSet = generateSkillSet({
      characterAbilityScores,
      skills,
      raceSkills: [],
      backgroundSkills: [
        {
          ID: "3",
          name: "animal handling",
          ability: "wis"
        },
        {
          ID: "4",
          name: "athletics",
          ability: "str"
        },
      ],
      charClassSkills: [],
    })

    expect(skillSet).toEqual([
      {
        ID: '1',
        name: 'arcana',
        proficient: false,
        value: 2,
      },
      {
        ID: '2',
        name: 'acrobatics',
        proficient: false,
        value: -1,
      },
      {
        ID: '3',
        name: 'animal handling',
        proficient: true,
        value: 6,
      },
      {
        ID: "4",
        name: "athletics",
        proficient: true,
        value: 7,
      },
    ])
  })

  test('should apply proficiency bonus for all skill types', () => {
    const skillSet = generateSkillSet({
      characterAbilityScores,
      skills,
      raceSkills: [
        {
          ID: "2",
          name: "acrobatics",
          ability: "dex"
        },
      ],
      backgroundSkills: [
        {
          ID: "3",
          name: "animal handling",
          ability: "wis"
        },
      ],
      charClassSkills: [
        {
          ID: "1",
          name: "arcana",
          ability: "int"
        },
      ],
    })

    expect(skillSet).toEqual([
      {
        ID: '1',
        name: 'arcana',
        proficient: true,
        value: 4,
      },
      {
        ID: '2',
        name: 'acrobatics',
        proficient: true,
        value: 1,
      },
      {
        ID: '3',
        name: 'animal handling',
        proficient: true,
        value: 6,
      },
      {
        ID: "4",
        name: "athletics",
        proficient: false,
        value: 5,
      },
    ])
  })
})
