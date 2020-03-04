import getAC from '../src/utils/getAC'

describe('getAC', () => {
  test('should return raw AC if dex is not applicable', () => {
    expect(getAC(1, { ac: 11, isDexAdded: false, maxDex: null })).toBe(11)
  })

  test('should add dex modifier when applicable', () => {
    expect(getAC(1, { ac: 11, isDexAdded: true, maxDex: null })).toBe(12)
  })

  test('should limit added dex when maxDex value exists', () => {
    expect(getAC(4, { ac: 11, isDexAdded: true, maxDex: 2 })).toBe(13)
  })

  test('should subtract from AC when dex modifier is negative', () => {
    expect(getAC(-1, { ac: 11, isDexAdded: true, maxDex: 2 })).toBe(10)
  })

  test('should return default AC when no armor is passed', () => {
    expect(getAC(1, undefined)).toBe(11)
    expect(getAC(1, null)).toBe(11)
  })
})
