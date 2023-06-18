import React, { useEffect, useState, useCallback } from "react";

const useHttp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const commDB = useCallback(async (requestConfig, postProcess) => {
    setIsLoading(true);
    setError(null);
    // postProcess({ isSending: isLoading });

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      });

      if (!response.ok) {
        console.log(error);
        throw new Error("Something went wrong while fetching meals.");
      }
      const data = await response.json();

      postProcess(data);
    } catch (error) {
      if (error.message === "Failed to fetch") {
        setError("Unknown error has occured!!!");
      } else {
        setError(error.message);
      }
    }
    setIsLoading(false);
  }, []);

  return {
    commDB,
    isLoading,
    error,
  };
};

export default useHttp;
