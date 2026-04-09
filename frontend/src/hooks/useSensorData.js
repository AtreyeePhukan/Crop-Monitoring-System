import { useState, useEffect } from "react";

const REFRESH_INTERVAL = 30000; 

const useSensorData = () => {
  const [data, setData] = useState({
    soil: null,
    temperature: null,
    humidity: null,
    light: null,
    status: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/data`);
      const json = await response.json();

      if (json.error) {
        setError(json.error);
      } else {
        setData({
          soil: json.soil,
          temperature: json.temperature,
          humidity: json.humidity,
          light: json.light,
          status: json.status,
        });
        setLastUpdated(new Date());
        setError(null);
      }
    } catch (err) {
      setError("Could not reach the server. Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // fetch immediately on mount

    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return { data, loading, error, lastUpdated };
};

export default useSensorData;