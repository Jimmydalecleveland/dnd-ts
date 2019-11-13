import { generateSkillSet } from '../src/pages/SkillSelection'
import {
  Skills_race_skills,
  Skills_background_skills,
} from '../src/graphql-types'

describe('generateSkillSet', () => {
  const abilityScores = {
    str: 20,
    dex: 8,
    con: 11,
    int: 15,
    wis: 18,
    cha: 12,
  }

  const raceSkills: Skills_race_skills[] = [
    { __typename: 'Skill', ID: '12', name: 'perception' },
  ]
  const backgroundSkills: Skills_background_skills[] = [
    { __typename: 'Skill', ID: '7', name: 'insight' },
  ]
  const charClassSkills: string[] = ['2']

  test('should return array of skills with proper values', () => {
    const skillSet = generateSkillSet(abilityScores, {
      skills: [
        { __typename: 'Skill', ID: '1', name: 'arcana', ability: 'int' },
      ],
      raceSkills,
      backgroundSkills,
      charClassSkills,
    })

    expect(skillSet).toContainEqual({
      ID: '1',
      name: 'arcana',
      proficient: false,
      value: 2,
    })
  })

  test('should apply proficiency bonus when class skill is chosen', () => {
    const skillSet = generateSkillSet(abilityScores, {
      skills: [
        { __typename: 'Skill', ID: '1', name: 'arcana', ability: 'int' },
      ],
      raceSkills,
      backgroundSkills,
      charClassSkills: ['1'],
    })

    expect(skillSet).toContainEqual({
      ID: '1',
      name: 'arcana',
      proficient: true,
      value: 4,
    })
  })

  test('should apply proficiency bonus when chosen race has skill', () => {
    const skillSet = generateSkillSet(abilityScores, {
      skills: [
        { __typename: 'Skill', ID: '12', name: 'perception', ability: 'wis' },
      ],
      raceSkills,
      backgroundSkills,
      charClassSkills,
    })

    expect(skillSet).toContainEqual({
      ID: '12',
      name: 'perception',
      proficient: true,
      value: 6,
    })
  })

  test('should apply proficiency bonus when chosen background has skill', () => {
    const skillSet = generateSkillSet(abilityScores, {
      skills: [
        { __typename: 'Skill', ID: '7', name: 'insight', ability: 'wis' },
      ],
      raceSkills,
      backgroundSkills,
      charClassSkills,
    })

    expect(skillSet).toContainEqual({
      ID: '7',
      name: 'insight',
      proficient: true,
      value: 6,
    })
  })

  test('should work when no race skills exist', () => {
    const skillSet = generateSkillSet(abilityScores, {
      skills: [
        { __typename: 'Skill', ID: '7', name: 'insight', ability: 'wis' },
      ],
      raceSkills: [],
      backgroundSkills,
      charClassSkills,
    })

    expect(skillSet).toContainEqual({
      ID: '7',
      name: 'insight',
      proficient: true,
      value: 6,
    })
  })
})
