import React from 'react'
import styled from 'styled-components'

const ActivityButton: React.FC<IProps> = ({
  disabled = false,
  handleClick,
  children,
}) => (
  <StyledActivityButton disabled={disabled} onClick={handleClick}>
    <span className="border-top-left" />
    <span className="border-left" />
    <span className="border-bottom-left" />
    <span className="border-bottom-right" />
    <span className="border-right-bottom" />
    <span className="border-right-top" />
    <span className="border-top-right" />
    {children}
  </StyledActivityButton>
)

const StyledActivityButton = styled.button`
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.outline : theme.colors.primary};
  /* text-shadow: 0 0 1px #fff; */
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  padding: 10px;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;

  .border-top-left {
    background: ${({ theme }) =>
      `linear-gradient(to right, ${theme.colors.primary}, transparent)`};
    position: absolute;
    top: 0;
    left: 0;
    height: 2px;
    width: 50%;
    animation: glow-top-left 3s alternate infinite;
  }

  .border-left {
    background: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.colors.primary}, transparent)`};
    position: absolute;
    top: 0;
    left: 0;
    height: 200%;
    width: 2px;
    animation: glow-left 3s alternate infinite;
  }

  .border-bottom-left {
    background: ${({ theme }) =>
      `linear-gradient(to right, ${theme.colors.primary}, transparent)`};
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 70%;
    animation: glow-bottom-left 3s alternate infinite;
  }

  .border-bottom-right {
    background: ${({ theme }) =>
      `linear-gradient(to left, ${theme.colors.primary}, transparent)`};
    position: absolute;
    bottom: 0;
    right: 0;
    height: 2px;
    width: 70%;
    animation: glow-bottom-right 3s alternate infinite;
  }

  .border-right-bottom {
    background: ${({ theme }) =>
      `linear-gradient(to top, ${theme.colors.primary}, transparent)`};
    position: absolute;
    bottom: 0;
    right: 0;
    height: 40%;
    width: 2px;
    animation: glow-right-bottom 3s alternate infinite;
  }

  .border-top-right {
    background: ${({ theme }) =>
      `linear-gradient(to left, ${theme.colors.primary}, transparent)`};
    position: absolute;
    top: 0;
    right: 0;
    height: 2px;
    width: 60%;
    animation: glow-top-right 3s alternate infinite;
  }

  .border-right-top {
    background: ${({ theme }) =>
      `linear-gradient(to bottom, ${theme.colors.primary}, transparent)`};
    position: absolute;
    top: 0;
    right: 0;
    height: 60%;
    width: 2px;
    animation: glow-right-top 3s alternate infinite;
  }

  @keyframes glow-top-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes glow-left {
    0% {
      transform: translateY(-25%);
    }
    100% {
      transform: translateY(-50%);
    }
  }

  @keyframes glow-bottom-left {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(-90%);
    }
  }

  @keyframes glow-right-bottom {
    0% {
      transform: translateY(40%);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes glow-right-top {
    0% {
      transform: translateY(-70%);
    }
    100% {
      transform: translateY(-50%);
    }
  }

  @keyframes glow-top-right {
    0% {
      transform: translateX(70%);
    }
    100% {
      transform: translateX(60%);
    }
  }

  @keyframes glow-bottom-right {
    0% {
      transform: translateX(50%);
    }
    100% {
      transform: translateX(0);
    }
  }
`

interface IProps {
  children: string
  disabled?: boolean
  handleClick(): void
}

export default ActivityButton
