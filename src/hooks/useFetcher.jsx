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
        console.log({error});
      setIsError(true);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetcher();
  }, [...keys]);

  return { data, isLoading, isError };
}
