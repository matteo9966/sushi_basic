import React, { useState, useEffect, useCallback } from "react";
export function useLocalStorage<T>(
  defaultValue: T,
  key: string
): [
  value: T,
  setValue: (value: T) => void,
  removeFromLocalStorage: () => void
] {
  const [value, setValue] = useState(() => { // inizializzo useState con 1 quello che trovo in memoria oppure qualcosa che è già salvato
    const objectInMemory = window.localStorage.getItem(key);
    if (objectInMemory) return JSON.parse(objectInMemory);
    if (typeof defaultValue === "function") return defaultValue();
    return defaultValue;
  });

  useEffect(() => {
    console.log({valoreInserito:value})
    if (value == undefined) {
      window.localStorage.removeItem(key);
    } else {
      const stringifiedValue = JSON.stringify(value);
      window.localStorage.setItem(key, stringifiedValue);
    }
  }, [value, key]);

  const removeFromLocalStorage = useCallback(() => {
    setValue(undefined);
  }, []);
  return [value, setValue, removeFromLocalStorage];
}
