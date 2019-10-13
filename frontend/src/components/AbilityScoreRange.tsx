import React from 'react'
import styled from 'styled-components'

const AbilityScoreRange = ({
  ability,
  score = 10,
  updateAbilityScore,
}: IProps) => {
  const modifier = Math.floor((score - 10) / 2)

  const createPointBlocks = () => {
    return [...Array(10)].map((slot, index) => (
      <span
        key={index}
        style={{
          display: 'flex',
          border: 'solid 2px white',
          height: 12,
          borderColor:
            index > 4 && (index + 1) * 2 <= score ? 'goldenrod' : 'white',
        }}
        className="filled"
      >
        <span
          style={{
            flex: 1,
            backgroundColor:
              (index + 1) * 2 - 1 <= score ? 'white' : 'transparent',
          }}
          data-attribute-block={`${ability}${index + 1}`}
        />
        <span
          style={{
            flex: 1,
            backgroundColor: (index + 1) * 2 <= score ? 'white' : 'transparent',
          }}
          data-attribute-block={`${ability}${index + 1}`}
        />
      </span>
    ))
  }

  return (
    <Wrapper>
      <ModifierHexagon modifier={modifier}>
        {modifier >= 0 && '+'}
        {modifier}
      </ModifierHexagon>

      <Main>
        <div className="name-and-score">
          <h3 className="name">{ability}</h3>
          <h3 className="score">{score}</h3>
        </div>
        <Divider></Divider>
        <ScoreBlocks>{createPointBlocks()}</ScoreBlocks>
      </Main>

      <Adjusters>
        <button onClick={() => updateAbilityScore(ability, score + 1)}>
          +
        </button>
        <button onClick={() => updateAbilityScore(ability, score - 1)}>
          -
        </button>
      </Adjusters>
    </Wrapper>
  )
}

interface IProps {
  ability: string
  score?: number
  updateAbilityScore(ability: string, score: number): void
}

const Wrapper = styled.section`
  display: flex;
  align-items: center;
`

const ModifierHexagon = styled.div<{ modifier: number }>`
  color: ${({ modifier }) => {
    if (modifier > 0) {
      return 'goldenrod'
    } else if (modifier < 0) {
      return 'orangered'
    }
    return 'white'
  }};
  width: 40px;
  font-size: 26px;
  font-weight: bold;
`

const Main = styled.div`
  flex: 1;
  margin: 16px 0;

  .name-and-score {
    display: flex;
    align-items: flex-end;
    padding-left: 8px;
  }

  .name,
  .score {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .name {
    color: ${({ theme }) => theme.colors.outline};
  }

  .score {
    color: white;
    margin-left: auto;
  }
`

const Divider = styled.hr`
  background-color: ${({ theme }) => theme.colors.outline};
  position: relative;
  margin: 5px 0 7px;
  border: none;
  height: 1px;

  &::after {
    border-top: solid 6px ${({ theme }) => theme.colors.outline};
    border-left: solid 4px transparent;
    border-right: solid 4px transparent;
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
  }
`

const Adjusters = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 14px;
`

const ScoreBlocks = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-column-gap: 3px;
  padding-left: 8px;
`

export default AbilityScoreRange
