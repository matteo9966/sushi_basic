import React, { useReducer } from "react";
import {validatorCallback,validator as validatorFunction} from '../utils/validators/validator';
// type Reducer<S, A> = (prevState: S, action: A) => S;

type State = { value: string; isTouched: boolean };
type Action =
  | { type: "INPUT"; value: string }
  | { type: "BLUR" }
  | { type: "RESET" }
  | { type: "FOCUS"};
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
  if (action.type === "FOCUS"){
    return {isTouched:false,value:state.value};
  }
  return initialInputState;
}

export const useInput = (...validatorCallback:validatorCallback[]) => {
  const [inputState, dispatch] = useReducer(reducer, initialInputState);

  const valueIsValid = validatorFunction(inputState.value,...validatorCallback); // se non passo dei callbacks restituisce sempre true

  const hasError = !valueIsValid && inputState.isTouched;

  const changeValueHandler = (event:  React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: "INPUT", value: event.currentTarget.value});
  };

  const blurInputHandler = () => {
    dispatch({ type: "BLUR" });
  };

  const resetInputHanler = () => {
    dispatch({ type: "RESET" });
  };

  const focusInputHandler = ()=>{
    dispatch({type:'FOCUS'});
  }

  return {
    value: inputState.value,
    hasError,
    changeValueHandler,
    blurInputHandler,
    resetInputHanler,
    focusInputHandler

  };
};
