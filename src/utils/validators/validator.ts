export type validatorCallback = (param: string) => boolean;
export type Validator = (param: string, ...callbacks: validatorCallback[])=> boolean

export function validator(param: string, ...callbacks: validatorCallback[]) {
  let isValid = true;
  let i = 0;
  while (isValid && i < callbacks.length) {
    isValid = callbacks[i](param);
    i++
  }

  return isValid;
}
