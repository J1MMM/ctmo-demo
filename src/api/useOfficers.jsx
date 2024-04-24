import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";
import { da } from "date-fns/locale";
import helper from "../components/common/data/helper";

const useOfficers = () => {
  const axiosPrivate = useAxiosPrivate(); // Use the useAxiosPrivate hook

  const {
    officers,
    setOfficers,
    officersLoading,
    setOfficersLoading,
    setOfficersNames,
    violations,
  } = useData();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOfficers = async () => {
      setOfficersLoading(true);
      console.log("get officers");
      try {
        const response = await axiosPrivate.get("/officers");
        setOfficers(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setOfficersLoading(false);
      }
    };

    fetchOfficers();
  }, [axiosPrivate, violations]);

  useEffect(() => {
    const getOfficersNames = () => {
      setOfficersNames(() => {
        return officers.map((data) => {
          return data?.fullname || "";
        });
      });
    };
    getOfficersNames();
  }, [officers]);

  return { officers, officersLoading, error };
};

export default useOfficers;
