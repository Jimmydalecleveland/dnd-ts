import React, { useState, useEffect } from 'react'

import { useCharacter } from '../context'
import CharacterTitles from '../components/CharacterTitles'
import determineEquipmentChoices from '../equipmentChoices'
import ActivityButton from '../components/ActivityButton'
import { IWeapon } from '../interfaces'

const EquipmentSelection = () => {
  const { character, setCharacter } = useCharacter()
  const [choices, setChoices] = useState([])
  const [form, setForm] = useState<{ [key: string]: IWeapon }>({})

  useEffect(() => {
    determineEquipmentChoices(character.charClass.name).then(setChoices)
  }, [])

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(Object.values(form))
    setCharacter({ ...character, startingEquipment: Object.values(form) })
  }

  console.log(form)
  return (
    <section>
      <CharacterTitles />
      {choices.length > 0 && (
        <form onSubmit={onSubmit}>
          {choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
              <h3>Choose one:</h3>
              {choice.map(
                (option: {
                  tableName: string
                  text: string
                  amount: number
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
                    {option.choices && (
                      <select>
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
          <ActivityButton>Submit</ActivityButton>
        </form>
      )}
    </section>
  )
}

export default EquipmentSelection
