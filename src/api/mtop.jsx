import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";

const useMTOP = () => {
  const axiosPrivate = useAxiosPrivate(); // Use the useAxiosPrivate hook

  const {
    franchises,
    availableMTOP,
    setAvailableMTOP,
    availableMTOPLoading,
    setAvailableMTOPLoading,
  } = useData();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMTOP = async () => {
      setAvailableMTOPLoading(true);
      console.log("get MTOP");
      try {
        const response = await axiosPrivate.get("/franchise/available");
        setAvailableMTOP(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setAvailableMTOPLoading(false);
      }
    };

    fetchMTOP();
  }, [axiosPrivate, franchises]); // Ensure axiosPrivate is included as a dependency

  return { availableMTOP, availableMTOPLoading, error };
};

export default useMTOP;
