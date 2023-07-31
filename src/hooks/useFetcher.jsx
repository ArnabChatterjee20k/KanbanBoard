import { useEffect, useState } from "react";

export default function useFetcher(queryFunc, keys = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  async function fetcher() {
    setIsLoading(true);
    try {
      const res = await queryFunc();
      setData(res);
    } catch (error) {
        setIsError(true);
        throw new Error(error)
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetcher();
  }, [...keys]);

  return { data, isLoading, isError };
}
