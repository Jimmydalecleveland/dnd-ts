import React, { useState, useEffect } from 'react'

import { useCharacter } from '../context'
import CharacterTitles from '../components/CharacterTitles'
import determineEquipmentChoices from '../equipmentChoices'

const EquipmentSelection = () => {
  const { character } = useCharacter()
  const [choices, setChoices] = useState([])

  useEffect(() => {
    determineEquipmentChoices(character.charClass.name).then(setChoices)
  })

  return (
    <section>
      <CharacterTitles />
      {choices.length > 0 && (
        <div>
          {choices.map((choice, choiceIndex) => (
            <form key={choiceIndex}>
              <h3>Choose one:</h3>
              {choice.map(
                (option: { text: string; amount: number; choices?: [] }) => (
                  <div key={option.text}>
                    <input
                      type="radio"
                      id={option.text}
                      value={option.text}
                      name={choiceIndex.toString()}
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
            </form>
          ))}
        </div>
      )}
    </section>
  )
}

export default EquipmentSelection
