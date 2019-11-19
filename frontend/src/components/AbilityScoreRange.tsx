import React from 'react'
import * as Styled from './AbilityScoreRange.styles'

const AbilityScoreRange = ({
  ability,
  score = 10,
  updateAbilityScore,
}: IProps) => {
  const modifier = Math.floor((score - 10) / 2)

  const createScoreBlocks = () => {
    return [...Array(10)].map((_, index) => (
      <Styled.ScoreBlock
        key={index}
        className={
          index > 4 && (index + 1) * 2 <= score
            ? 'positive'
            : index <= 4 && (index + 1) * 2 > score
            ? 'negative'
            : ''
        }
        index={index}
        score={score}
      >
        <span className="half-block-left" />
        <span className="half-block-right" />
      </Styled.ScoreBlock>
    ))
  }

  return (
    <Styled.Wrapper>
      <Styled.ModifierHexagon modifier={modifier}>
        <svg width="auto" height="100%" viewBox="0 0 114 120">
          <polygon points="60,120 112,90 112,30 60,0 8,30 8,90"></polygon>
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle">
            {modifier >= 0 && '+'}
            {modifier}
          </text>
        </svg>
      </Styled.ModifierHexagon>

      <Styled.Main>
        <div className="name-and-score">
          <p className="name">{ability}</p>
          <p className="score">{score}</p>
        </div>
        <Styled.Divider></Styled.Divider>
        <Styled.ScoreBlockGrid>{createScoreBlocks()}</Styled.ScoreBlockGrid>
      </Styled.Main>

      <Styled.Adjusters>
        <button
          disabled={score >= 20 && true}
          onClick={() => updateAbilityScore(ability, score + 1)}
        >
          +
        </button>
        <button
          disabled={score <= 0 && true}
          onClick={() => updateAbilityScore(ability, score - 1)}
        >
          -
        </button>
      </Styled.Adjusters>
    </Styled.Wrapper>
  )
}

interface IProps {
  ability: string
  score?: number
  updateAbilityScore(ability: string, score: number): void
}
export default AbilityScoreRange
