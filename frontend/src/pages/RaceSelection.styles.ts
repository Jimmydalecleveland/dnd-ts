import styled from 'styled-components'
import { motion } from 'framer-motion'

export const GridSection = styled.section`
  display: grid;
  grid-template-rows: 70px 1fr 1fr;
  height: 100%;
`

export const BottomWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr minmax(100px, 1fr);
  margin-top: auto;
  grid-gap: 10px;
  justify-content: space-between;
`

export const Input = styled.label`
  display: block;
  font-size: 20px;
  font-family: 'Segoe UI', sans-serif;
  font-weight: bold;

  input {
    width: 100%;
    background: transparent;
    border: solid 3px #737477;
    border: ${({ theme }) => `solid 1px ${theme.colors.outline}`};
    padding: 10px 20px;
    font-size: 22px;
    color: #fff;

    &:focus {
      border: solid 1px ${({ theme }) => theme.colors.primaryTransparent};
    }
  }
`

export const RaceList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5px;
  width: 100%;
  margin: 0 0 20px;
`

export const Modal = styled(motion.section)`
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.9);

  > .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    font-family: 'Barlow', sans-serif;
    font-weight: 900;
    font-size: 20px;
  }

  > div {
    padding: 20px;
    height: 100%;
    overflow-y: scroll;
    border: solid 1px ${({ theme }) => theme.colors.outline};
    background-image: linear-gradient(
      245deg,
      rgba(200, 200, 200, 0.1),
      rgb(0, 0, 0) 90%
    );
  }
`
