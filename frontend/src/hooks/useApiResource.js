import { useEffect, useState } from "react";

export default function useApiResource(loader, fallback = null) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    loader()
      .then((result) => active && setData(result))
      .catch((err) => active && setError(err))
      .finally(() => active && setLoading(false));

    return () => { active = false; };
  }, [loader]);

  return { data, loading, error };
}