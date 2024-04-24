import { useState } from "react";

// Custom hook for managing owner information
export const useOwnerInformation = () => {
  const [ownerFname, setOwnerFname] = useState("");
  const [ownerLname, setOwnerLname] = useState("");
  const [ownerMI, setOwnerMI] = useState("");
  const [ownerAddress, setOwnerAddress] = useState("");
  const [ownerContact, setOwnerContact] = useState("");

  return {
    ownerFname,
    setOwnerFname,
    ownerLname,
    setOwnerLname,
    ownerMI,
    setOwnerMI,
    ownerAddress,
    setOwnerAddress,
    ownerContact,
    setOwnerContact,
  };
};

// Custom hook for managing driver information
export const useDriverInformation = () => {
  const [driverFullname, setDriverFullname] = useState("");
  const [driverAddress, setDriverAddress] = useState("");
  const [driverContact, setDriverContact] = useState("");

  return {
    driverFullname,
    setDriverFullname,
    driverAddress,
    setDriverAddress,
    driverContact,
    setDriverContact,
  };
};

// Custom hook for managing vehicle information
export const useVehicleInformation = () => {
  const [model, setModel] = useState("");
  const [plateno, setPlateno] = useState("");
  const [motorno, setMotorno] = useState("");
  const [stroke, setStroke] = useState("");
  const [chasisno, setChasisno] = useState("");
  const [fueldisp, setFueldisp] = useState("");
  const [OR, setOR] = useState("");
  const [CR, setCR] = useState("");
  const [tplProvider, setTplProvider] = useState("");
  const [tplDate1, setTplDate1] = useState(null);
  const [tplDate2, setTplDate2] = useState(null);

  return {
    model,
    setModel,
    plateno,
    setPlateno,
    motorno,
    setMotorno,
    stroke,
    setStroke,
    chasisno,
    setChasisno,
    fueldisp,
    setFueldisp,
    OR,
    setOR,
    CR,
    setCR,
    tplProvider,
    setTplProvider,
    tplDate1,
    setTplDate1,
    tplDate2,
    setTplDate2,
  };
};

// Custom hook for managing franchise information
export const useFranchiseInformation = () => {
  const [typeOfFranchise, setTypeOfFranchise] = useState("");
  const [kindOfBusiness, setKindOfBusiness] = useState("");
  const [toda, setToda] = useState("");
  const [route, setRoute] = useState("");
  const [remarks, setRemarks] = useState("");
  const [complaints, setComplaints] = useState("");
  const [dateReleaseOfSTTP, setDateReleaseOfSTTP] = useState(null);

  return {
    dateReleaseOfSTTP,
    setDateReleaseOfSTTP,
    typeOfFranchise,
    setTypeOfFranchise,
    kindOfBusiness,
    setKindOfBusiness,
    toda,
    setToda,
    route,
    setRoute,
    remarks,
    setRemarks,
    complaints,
    setComplaints,
  };
};

export default {
  useOwnerInformation,
  useDriverInformation,
  useVehicleInformation,
  useFranchiseInformation,
};
