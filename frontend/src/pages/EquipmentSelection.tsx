import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks'

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
import { CharClassGearPack } from './gql-types/CharClassGearPack'

const EquipmentSelection: React.FC<RouteComponentProps> = ({ history }) => {
  const { character, setCharacter } = useCharacter()
  const [choices, setChoices] = useState([])
  const [form, setForm] = useState<{ [key: string]: IEquipment }>({})
  const [getCharClassGearPack, { data, loading, error }] = useLazyQuery<
    CharClassGearPack
  >(CHARCLASS_GEAR_PACK, {
    variables: { ID: defaultGearPack[character.charClass.name].ID },
  })

  useEffect(() => {
    // this relies on `character` being loaded from useCharacter()
    getCharClassGearPack()
    determineEquipmentChoices(character.charClass.name).then(setChoices)
  }, [])

  const onSubmit = () => {
    const chosenWeapons = Object.values(form)
      .filter((equipment) => equipment.tableName === 'Weapon')
      .map((weapon) => ({ ID: weapon.ID, quantity: weapon.quantity }))
    const defaultWeapons = defaultEquipment[character.charClass.name]
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

  if (loading) {
    return <h1>Loading ...</h1>
  }

  if (error) {
    return <h1>An Error Occured: {JSON.stringify(error)}</h1>
  }

  return (
    <section>
      <CharacterTitles />

      <h3>Default Starting Equipment</h3>
      {defaultEquipment[character.charClass.name].map((equipment) => {
        return <p key={equipment.text}>{equipment.text}</p>
      })}

      {data && (
        <section>
          <h4>{data.gearPack.name} containing:</h4>
          <ul>
            {data.gearPack.items.map((item) => (
              <li key={item.ID}>{item.name}</li>
            ))}
          </ul>
        </section>
      )}

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
          ID
          name
          type
        }
        ... on AdventuringGear {
          ID
          name
          description
        }
        ... on Tool {
          ID
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
