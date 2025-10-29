import { useState, useEffect } from "react";
import api from "../services/api";

export default function useApi(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get(endpoint);
      setData(res.data);
    } catch (err) {
      setError(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [endpoint]);
  return { data, loading, error, refetch: fetchData };
}
