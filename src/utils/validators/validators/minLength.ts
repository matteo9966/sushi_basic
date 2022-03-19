export function minLength( minLength: number) {
  return (param: string) => minLength <= param.length
}
