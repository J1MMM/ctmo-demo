import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";

const useTickets = () => {
  const axiosPrivate = useAxiosPrivate(); // Use the useAxiosPrivate hook

  const { ticketLoading, setTicketLoading, tickets, setTickets } = useData();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setTicketLoading(true);
      try {
        const response = await axiosPrivate.get("/ticket");

        setTickets(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setTicketLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tickets, ticketLoading, error };
};

export default useTickets;
