import React, { useReducer } from "react";
// type Reducer<S, A> = (prevState: S, action: A) => S;
type Validator = (value: string) => boolean;
type State = { value: string; isTouched: boolean };
type Action =
  | { type: "INPUT"; value: string }
  | { type: "BLUR" }
  | { type: "RESET" };
const initialInputState: State = {
  value: "",
  isTouched: false,
};

function reducer(state: State, action: Action): State {
  if (action.type === "INPUT") {
    return { isTouched: state.isTouched, value: action.value };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return initialInputState;
}

export const useInput = (validator: Validator) => {
  const [inputState, dispatch] = useReducer(reducer, initialInputState);

  const valueIsValid = validator(initialInputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const changeValueHandler = (value: string) => {
    dispatch({ type: "INPUT", value: value });
  };

  const blurInputHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const resetInputHanler = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    hasError,
    changeValueHandler,
    blurInputHandler,
    resetInputHanler,
  };
};
