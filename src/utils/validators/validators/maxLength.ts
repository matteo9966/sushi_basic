export function maxLength( length: number) {
  return (param: string) => param.length <= length
}
