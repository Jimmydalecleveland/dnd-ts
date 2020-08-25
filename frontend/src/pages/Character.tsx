import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { RouteComponentProps } from 'react-router-dom'

import {
  CharacterPageQuery,
  CharacterPageQueryVariables,
  CharacterPageQuery_character_armor,
} from './gql-types/CharacterPageQuery'
import { getModifier } from '../utils/helpers'
import { SectionHeader } from '../components/SectionHeader.styles'
import CharacterTitles from '../components/CharacterTitles'
import ProficiencyList from '../components/ProficiencyList'
import SavingThrowList from '../components/SavingThrowList'
import ActivityButton from '../components/ActivityButton'
import getAC from '../utils/getAC'

const Character = ({ match, history }: RouteComponentProps<IProps>) => {
  const [equippedArmor, setEquippedArmor] = useState<CharacterPageQuery_character_armor | undefined>()

  const { id: characterID } = match.params
  const { loading, data } = useQuery<
    CharacterPageQuery,
    CharacterPageQueryVariables
  >(CHARACTER_PAGE_QUERY, {
    variables: {
      ID: characterID,
    },
  })
  const [deleteCharacter] = useMutation<{}, { ID: string }>(DELETE_CHARACTER, {
    onCompleted: () => history.push('/characters'),
    variables: { ID: characterID },
  })
  const [setDeathSaveSuccesses] = useMutation(UPDATE_DEATH_SAVE_SUCCESSES)
  const [setDeathSaveFailures] = useMutation(UPDATE_DEATH_SAVE_FAILURES)

  if (loading) {
    return <p>loading...</p>
  }

  if (!data.character) {
    return (
      <p>
        No character with ID <strong>&quot;{characterID}&quot;</strong> exists
      </p>
    )
  }

  console.log(data.character)

  const {
    name,
    race,
    subrace,
    charClass,
    background,
    abilityScores,
    skills,
    weapons,
    armor,
    tools,
    adventuringGear,
    customItems,
    maxHP,
    HP,
    tempHP,
    cp,
    sp,
    gp,
    ep,
    pp,
    deathsaves
  } = data.character

  const levelSpecifics = charClass.levelSpecifics[0]
  // TODO: temp until charClass levels are in DB
  const charClassLevel = charClass.level
  const features = charClass.features.filter(
    (feature) => feature.classLevel <= charClassLevel
  )
  const { str, dex, wis, cha, int, con } = abilityScores
  const strModifier = getModifier(str)
  const dexModifier = getModifier(dex)
  const wisModifier = getModifier(wis)
  const chaModifier = getModifier(cha)
  const intModifier = getModifier(int)
  const conModifier = getModifier(con)

  return (
    <div>
      <CharacterTitles
        charName={name}
        race={race.name}
        subrace={subrace && subrace.name}
        charClass={charClass.name}
        background={background.name}
      />

      <section>
        <SectionHeader>Calculated Stats</SectionHeader>
        <h3>Level: {charClassLevel}</h3>
        <h3>Speed: {subrace ? subrace.speed : race.speed}</h3>
        <h3>Hit Die: {charClass.hitDice}</h3>
        <h3>Total Hit Dice: {charClassLevel}</h3>
        <h3>Max HP: {maxHP}</h3>
        <h3>HP: {HP}</h3>
        <h3>Temporary HP: {tempHP || '0'}</h3>
        <h3>Proficiency Bonus: {levelSpecifics.proficiencyBonus}</h3>
        <h3>AC: {getAC(dexModifier, equippedArmor)}</h3>
        <h3>Passive Perception: {10 + wisModifier}</h3>
        <h3>Initiative: +{dexModifier}</h3>
        <h3>Death Saving Throws:</h3>
        <h4>Successes: {deathsaves.successes}</h4>
        <button onClick={() => setDeathSaveSuccesses({ variables: { ID: characterID, deathsaveSuccesses: 1  }})}>1</button>
        <button onClick={() => setDeathSaveSuccesses({ variables: { ID: characterID, deathsaveSuccesses: 2  }})}>2</button>
        <button onClick={() => setDeathSaveSuccesses({ variables: { ID: characterID, deathsaveSuccesses: 3  }})}>3</button>
        <h4>Failures: {deathsaves.failures}</h4>
        <button onClick={() => setDeathSaveFailures({ variables: { ID: characterID, deathsaveFailures: 1 }})}>1</button>
        <button onClick={() => setDeathSaveFailures({ variables: { ID: characterID, deathsaveFailures: 2 }})}>2</button>
        <button onClick={() => setDeathSaveFailures({ variables: { ID: characterID, deathsaveFailures: 3 }})}>3</button>
      </section>

      <section>
        <SectionHeader>Ability Scores</SectionHeader>
        {Object.entries(abilityScores).map((ability) => {
          if (ability[0] === '__typename') {
            return
          }
          return (
            <p key={ability[0]}>
              {ability[0]}: {ability[1]}
            </p>
          )
        })}
      </section>

      {/* TODO: Saving throws */}
      <section>
        <SectionHeader>Saving Throws</SectionHeader>
        <SavingThrowList
          list={{
            proficiencies: charClass.savingThrowProficiencies,
            characterAbilityScores: abilityScores,
          }}
        ></SavingThrowList>
      </section>

      <section>
        <ProficiencyList
          list={{
            characterAbilityScores: abilityScores,
            skills: data.skills,
            backgroundSkills: background.skills,
            raceSkills: race.skills,
            charClassSkills: skills,
          }}
        ></ProficiencyList>
      </section>

      <section>
        <SectionHeader>Currency</SectionHeader>
        <p>cp: {cp}</p>
        <p>sp: {sp}</p>
        <p>gp: {gp}</p>
        <p>ep: {ep}</p>
        <p>pp: {pp}</p>
      </section>

      <section>
        <SectionHeader>Equipment</SectionHeader>
        <h3>Weapons</h3>
        {weapons.map((weapon) => (
          <p key={weapon.ID}>
            {weapon.quantity}x {weapon.name}
          </p>
        ))}
        <h3>Armor</h3>
        {armor.map((singleArmor) => (
          <p key={singleArmor.ID}>
            {singleArmor.quantity}x {singleArmor.name}
            {equippedArmor && equippedArmor.ID === singleArmor.ID ? (
              <button onClick={() => setEquippedArmor(null)}>Unequip</button>
            ) : (
              <button onClick={() => setEquippedArmor(singleArmor)}>
                Equip
              </button>
            )}
          </p>
        ))}
        <h3>Adventuring Gear</h3>
        {adventuringGear.map((singleAdventuringGear) => (
          <p key={singleAdventuringGear.ID}>
            {singleAdventuringGear.quantity}x {singleAdventuringGear.name}
          </p>
        ))}
        <h3>Tools</h3>
        {tools.map((tool) => (
          <p key={tool.ID}>
            {tool.quantity}x {tool.name}
          </p>
        ))}
        <h3>Custom Items</h3>
        {customItems.map((customItem) => (
          <p key={customItem.ID}>
            {customItem.quantity}x {customItem.name}
          </p>
        ))}
      </section>

      <section>
        <SectionHeader>Class Features</SectionHeader>
        {features.map((feature) => (
          <div key={feature.ID}>
            <h3>{feature.name}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      <ActivityButton handleClick={() => deleteCharacter()}>
        Delete
      </ActivityButton>
    </div>
  )
}

interface IProps {
  id: string
}

const CHARACTER_PAGE_QUERY = gql`
  query CharacterPageQuery($ID: ID!) {
    character(ID: $ID) {
      ID
      name
      maxHP
      HP
      tempHP
      cp
      sp
      gp
      ep
      pp
      abilityScores {
        str
        dex
        wis
        cha
        int
        con
      }
      race {
        ID
        name
        speed
        skills {
          ID
          name
          ability
        }
      }
      subrace {
        ID
        name
        speed
      }
      charClass {
        ID
        level
        name
        numSkillProficiencies
        savingThrowProficiencies
        hitDice
        features {
          ID
          name
          description
          classLevel
        }
        levelSpecifics {
          classLevel
          proficiencyBonus
        }
      }
      background {
        ID
        name
        skills {
          ID
          name
          ability
        }
      }
      skills {
        ID
        name
        ability
      }
      weapons {
        ID
        name
        type
        cost
        weight
        damage
        skillType
        rangeType
        quantity
      }
      armor {
        ID
        name
        type
        category
        ac
        isDexAdded
        maxDex
        cost
        weight
        quantity
      }
      customItems {
        ID
        type
        name
        quantity
      }
      adventuringGear {
        ID
        name
        type
        cost
        weight
        category
        categoryDescription
        quantity
      }
      tools {
        ID
        name
        type
        cost
        weight
        category
        description
        quantity
      }
      deathsaves {
        successes
        failures
      }
    }
    skills {
      ID
      name
      ability
    }
  }
`

const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($ID: ID!) {
    deleteCharacter(ID: $ID)
  }
`

const UPDATE_DEATH_SAVE_SUCCESSES = gql`
  mutation UpdateDeathSaveSuccesses($ID: ID!, $deathsaveSuccesses: Int) {
    updateCharacter(ID: $ID, deathsaves: $deathsaves)
  }
`

const UPDATE_DEATH_SAVE_FAILURES = gql`
  mutation UpdateDeathSaveFailures($ID: ID!, $deathsaveFailures: Int) {
    updateCharacter(ID: $ID, deathsaves: $deathsaves)
  }
`


export default Character
