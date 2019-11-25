import styled from 'styled-components'

export const ListWrapper = styled.div`
  padding: 20px;
`

export const Proficiency = styled.div<{ proficient: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  text-transform: uppercase;

  .name {
    flex: 1;
    text-align: right;
    margin-right: 20px;
  }

  .value {
    font-size: 20px;
    color: ${({ theme, proficient }) =>
      proficient ? theme.colors.primary : 'white'};
  }
`
