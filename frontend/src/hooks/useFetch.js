import { useState, useEffect } from "react";

const useFetch = (url, token) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyBooking = async () => {
      try {
        const response = await fetch(`https://car-rental-mern.onrender.com/${url}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setData(data);
        setError(null);
        setIsPending(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setIsPending(false);
      }
    };

    fetchMyBooking();
  }, [url, token]);

  return { data, isPending, error };
};

export default useFetch;
