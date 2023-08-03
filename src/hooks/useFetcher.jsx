import { useEffect, useState } from "react";

export default function useFetcher(queryFunc, keys = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState([false,fetcher]); // isError , errorStatement
  async function fetcher() {
    setIsLoading(true);
    try {
      const res = await queryFunc();
      setData(res);
    } catch (error) {
        console.log({error});
        setError([true,error]);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetcher();
  }, [...keys]);

  return { data, isLoading, error };
}
