import React, { useState, useCallback } from "react";

//questo hook fa delle richieste al backend con i dati inseriti
export function useHttp<T,R>(reqFunction:(req:T)=>Promise<R>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const sendRequest = async (
    payload:T,
    applyData: (data:R) => void
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await reqFunction(payload);
      applyData(response);
      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      setError(err || "è avvenuto un errore");
    }
  };
  const requestFunction = useCallback(sendRequest, []);
  return [error, isLoading, requestFunction];
};
