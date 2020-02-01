import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { RouteComponentProps } from 'react-router-dom'

import {
  CharacterPageQuery,
  CharacterPageQueryVariables,
} from './gql-types/CharacterPageQuery'
import { getModifier } from '../utils/helpers'
import { SectionHeader } from '../components/SectionHeader.styles'
import CharacterTitles from '../components/CharacterTitles'
import ProficiencyList from '../components/ProficiencyList'
import ActivityButton from '../components/ActivityButton'

const Character = ({ match, history }: RouteComponentProps<IProps>) => {
  const { id: characterID } = match.params
  const { loading, data } = useQuery<
    CharacterPageQuery,
    CharacterPageQueryVariables
  >(CHARACTER_PAGE_QUERY, {
    variables: {
      ID: characterID,
    },
  })
  const [deleteCharacter] = useMutation<{}, {ID: string}>(
    DELETE_CHARACTER,
    {
      onCompleted: () => history.push('/characters'),
      variables: { ID: characterID },
    }
  )

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
    cp,
    sp,
    gp,
    ep,
    pp,
  } = data.character

  const levelSpecifics = charClass.levelSpecifics[0]
  // TODO: temp until charClass levels are in DB
  const charClassLevel = 1
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
        <h3>Speed: {subrace ? subrace.speed : race.speed}</h3>
        <h3>Hit Die: {charClass.hitDice}</h3>
        <h3>Max HP: {maxHP}</h3>
        <h3>HP: {HP}</h3>
        <h3>Proficiency Bonus: {levelSpecifics.proficiencyBonus}</h3>
        <h3>AC: {10 + dexModifier}</h3>
        <h3>
          Passive Perception: {10 + wisModifier}
        </h3>
          <h3>Initiative: +{dexModifier}</h3>
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
          <div>
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
        name
        numSkillProficiencies
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

export default Character
