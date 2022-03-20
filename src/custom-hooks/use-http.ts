import React, { useState, useCallback } from "react";

//questo hook fa delle richieste al backend con i dati inseriti
export function useHttp<T,R>(reqFunction:(req:T)=>Promise<R>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  const sendRequest = async (
    payload:T,
    applyData: (data:R) => void
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("richiesta:")
      console.log(payload);
      const response = await reqFunction(payload);
      console.log({response});
      applyData(response);
      setIsLoading(false);

    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if(err instanceof Error){
        setError(err.message );
      }
      else {
        setError("è avvenuto un errore!")
      }
    }
  };
  const sendHttpRequest = useCallback(sendRequest, []);
  return {error, isLoading, sendRequest:sendHttpRequest};
};
