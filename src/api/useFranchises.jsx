import { useCallback, useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useData from "../hooks/useData";
import helper from "../components/common/data/helper";
import { debounce } from "lodash";
import axios from "axios";

function removeEmptyStrings(array) {
  const filteredArray = array.filter((item) => item.trim() !== "");

  return filteredArray;
}

const useFranchises = () => {
  const axiosPrivate = useAxiosPrivate(); // Use the useAxiosPrivate hook
  const [error, setError] = useState(null);

  const {
    franchises,
    setFranchises,
    franchisesLoading,
    setFranchisesLoading,
    violations,
    setfranchiseAnalytics,
    pendingFranchises,
    setPendingFranchises,
    setPendingFranchisesPaid,
    pendingFranchisesLoading,
    setPendingFranchisesLoading,
    setPendingFranchisesPaidLoading,
    dummyVariable,
    setRowCount,
    page,
    pageSize,
    filterModel,
    sortModel,
    setSortModel,
  } = useData();

  const fetchFranchises = useCallback(
    async (cancelToken) => {
      setFranchisesLoading(true);
      const sortField = sortModel.length > 0 ? sortModel[0].field : "MTOP";
      const sortDirection = sortModel.length > 0 ? sortModel[0].sort : "asc";
      const safeFilters = filterModel || {};
      console.log("fetch");

      try {
        const response = await axiosPrivate.get("/franchise", {
          params: {
            page: page + 1,
            pageSize,
            filters: JSON.stringify(safeFilters),
            sortField,
            sortDirection,
          },
          cancelToken: cancelToken.token,
        });

        console.log(response);

        setFranchises(() => {
          return response.data?.rows.map((data) => {
            return helper.createClientsData(
              data._id || "",
              data.MTOP || "",
              data.LASTNAME || "",
              data.FIRSTNAME || "",
              data.MI || "",
              data.ADDRESS || "",
              data.OWNER_NO?.replace(/-/g, "").replace(/^0+/g, ""),
              data.DRIVERS_NO?.replace(/-/g, "").replace(/^0+/g, ""),
              data.TODA || "",
              data.DRIVERS_NAME || "",
              data.DRIVERS_ADDRESS || "",
              data.OR || "",
              data.CR || "",
              data.DRIVERS_LICENSE_NO || "",
              data.MAKE || "",
              data.MODEL || "",
              data.MOTOR_NO || "",
              data.CHASSIS_NO || "",
              data.PLATE_NO || "",
              data.STROKE || "",
              data.DATE_RENEWAL && new Date(data.DATE_RENEWAL),
              data.REMARKS || "",
              data.DATE_RELEASE_OF_ST_TP &&
                new Date(data.DATE_RELEASE_OF_ST_TP),
              removeEmptyStrings(data.COMPLAINT),
              data.DATE_ARCHIVED || "",
              data.OWNER_SEX || "",
              data.DRIVERS_SEX || "",
              data.TPL_PROVIDER || "",
              data.TPL_DATE_1 && new Date(data.TPL_DATE_1),
              data.TPL_DATE_2 && new Date(data.TPL_DATE_2),
              data.FUEL_DISP || "",
              data.TYPE_OF_FRANCHISE || "",
              data.KIND_OF_BUSINESS || "",
              data.ROUTE || "",
              data.PAID_VIOLATIONS,
              data.refNo,
              data.paymentOr,
              data.paymentOrDate,
              data.pending,
              data.transaction,
              data.receiptData,
              data.LTO_RENEWAL_DATE && new Date(data.LTO_RENEWAL_DATE),
              data.processedBy || "",
              data.collectingOfficer || "",
              data.MPreceiptData,
              data.MPpaymentOr,
              data.newOwner,
              data.newDriver,
              data.newMotor,
              data.newToda
            );
          });
        });
        setRowCount(response.data.totalRows);
      } catch (error) {
        setError(error);
      } finally {
        setFranchisesLoading(false);
      }
    },
    [page, pageSize, filterModel, sortModel] // dependencies
  );

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const debouncedFetch = debounce(() => fetchFranchises(cancelToken), 300); // 300ms debounce delay
    debouncedFetch(); // Call the debounced function

    // Cleanup to cancel debounce when component unmounts or dependencies change
    return () => {
      cancelToken.cancel("Operation canceled due to new request.");
      debouncedFetch.cancel();
    };
  }, [fetchFranchises]);

  useEffect(() => {
    const fetchFranchises = async () => {
      setPendingFranchisesLoading(true);
      try {
        const response = await axiosPrivate.get("/franchise/pending");
        setPendingFranchises(() => {
          return response.data?.map((data) => {
            return helper.createClientsData(
              data._id || "",
              data.MTOP || "",
              data.LASTNAME || "",
              data.FIRSTNAME || "",
              data.MI || "",
              data.ADDRESS || "",
              data.OWNER_NO?.replace(/-/g, "").replace(/^0+/g, ""),
              data.DRIVERS_NO?.replace(/-/g, "").replace(/^0+/g, ""),
              data.TODA || "",
              data.DRIVERS_NAME || "",
              data.DRIVERS_ADDRESS || "",
              data.OR || "",
              data.CR || "",
              data.DRIVERS_LICENSE_NO || "",
              data.MAKE || "",
              data.MODEL || "",
              data.MOTOR_NO || "",
              data.CHASSIS_NO || "",
              data.PLATE_NO || "",
              data.STROKE || "",
              data.DATE_RENEWAL && new Date(data.DATE_RENEWAL),
              data.REMARKS || "",
              data.DATE_RELEASE_OF_ST_TP &&
                new Date(data.DATE_RELEASE_OF_ST_TP),
              removeEmptyStrings(data.COMPLAINT),
              data.DATE_ARCHIVED || "",
              data.OWNER_SEX || "",
              data.DRIVERS_SEX || "",
              data.TPL_PROVIDER || "",
              data.TPL_DATE_1 && new Date(data.TPL_DATE_1),
              data.TPL_DATE_2 && new Date(data.TPL_DATE_2),
              data.FUEL_DISP || "",
              data.TYPE_OF_FRANCHISE || "",
              data.KIND_OF_BUSINESS || "",
              data.ROUTE || "",
              data.PAID_VIOLATIONS,
              data.refNo,
              data.paymentOr,
              data.paymentOrDate && new Date(data.paymentOrDate),
              data.pending,
              data.transaction,
              data.receiptData,
              data.LTO_RENEWAL_DATE && new Date(data.LTO_RENEWAL_DATE),
              data.processedBy || "",
              data.collectingOfficer || "",
              data.MPreceiptData,
              data.MPpaymentOr,
              data.newOwner,
              data.newDriver,
              data.newMotor,
              data.newToda
            );
          });
        });
      } catch (error) {
        setError(error);
      } finally {
        setPendingFranchisesLoading(false);
      }
    };

    fetchFranchises();
  }, []); // Ensure axiosPrivate is included as a dependency

  useEffect(() => {
    const fetchFranchisesPaid = async () => {
      setPendingFranchisesPaidLoading(true);
      try {
        const response = await axiosPrivate.get("/franchise/paid");
        setPendingFranchisesPaid(() => {
          return response.data?.map((data) => {
            return helper.createClientsData(
              data._id || "",
              data.MTOP || "",
              data.LASTNAME || "",
              data.FIRSTNAME || "",
              data.MI || "",
              data.ADDRESS || "",
              data.OWNER_NO?.replace(/-/g, "").replace(/^0+/g, ""),
              data.DRIVERS_NO?.replace(/-/g, "").replace(/^0+/g, ""),
              data.TODA || "",
              data.DRIVERS_NAME || "",
              data.DRIVERS_ADDRESS || "",
              data.OR || "",
              data.CR || "",
              data.DRIVERS_LICENSE_NO || "",
              data.MAKE || "",
              data.MODEL || "",
              data.MOTOR_NO || "",
              data.CHASSIS_NO || "",
              data.PLATE_NO || "",
              data.STROKE || "",
              data.DATE_RENEWAL && new Date(data.DATE_RENEWAL),
              data.REMARKS || "",
              data.DATE_RELEASE_OF_ST_TP &&
                new Date(data.DATE_RELEASE_OF_ST_TP),
              removeEmptyStrings(data.COMPLAINT),
              data.DATE_ARCHIVED || "",
              data.OWNER_SEX || "",
              data.DRIVERS_SEX || "",
              data.TPL_PROVIDER || "",
              data.TPL_DATE_1 && new Date(data.TPL_DATE_1),
              data.TPL_DATE_2 && new Date(data.TPL_DATE_2),
              data.FUEL_DISP || "",
              data.TYPE_OF_FRANCHISE || "",
              data.KIND_OF_BUSINESS || "",
              data.ROUTE || "",
              data.PAID_VIOLATIONS,
              data.refNo,
              data.paymentOr,
              data.paymentOrDate && new Date(data.paymentOrDate),
              data.pending,
              data.transaction,
              data.receiptData,
              data.LTO_RENEWAL_DATE && new Date(data.LTO_RENEWAL_DATE),
              data.processedBy || "",
              data.collectingOfficer || "",
              data.MPreceiptData,
              data.MPpaymentOr,
              data.newOwner,
              data.newDriver,
              data.newMotor,
              data.newToda
            );
          });
        });
      } catch (error) {
        setError(error);
      } finally {
        setPendingFranchisesPaidLoading(false);
      }
    };

    fetchFranchisesPaid();
  }, []);

  useEffect(() => {
    const update = async () => {
      try {
        const response = await axiosPrivate.get("franchise/analytics");

        setfranchiseAnalytics(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    update();
  }, []);

  return { franchises, franchisesLoading, error };
};

export default useFranchises;
