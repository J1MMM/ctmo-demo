import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import BorderBox from "../../common/ui/BorderBox";
import dayjs from "dayjs";
import bg from "../../../assets/images/mayors-permit-bg.png";
import flag from "../../../assets/images/mayors-permit-flag.png";
import sun from "../../../assets/images/mayors-permit-sun.png";
import logo from "../../../assets/images/mayors-permit-logo.png";

const FormContent = ({ franchiseDetails, datenow }) => {
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
          {dayjs(datenow).format("DD/MM/YYYY")}
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
      <Typography fontFamily="serif" fontWeight="bold" textAlign="center">
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
        p={1}
        width={100}
        ml="auto"
        mr="auto"
      >
        <Typography
          fontSize={12}
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

      <Box display="flex" mt={2}>
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
        mt={1}
        borderBottom={"1px solid"}
        width="100%"
        display={"flex"}
        justifyContent={"space-around"}
      >
        <Typography
          fontFamily="Arial"
          textAlign={"center"}
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
      <Typography fontFamily="Arial" fontStyle="italic" mt={2}>
        has been granted PERMIT to operate the Motorized Vehicle herein
        indicated for the year of issue, in compliance to the provisions of
        Ordinance No. 2011-01, as amended. SUBJECT to such other pertinent laws,
        ordinances and related administrative implementary regulations.
      </Typography>
      <Box display={"flex"} width={"100%"} alignItems={"center"}>
        <Box
          border="2px solid #1B98EC"
          bgcolor="white"
          boxSizing={"border-box"}
          p={1}
        >
          <Box display="grid" gridTemplateColumns={"50% 50%"}>
            <Box display={"flex"}>
              <Typography fontWeight="bold" fontFamily={"Arial"} fontSize={14}>
                MAKE:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={14}
                  ml={1}
                >
                  {/* {franchiseDetails?.model} */}
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"}>
              <Typography
                fontWeight="bold"
                fontFamily={"Arial"}
                fontSize={14}
                minWidth={100}
              >
                CHASSIS NO:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={14}
                  ml={1}
                >
                  {franchiseDetails?.chassisno}
                </Typography>
              </Box>
            </Box>

            <Box display={"flex"}>
              <Typography fontWeight="bold" fontFamily={"Arial"} fontSize={14}>
                MODEL:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={14}
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
                fontSize={14}
                minWidth={80}
              >
                PLATE NO:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={14}
                  ml={1}
                >
                  {franchiseDetails?.plateno}
                </Typography>
              </Box>
            </Box>

            <Box display={"flex"}>
              <Typography
                fontWeight="bold"
                fontFamily={"Arial"}
                fontSize={14}
                minWidth={90}
              >
                MOTOR NO:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={14}
                  ml={1}
                >
                  {franchiseDetails?.motorno}
                </Typography>
              </Box>
            </Box>
            <Box display={"flex"}>
              <Typography
                fontWeight="bold"
                fontFamily={"Arial"}
                fontSize={14}
                minWidth={105}
              >
                AMOUNT PAID:
              </Typography>
              <Box borderBottom={"1px solid"} width={"100%"}>
                <Typography
                  fontWeight="bold"
                  fontFamily={"Arial"}
                  fontSize={14}
                  ml={1}
                >
                  385.00
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"}>
            <Typography
              fontWeight="bold"
              fontFamily={"Arial"}
              fontSize={14}
              minWidth={220}
            >
              KIND BUSINESS/OCCUPATION:
            </Typography>
            <Box borderBottom={"1px solid"} width={"100%"}>
              <Typography
                fontWeight="bold"
                fontFamily={"Arial"}
                fontSize={14}
                ml={1}
              >
                {franchiseDetails?.kindofBusiness}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"}>
            <Typography fontWeight="bold" fontFamily={"Arial"} fontSize={14}>
              REMARKS:
            </Typography>
            <Box borderBottom={"1px solid"} width={"100%"}>
              <Typography
                fontWeight="bold"
                fontFamily={"Arial"}
                fontSize={14}
                ml={1}
              >
                {franchiseDetails?.remarks}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box display={"flex"} width={"100%"} flexDirection={"column"} gap={4}>
          <Box>
            <Typography
              fontFamily={"serif"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              HON. VICENTE B. AMANTE
            </Typography>
            <Typography
              mt={-0.5}
              fontSize={10}
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
              sx={{
                position: "relative",
                "::before": {
                  content: '""',
                  width: "80%",
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
              fontSize={10}
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
        mt={1}
        fontFamily={"Arial"}
      >
        Valid until{" "}
        <span
          style={{
            borderBottom: "1px solid",
            minWidth: 50,
            display: "inline-block",
          }}
        ></span>{" "}
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
    const { franchiseDetails } = this.props;
    const datenow = new Date();

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
              top: 0,
              objectFit: "contain",
              height: "2.88in",
              width: "3.19in",
              zIndex: -1,
            }}
          />
          <img
            src={logo}
            alt=""
            style={{
              position: "absolute",
              right: 30,
              top: 0,
              objectFit: "contain",
              height: "1.77in",
              width: "1.77in",
              zIndex: -1,
            }}
          />

          <FormContent franchiseDetails={franchiseDetails} datenow={datenow} />
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
              top: 0,
              objectFit: "contain",
              height: "2.88in",
              width: "3.19in",
            }}
          />
          <img
            src={logo}
            alt=""
            style={{
              position: "absolute",
              right: 30,
              top: 0,
              objectFit: "contain",
              height: "1.77in",
              width: "1.77in",
            }}
          />

          <FormContent franchiseDetails={franchiseDetails} datenow={datenow} />
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
