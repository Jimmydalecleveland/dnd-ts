export function getModifier(ability: number): number {
  return Math.floor((ability - 10) / 2)
}
