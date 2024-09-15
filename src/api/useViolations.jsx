import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";
import { da } from "date-fns/locale";
import helper from "../components/common/data/helper";

const useViolations = () => {
  const axiosPrivate = useAxiosPrivate(); // Use the useAxiosPrivate hook

  const {
    violations,
    violationsListLoading,
    setViolationsListLoading,
    violationsList,
    setViolationsList,
    setViolationsLoading,
    setViolations,
    paidList,
    setPaidList,
    paidListLoading,
    setPaidListLoading,
    violationAnalytics,
    setviolationAnalytics,
  } = useData();
  const [error, setError] = useState(null);
  //  violations data
  useEffect(() => {
    const fetchData = async () => {
      setViolationsLoading(true);
      try {
        const response = await axiosPrivate.get("/violation");

        setViolations(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setViolationsLoading(false);
      }
    };

    fetchData();
  }, []);

  //kind of violation list
  useEffect(() => {
    const fetchData = async () => {
      setViolationsListLoading(true);
      try {
        const response = await axiosPrivate.get("/violation/list");

        setViolationsList(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setViolationsListLoading(false);
      }
    };

    fetchData();
  }, []);

  // paid list
  useEffect(() => {
    const fetchData = async () => {
      setPaidListLoading(true);
      try {
        const response = await axiosPrivate.get("/violation/paid");
        setPaidList(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setPaidListLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const update = async () => {
      try {
        const response = await axiosPrivate.get("violation/analytics");

        setviolationAnalytics(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    update();
  }, []);

  return { violationsList, violationsListLoading, error };
};

export default useViolations;
