import React, { useState, useCallback } from "react";

//questo hook fa delle richieste al backend con i dati inseriti
export function useHttp<T,R>(reqFunction:(req:T)=>Promise<R|undefined>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const [success,setSuccess]=useState(false);
  const sendRequest = async (payload:T,applyData: (data:R) => void) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {

      const response = await reqFunction(payload);
      if(!response){
        throw new Error("Errore richiesta al server")
      }
     
      setIsLoading(false);
      applyData(response);
      setSuccess(true);

    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setSuccess(false);
      if(err instanceof Error){
        setError(err.message );
      }
      else {
        setError("è avvenuto un errore!")
      }
    }
  };
  const sendHttpRequest = useCallback(sendRequest, []);
  return {error, isLoading, sendRequest:sendHttpRequest,success};
};
