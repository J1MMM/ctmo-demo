import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import BorderBox from "../../common/ui/BorderBox";
import dayjs from "dayjs";
import bg from "../../../assets/images/mayors-permit-bg.png";
import flag from "../../../assets/images/mayors-permit-flag.png";
import sun from "../../../assets/images/mayors-permit-sun.png";
import logo from "../../../assets/images/mayors-permit-logo.png";
import mayorSign from "../../../assets/images/mayor-sign.png";

function getMonthName(monthNumber) {
  const monthNames = [
    "Oct", // 0 maps to October
    "Jan", // 1 maps to January
    "Feb", // 2 maps to February
    "Mar", // 3 maps to March
    "Apr", // 4 maps to April
    "May", // 5 maps to May
    "Jun", // 6 maps to June
    "Jul", // 7 maps to July
    "Aug", // 8 maps to August
    "Sept", // 9 maps to September
  ];

  if (monthNumber < 0 || monthNumber > 9) {
    return "Invalid month number";
  }

  return `${monthNames[monthNumber]}`;
}

function getLastDigit(plateNumber) {
  // Iterate from the end of the string to the beginning
  for (let i = plateNumber.length - 1; i >= 0; i--) {
    // Check if the current character is a digit
    if (!isNaN(plateNumber[i]) && plateNumber[i] !== " ") {
      return plateNumber[i];
    }
  }
  // If no digit is found, return an appropriate message or value
  return "No digit found";
}

const FormContent = ({
  franchiseDetails,
  datenow,
  total,
  validDate,
  model,
}) => {
  return (
    <Box my={1} mx={5} position="relative">
      <Typography
        fontSize={12}
        color="red"
        fontStyle="italic"
        fontFamily="Arial"
        sx={{ position: "absolute" }}
      >
        OR # {franchiseDetails?.paymentOr}
      </Typography>
      <Box
        border="2px solid #1B98EC"
        borderRadius={2}
        position="absolute"
        top={30}
        boxSizing="border-box"
        px={1}
      >
        <Typography
          fontSize={12}
          fontFamily="Arial"
          textAlign="center"
          fontWeight="bold"
          width={100}
        >
          {dayjs(franchiseDetails?.paymentOrDate).format("MM/DD/YYYY")}
        </Typography>
        <Typography
          fontFamily="Arial"
          textAlign="center"
          fontWeight="bold"
          width={100}
          fontSize={12}
          sx={{
            borderTop: "1px solid",
          }}
        >
          DATE ISSUED
        </Typography>
      </Box>
      <Typography
        fontFamily="serif"
        fontWeight="bold"
        textAlign="center"
        mt={2}
      >
        Republic of the Philippines
      </Typography>
      <Typography
        fontFamily="serif"
        fontWeight="bold"
        textAlign="center"
        mt={-0.5}
      >
        CITY OF SAN PABLO
      </Typography>
      <Typography
        fontFamily="serif"
        fontWeight="bold"
        textAlign="center"
        mt={-0.5}
      >
        OFFICE OF THE CITY MAYOR
      </Typography>
      <Typography
        mt={-1}
        variant="h6"
        fontFamily="Arial"
        fontWeight="900"
        textAlign="center"
      >
        MAYOR’S PERMIT
      </Typography>

      <Box
        border="2px solid #1B98EC"
        borderRadius={2}
        boxSizing="border-box"
        p={0.5}
        width={100}
        ml="auto"
        mr="auto"
      >
        <Typography
          fontSize={18}
          fontFamily="Arial"
          textAlign="center"
          fontWeight="bold"
          sx={{ borderBottom: "1px solid" }}
          mx={1}
        >
          {franchiseDetails?.mtop}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        textAlign="center"
        fontFamily="serif"
        fontWeight={"bold"}
        fontSize={"8px"}
      >
        MAYOR’S PERMIT and
      </Typography>
      <Typography
        variant="body2"
        textAlign="center"
        fontFamily="serif"
        fontWeight="bold"
        fontSize={"8px"}
      >
        MOTORIZED TRICYCLE OPERATORS PERMIT NUMBER
      </Typography>

      <Box display="flex" mt={1}>
        <Typography fontFamily="Arial" fontStyle="italic" minWidth={180}>
          THIS CERTIFIES that
        </Typography>
        <Box
          borderBottom={"1px solid"}
          width="100%"
          display={"flex"}
          justifyContent={"space-around"}
        >
          <Typography
            fontFamily="Arial"
            textAlign={"center"}
            fontSize={15}
            sx={{
              position: "relative",
              "::after": {
                content: '"(Name of Operator/Owner)"',
                fontSize: "8px",
                minWidth: 150,
                position: "absolute",
                bottom: -14,
                left: "50%",
                transform: "translate(-50%)",
              },
            }}
          >
            {franchiseDetails?.fname} {franchiseDetails?.mi}{" "}
            {franchiseDetails?.lname}
          </Typography>
          <Typography
            fontFamily="Arial"
            textAlign={"center"}
            fontSize={15}
            sx={{
              position: "relative",
              "::after": {
                content: '"(Nationality)"',
                fontSize: "8px",
                minWidth: 150,
                position: "absolute",
                bottom: -14,
                left: "50%",
                transform: "translate(-50%)",
              },
            }}
          >
            FILIPINO
          </Typography>
        </Box>
      </Box>
      <Box
        mt={1.5}
        borderBottom={"1px solid"}
        width="100%"
        display={"flex"}
        justifyContent={"space-around"}
      >
        <Typography
          fontFamily="Arial"
          textAlign={"center"}
          fontSize={15}
          sx={{
            position: "relative",
            "::after": {
              content: '"(T.O.D.A.)"',
              fontSize: "8px",
              minWidth: 150,
              position: "absolute",
              bottom: -14,
              left: "50%",
              transform: "translate(-50%)",
            },
          }}
        >
          {franchiseDetails?.toda}
        </Typography>
        <Typography
          fontFamily="Arial"
          textAlign={"center"}
          fontSize={15}
          sx={{
            position: "relative",
            "::after": {
              content: '"Home Address"',
              fontSize: "8px",
              minWidth: 150,
              position: "absolute",
              bottom: -14,
              left: "50%",
              transform: "translate(-50%)",
            },
          }}
        >
          {franchiseDetails?.address}
        </Typography>
      </Box>
      <Typography
        fontFamily="Arial"
        fontStyle="italic"
        mt={1.5}
        lineHeight={"19px"}
      >
        has been granted PERMIT to operate the Motorized Vehicle herein
        indicated for the year of issue, in compliance to the provisions of
        Ordinance No. 2011-01, as amended. SUBJECT to such other pertinent laws,
        ordinances and related administrative implementary regulations.
      </Typography>
      <Box display={"flex"} width={"100%"} alignItems={"center"} mt={1}>
        <Box
          border="2px solid #1B98EC"
          bgcolor="white"
          boxSizing={"border-box"}
          p={1}
          minWidth={450}
        >
          <Box display="grid" gridTemplateColumns={"50% 50%"}>
            <Box display={"flex"}>
              <Typography fontWeight="bold" fontFamily={"Arial"} fontSize={12}>
                MAKE:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={12}
                  ml={1}
                >
                  {franchiseDetails?.model}
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"}>
              <Typography
                fontWeight="bold"
                fontFamily={"Arial"}
                fontSize={12}
                minWidth={80}
              >
                CHASSIS NO:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={12}
                  ml={1}
                >
                  {franchiseDetails?.chassisno}
                </Typography>
              </Box>
            </Box>

            <Box display={"flex"}>
              <Typography fontWeight="bold" fontFamily={"Arial"} fontSize={12}>
                MODEL:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={12}
                  ml={1}
                >
                  {franchiseDetails?.model}
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"}>
              <Typography
                fontWeight="bold"
                fontFamily={"Arial"}
                fontSize={12}
                minWidth={70}
              >
                PLATE NO:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={12}
                >
                  {franchiseDetails?.plateno}
                </Typography>
              </Box>
            </Box>

            <Box display={"flex"}>
              <Typography
                fontWeight="bold"
                fontFamily={"Arial"}
                fontSize={12}
                minWidth={75}
              >
                MOTOR NO:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={12}
                >
                  {franchiseDetails?.motorno}
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"}>
              <Typography
                fontWeight="bold"
                fontFamily={"Arial"}
                fontSize={12}
                minWidth={105}
              >
                AMOUNT PAID:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={12}
                  ml={1}
                >
                  {total?.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"}>
            <Typography
              fontWeight="bold"
              fontFamily={"Arial"}
              fontSize={12}
              minWidth={190}
            >
              KIND BUSINESS/OCCUPATION:
            </Typography>
            <Box borderBottom={"1px solid"} width={"100%"}>
              <Typography fontWeight="bold" fontFamily={"Arial"} fontSize={12}>
                {franchiseDetails?.kindofBusiness}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"}>
            <Typography fontWeight="bold" fontFamily={"Arial"} fontSize={12}>
              REMARKS:
            </Typography>
            <Box borderBottom={"1px solid"} width={"100%"}>
              <Typography
                fontWeight="bold"
                fontFamily={"Arial"}
                fontSize={12}
                ml={1}
              >
                {franchiseDetails?.remarks}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          display={"flex"}
          width={"100%"}
          flexDirection={"column"}
          gap={10}
          mt={3}
        >
          <Box position={"relative"}>
            <Typography
              fontFamily={"serif"}
              fontWeight={"bold"}
              textAlign={"center"}
              fontSize={12}
            >
              HON. VICENTE B. AMANTE PhD
            </Typography>
            <img
              src={mayorSign}
              alt="sign"
              style={{
                maxWidth: 200,
                position: "absolute",
                top: -50,
                left: 50,
              }}
            />
            <Typography
              mt={-0.5}
              fontSize={8}
              fontFamily={"serif"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              CITY MAYOR
            </Typography>
          </Box>

          <Box>
            <Typography
              fontFamily={"serif"}
              fontWeight={"bold"}
              textAlign={"center"}
              fontSize={12}
              sx={{
                position: "relative",
                "::before": {
                  content: '""',
                  width: "60%",
                  position: "absolute",
                  borderTop: "1px solid",
                  left: "50%",
                  transform: "translate(-50%)",
                },
              }}
            >
              ORIA M. BAÑAGALE
            </Typography>
            <Typography
              mt={-0.5}
              fontSize={8}
              fontFamily={"serif"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              Chief, Licensing Officer IV
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography
        fontSize={8}
        textAlign={"center"}
        borderTop={"1px solid"}
        fontFamily={"Arial"}
      >
        Valid until
        <span
          style={{
            borderBottom: "1px solid",
            minWidth: 50,
            display: "inline-block",
          }}
        >
          {validDate}
        </span>{" "}
        in accordance with the renewal date of the motorcycle under the LTO Law
        following the year of its expiry and every year thereafter.
      </Typography>

      <Typography
        fontSize={8}
        textAlign={"center"}
        fontWeight={"bold"}
        fontFamily={"Arial"}
      >
        (To be posted inside tricycle sidecar)
      </Typography>
      <Typography
        fontSize={8}
        textAlign={"center"}
        fontFamily={"serif"}
        fontWeight={"bold"}
      >
        ANY ALTERATION AND/OR ERASURE WILL INVALID THIS PERMIT
      </Typography>
      <Typography fontSize={8} textAlign={"center"} fontFamily={"Arial"}>
        Tuloy-tuloy ang Pag-abante
      </Typography>
    </Box>
  );
};

class MayorPermitPrintable extends Component {
  render() {
    const { franchiseDetails, model } = this.props;
    const datenow = new Date();
    const nextYear = dayjs(datenow).add(1, "year").format("YYYY");
    const plateNo = franchiseDetails?.plateno;
    const lastDigit = getLastDigit(plateNo);
    const renewMonth = getMonthName(lastDigit);

    const validDate = `${renewMonth} ${nextYear}`;
    let total = 0;

    if (franchiseDetails) {
      total = franchiseDetails?.receiptData?.reduce(
        (total, obj) => total + obj?.price,
        0
      );
    }

    return (
      <Box
        border="1px solid transparent"
        width="8.5in"
        height="11in"
        position="relative"
        zIndex={1}
        display="grid"
        gridAutoRows="50% 50%"
        boxSizing="border-box"
      >
        <Box
          borderBottom="2px dashed"
          position="relative"
          boxSizing="border-box"
          overflow="hidden"
        >
          <img
            src={bg}
            alt=""
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              position: "absolute",
              zIndex: -1,
            }}
          />
          <img
            src={flag}
            alt=""
            style={{
              width: "45%",
              height: "115%",
              objectFit: "fill",
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: -1,
            }}
          />
          <img
            src={sun}
            alt=""
            style={{
              position: "absolute",
              right: 0,
              top: 10,
              objectFit: "contain",
              height: "2.3in",
              width: "2.5in",
              zIndex: -1,
            }}
          />
          <img
            src={logo}
            alt=""
            style={{
              position: "absolute",
              right: 30,
              top: 20,
              objectFit: "contain",
              height: "1.30in",
              width: "1.30in",
              zIndex: -1,
            }}
          />

          <FormContent
            franchiseDetails={franchiseDetails}
            datenow={datenow}
            total={total}
            validDate={validDate}
            model={model}
          />
          <Typography
            color="red"
            fontWeight="bold"
            fontSize="100px"
            fontFamily="Arial"
            sx={{
              rotate: "-15deg",
              position: "absolute",
              top: "31%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800,
              textAlign: "center",
              opacity: 0.1,
            }}
          >
            CMO’S COPY
          </Typography>
        </Box>
        <Box position="relative" boxSizing="border-box" overflow="hidden">
          <img
            src={bg}
            alt=""
            style={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
              position: "absolute",
            }}
          />
          <img
            src={flag}
            alt=""
            style={{
              width: "45%",
              height: "115%",
              objectFit: "fill",
              position: "absolute",
              right: 0,
              top: 0,
            }}
          />
          <img
            src={sun}
            alt=""
            style={{
              position: "absolute",
              right: 0,
              top: 5,
              objectFit: "contain",
              height: "2.3in",
              width: "2.6in",
            }}
          />
          <img
            src={logo}
            alt=""
            style={{
              position: "absolute",
              right: 30,
              top: 15,
              objectFit: "contain",
              height: "1.30in",
              width: "1.30in",
            }}
          />

          <FormContent
            franchiseDetails={franchiseDetails}
            datenow={datenow}
            total={total}
            validDate={validDate}
            model={model}
          />
          <Typography
            color="red"
            fontWeight="bold"
            fontSize="100px"
            fontFamily="Arial"
            sx={{
              rotate: "-15deg",
              position: "absolute",
              top: "31%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 900,
              textAlign: "center",
              opacity: 0.1,
            }}
          >
            OWNER’S COPY
          </Typography>
        </Box>
      </Box>
    );
  }
}

export default MayorPermitPrintable;
