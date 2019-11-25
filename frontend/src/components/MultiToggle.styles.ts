import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  gap: 5px;
  margin-bottom: 40px;
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Title = styled.h3`
  color: #fff;
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-align: center;

  span {
    font-size: 16px;
  }
`

export const RemainingHexagon = styled.div<{ remaining: number }>`
  display: flex;
  width: 48px;
  height: 54px;
  margin-top: -5px;
  margin-bottom: 20px;

  svg {
    polygon {
      fill: transparent;
      stroke: ${({ theme }) => theme.colors.outline};
      stroke-width: 5;
    }

    text {
      fill: ${({ theme, remaining }) =>
        remaining ? theme.colors.secondary : theme.colors.outline};
      font-size: 62px;
      font-weight: 600;
    }
  }
`
