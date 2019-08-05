import React from 'react'
import styled, { css, keyframes } from 'styled-components'

const ActivityButton: React.FC<IProps> = ({
  disabled = false,
  handleClick,
  children,
}) => (
  <StyledActivityButton disabled={disabled} onClick={handleClick}>
    <span className="border border-top-left" />
    <span className="border border-left" />
    <span className="border border-bottom-left" />
    <span className="border border-bottom-right" />
    <span className="border border-right-bottom" />
    <span className="border border-right-top" />
    <span className="border border-top-right" />
    {children}
  </StyledActivityButton>
)

const glowTopLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`

const glowLeft = keyframes`
  0% {
    transform: translateY(-25%);
  }
  100% {
    transform: translateY(-50%);
  }
`

const glowBottomLeft = keyframes`
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(-90%);
  }
`

const glowTopRight = keyframes`
  0% {
    transform: translateX(70%);
  }
  100% {
    transform: translateX(60%);
  }
`

const glowRightTop = keyframes`
  0% {
    transform: translateY(-70%);
  }
  100% {
    transform: translateY(-50%);
  }
`

const glowRightBottom = keyframes`
  0% {
    transform: translateY(40%);
  }
  100% {
    transform: translateY(0);
  }
`

const glowBottomRight = keyframes`
  0% {
    transform: translateX(50%);
  }
  100% {
    transform: translateX(0);
  }
`

const StyledActivityButton = styled.button(({ theme, disabled }) => {
  return css`
    color: ${disabled ? theme.colors.outline : theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
    border: none;
    padding: 10px;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 500;

    .border {
      display: ${disabled ? 'none' : 'block'};
    }

    .border-top-left {
      background: linear-gradient(
        to right,
        ${theme.colors.primary},
        transparent
      );
      position: absolute;
      top: 0;
      left: 0;
      height: 2px;
      width: 50%;
      animation: ${glowTopLeft} 3s alternate infinite;
    }

    .border-left {
      background: linear-gradient(
        to bottom,
        ${theme.colors.primary},
        transparent
      );
      position: absolute;
      top: 0;
      left: 0;
      height: 200%;
      width: 2px;
      animation: ${glowLeft} 3s alternate infinite;
    }

    .border-bottom-left {
      background: linear-gradient(
        to right,
        ${theme.colors.primary},
        transparent
      );
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 70%;
      animation: ${glowBottomLeft} 3s alternate infinite;
    }

    .border-bottom-right {
      background: linear-gradient(
        to left,
        ${theme.colors.primary},
        transparent
      );
      position: absolute;
      bottom: 0;
      right: 0;
      height: 2px;
      width: 70%;
      animation: ${glowBottomRight} 3s alternate infinite;
    }

    .border-right-bottom {
      background: linear-gradient(to top, ${theme.colors.primary}, transparent);
      position: absolute;
      bottom: 0;
      right: 0;
      height: 40%;
      width: 2px;
      animation: ${glowRightBottom} 3s alternate infinite;
    }

    .border-top-right {
      background: linear-gradient(
        to left,
        ${theme.colors.primary},
        transparent
      );
      position: absolute;
      top: 0;
      right: 0;
      height: 2px;
      width: 60%;
      animation: ${glowTopRight} 3s alternate infinite;
    }

    .border-right-top {
      background: linear-gradient(
        to bottom,
        ${theme.colors.primary},
        transparent
      );
      position: absolute;
      top: 0;
      right: 0;
      height: 60%;
      width: 2px;
      animation: ${glowRightTop} 3s alternate infinite;
    }

    ${!disabled &&
      css`
        &:hover {
          &::before {
            transform: translateX(100%);
          }
        }

        &::before {
          content: '';
          z-index: 1;
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent,
            ${theme.colors.primaryTransparent},
            transparent
          );
          transform: translateX(-100%);
          transition: transform 0.4s;
        }
      `}
  `
})

interface IProps {
  children: string
  disabled?: boolean
  handleClick(): void
}

export default ActivityButton
