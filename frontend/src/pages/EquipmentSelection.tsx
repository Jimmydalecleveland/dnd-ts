import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

import { useCharacter } from '../context'
import CharacterTitles from '../components/CharacterTitles'
import {
  defaultEquipment,
  defaultGearPack,
  determineEquipmentChoices,
} from '../utils/equipmentChoices'
import ActivityButton from '../components/ActivityButton'
import { IEquipment } from '../interfaces'
import { gql } from 'apollo-boost'
import { CharClassGearPack_gearPack } from './gql-types/CharClassGearPack'

const EquipmentSelection: React.FC<RouteComponentProps> = ({ history }) => {
  const { character, setCharacter } = useCharacter()
  const [choices, setChoices] = useState([])
  const [form, setForm] = useState<{ [key: string]: IEquipment }>({})
  useEffect(() => {
    determineEquipmentChoices(character.charClass.name).then(setChoices)
  }, [])

  const { data, loading, error } = useQuery<CharClassGearPack_gearPack>(
    CHARCLASS_GEAR_PACK,
    {
      variables: { ID: defaultGearPack.ID },
    }
  )

  const onSubmit = () => {
    const chosenWeapons = Object.values(form)
      .filter((equipment) => equipment.tableName === 'Weapon')
      .map((weapon) => ({ ID: weapon.ID, quantity: weapon.quantity }))
    const defaultWeapons = defaultEquipment
      .filter((equipment) => equipment.tableName === 'Weapon')
      .map((weapon) => ({
        ID: weapon.ID,
        quantity: weapon.quantity,
      }))
    const weapons = [...chosenWeapons, ...defaultWeapons]

    // const armor = Object.values(form).filter(
    //   (equipment) => equipment.tableName === 'Armor'
    //   .map((armor) => ({ ID: armor.ID, quantity: armor.quantity }))
    // )
    setCharacter({ ...character, startingEquipment: { weapons } })
    history.push('/create-character/submit')
  }

  const isFormValid = () => {
    const formWithIDs = Object.values(form).filter((equipment) => equipment.ID)
    return choices.length > 0 && formWithIDs.length === choices.length
  }

  return (
    <section>
      <CharacterTitles />

      <h3>Default Starting Equipment</h3>
      {defaultEquipment.map((equipment) => {
        return <p key={equipment.text}>{equipment.text}</p>
      })}

      {data &&
        data.items.map((item) => {
          console.log(item)
          // switch(item.__typename) {
          //   case "AdventuringGear":
          // }
          return <p>{item.name}</p>
        })}

      {choices.length > 0 && (
        <form>
          {choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
              <h3>Choose one:</h3>
              {choice.map(
                (option: {
                  tableName: string
                  text: string
                  quantity: number
                  choices?: []
                }) => (
                  <div key={option.text}>
                    <input
                      type="radio"
                      id={option.text}
                      value={option.text}
                      name={choiceIndex.toString()}
                      onChange={() => {
                        setForm({
                          ...form,
                          [`choice${choiceIndex}`]: option,
                        })
                      }}
                      checked={
                        !form[`choice${choiceIndex}`]
                          ? false
                          : form[`choice${choiceIndex}`].text === option.text
                      }
                    />
                    <label htmlFor={option.text}>{option.text}</label>
                    {option.choices &&
                      form[`choice${choiceIndex}`] &&
                      form[`choice${choiceIndex}`].text === option.text && (
                        <select
                          defaultValue=""
                          onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                          ) =>
                            setForm({
                              ...form,
                              [`choice${choiceIndex}`]: {
                                ...form[`choice${choiceIndex}`],
                                ID: event.target.value,
                              },
                            })
                          }
                        >
                          <option value="" disabled>
                            ---
                          </option>
                          {option.choices.map(
                            (optionChoice: { ID: string; name: string }) => (
                              <option
                                key={optionChoice.ID}
                                value={optionChoice.ID}
                              >
                                {optionChoice.name}
                              </option>
                            )
                          )}
                        </select>
                      )}
                  </div>
                )
              )}
            </div>
          ))}
          <ActivityButton disabled={!isFormValid()} handleClick={onSubmit}>
            Submit
          </ActivityButton>
        </form>
      )}
    </section>
  )
}

const CHARCLASS_GEAR_PACK = gql`
  query CharClassGearPack($ID: ID!) {
    gearPack(ID: $ID) {
      name
      items {
        ... on CustomItem {
          name
          type
        }
        ... on AdventuringGear {
          name
          description
        }
        ... on Tool {
          name
          cost
          category
          description
        }
      }
    }
  }
`

export default EquipmentSelection
