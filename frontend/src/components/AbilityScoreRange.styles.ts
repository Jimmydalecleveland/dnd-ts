import styled from 'styled-components'

export const Wrapper = styled.section`
  display: flex;
  align-items: center;
`

export const ModifierHexagon = styled.div<{ modifier: number }>`
  display: flex;
  width: 48px;
  height: 54px;
  margin-top: -5px;

  svg {
    polygon {
      fill: transparent;
      stroke: ${({ theme }) => theme.colors.outline};
      stroke-width: 5;
    }

    text {
      fill: ${({ theme, modifier }) => {
        if (modifier > 0) {
          return theme.colors.highlight
        } else if (modifier < 0) {
          return theme.colors.negative
        }
        return 'white'
      }};
      font-size: 62px;
      font-weight: 600;
    }
  }
`

export const Main = styled.div`
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
    line-height: 0.6;
    font-weight: bold;
  }

  .name {
    color: ${({ theme }) => theme.colors.outline};
    font-size: 20px;
    text-transform: uppercase;
  }

  .score {
    color: white;
    margin-left: auto;
    font-size: 22px;
  }
`

export const Divider = styled.hr`
  background-color: ${({ theme }) => theme.colors.outline};
  position: relative;
  margin: 4px 0 9px;
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
    /* half + padding-left of ScoreBlockGrid */
    transform: translateX(-50% + 9px);
    width: 0;
    height: 0;
  }
`

export const Adjusters = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  margin-left: 14px;

  button {
    padding: 4px 10px;
    margin-bottom: 8px;
    font-size: 24px;
    font-weight: bold;
    line-height: 1;
    color: white;
    background-color: transparent;
    border: solid 2px ${({ theme }) => theme.colors.outline};

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`

export const ScoreBlockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-column-gap: 3px;
  padding-left: 8px;
`

export const ScoreBlock = styled.span<{ index: number; score: number }>`
  border: solid 2px white;
  display: flex;
  height: 12px;
  position: relative;
  margin-right: ${(props) => (props.index === 4 ? '1px' : '0')};
  margin-left: ${(props) => (props.index === 5 ? '1px' : '0')};

  &.positive::after {
    content: '';
    position: absolute;
    width: calc(100% + 4px);
    height: 4px;
    bottom: -12px;
    left: -2px;

    background-color: ${({ theme }) => theme.colors.highlight};
  }

  &.negative::after {
    content: '';
    position: absolute;
    width: calc(100% + 3px);
    height: 4px;
    bottom: -12px;
    left: -2px;

    background-color: ${({ theme }) => theme.colors.negative};
  }

  .half-block-left {
    flex: 1;
    background-color: ${(props) =>
      (props.index + 1) * 2 - 1 <= props.score ? 'white' : 'transparent'};
  }

  .half-block-right {
    flex: 1;
    background-color: ${(props) =>
      (props.index + 1) * 2 <= props.score ? 'white' : 'transparent'};
  }
`
