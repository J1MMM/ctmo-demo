import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import BorderBox from "../common/ui/BorderBox";
import dayjs from "dayjs";

const justifyCenter = { justifyContent: "center", border: "none" };
const justifyStart = { justifyContent: "start", border: "none" };

const receiptData = [
  { label: "Mayor's Permit", price: 385.0 },
  { label: "Franchise Tax", price: 110.0 },
  { label: "Health / S.S.F.", price: 63.8 },
  { label: "Sticker - Color Coding", price: 55.0 },
  { label: "Docket Fee", price: 27.5 },
  { label: "Filing Fee", price: 27.5 },
  { label: "Tin Plate", price: 330.0 },
  { label: "Registration Fee", price: 15.0 },
  { label: "Sticker for Garbage", price: 50.0 },
  { label: "Garbage Fee", price: 50.0 },
  { label: "Notarial Fee", price: 0.0 },
];

const totalAmount = receiptData?.reduce((total, obj) => total + obj?.price, 0);

class NewFranchise extends Component {
  render() {
    const { franchiseDetails, fullname } = this.props;
    const datenow = new Date();
    return (
      <BorderBox
        sx={{
          maxWidth: 430,
          flexDirection: "column",
          padding: 3,
          boxSizing: "borderbox",
          border: "none",
        }}
      >
        <BorderBox sx={justifyCenter}>
          <Typography
            variant="h6"
            fontFamily={"monospace"}
            textAlign="center"
            fontWeight="bold"
          >
            Tax Order
          </Typography>
        </BorderBox>
        <BorderBox sx={justifyCenter}>
          <Typography
            variant="h6"
            fontFamily={"monospace"}
            textAlign="center"
            fontWeight="bold"
            sx={{ mt: -1 }}
          >
            TRICYCLE FRANCHISE
          </Typography>
        </BorderBox>
        <BorderBox sx={justifyCenter}>
          <Typography
            variant="h6"
            fontFamily={"monospace"}
            textAlign="center"
            sx={{ textDecoration: "underline", mt: -1 }}
          >
            NEW
          </Typography>
        </BorderBox>
        <br />
        <BorderBox sx={justifyStart}>
          <Typography variant="h6" fontFamily={"monospace"} fontWeight="bold">
            NAME:
          </Typography>
        </BorderBox>
        <BorderBox sx={justifyCenter}>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mt: -1 }}
            fontFamily={"monospace"}
          >
            {franchiseDetails?.fname} {franchiseDetails?.mi}{" "}
            {franchiseDetails?.lname}
          </Typography>
        </BorderBox>
        <BorderBox sx={justifyStart}>
          <Typography variant="h6" fontFamily={"monospace"} fontWeight="bold">
            ADDRESS:
          </Typography>
        </BorderBox>
        <BorderBox sx={justifyCenter}>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mt: -1 }}
            fontFamily={"monospace"}
          >
            {franchiseDetails?.address}
          </Typography>
        </BorderBox>
        <br />
        {receiptData?.map((item, index) => {
          return (
            <BorderBox
              key={index}
              sx={{ ...justifyStart, justifyContent: "space-between" }}
            >
              <Typography
                variant="h6"
                fontFamily={"monospace"}
                fontWeight="bold"
              >
                {item?.label}
              </Typography>
              <Typography variant="h6" fontFamily="monospace">
                {item?.price?.toLocaleString("en", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </BorderBox>
          );
        })}

        <BorderBox
          sx={{ justifyContent: "flex-end", alignItems: "end", border: "none" }}
        >
          <Box borderTop="2px solid #000" width="30%" />
        </BorderBox>
        <BorderBox sx={{ ...justifyStart, justifyContent: "space-between" }}>
          <Typography variant="h6" fontFamily={"monospace"} fontWeight="bold">
            TOTAL
          </Typography>
          <Typography variant="h6" fontFamily="monospace">
            {totalAmount.toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </BorderBox>
        <br />
        <table className="table b-0 " style={{ maxWidth: 150 }}>
          <tbody>
            <tr>
              <td className="td b-0 p-0 ">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  fontWeight="bold"
                >
                  MTOP
                </Typography>
              </td>
              <td className="td b-0 p-0 center">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  sx={{ minWidth: 50 }}
                >
                  #
                </Typography>
              </td>
              <td className="td b-0 p-0 ">
                <Typography variant="h6" fontFamily="monospace">
                  {franchiseDetails?.mtop}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className="td b-0 p-0">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  fontWeight="bold"
                >
                  Make
                </Typography>
              </td>
              <td className="td b-0 p-0 center">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  sx={{ minWidth: 50 }}
                >
                  :
                </Typography>
              </td>
              <td className="td b-0 p-0 ">
                <Typography variant="h6" fontFamily="monospace">
                  {franchiseDetails?.model}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className="td b-0 p-0">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  fontWeight="bold"
                >
                  Motor
                </Typography>
              </td>
              <td className="td b-0 p-0 center">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  sx={{ minWidth: 50 }}
                >
                  #
                </Typography>
              </td>
              <td className="td b-0 p-0 ">
                <Typography variant="h6" fontFamily="monospace">
                  {franchiseDetails?.motorno}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className="td b-0 p-0">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  fontWeight="bold"
                >
                  Chassis
                </Typography>
              </td>
              <td className="td b-0 p-0 center">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  sx={{ minWidth: 50 }}
                >
                  #
                </Typography>
              </td>
              <td className="td b-0 p-0 ">
                <Typography variant="h6" fontFamily="monospace">
                  {franchiseDetails?.chassisno}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className="td b-0 p-0">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  fontWeight="bold"
                >
                  Plate
                </Typography>
              </td>
              <td className="td b-0 p-0 center">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  sx={{ minWidth: 50 }}
                >
                  #
                </Typography>
              </td>
              <td className="td b-0 p-0 ">
                <Typography variant="h6" fontFamily="monospace">
                  {franchiseDetails?.plateno}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <BorderBox
          sx={{
            justifyContent: "flex-start",
            alignItems: "end",
            border: "none",
          }}
        >
          <Box borderTop="2px solid #000" width="70%" />
        </BorderBox>
        <table className="table b-0 p-0">
          <tbody>
            <tr>
              <td className="td b-0 p-0">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  fontWeight="bold"
                >
                  Processed by:
                </Typography>
              </td>
              <td className="td b-0 p-0 ">
                <Typography variant="h6" fontFamily="monospace">
                  {fullname}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className="td b-0 p-0">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  fontWeight="bold"
                >
                  Date:
                </Typography>
              </td>
              <td className="td b-0 p-0 ">
                <Typography variant="h6" fontFamily="monospace">
                  {dayjs(datenow).format("MM/DD/YYYY")}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className="td b-0 p-0">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  fontWeight="bold"
                >
                  Ref No.
                </Typography>
              </td>
              <td className="td b-0 p-0 p-0">
                <Typography variant="h6" fontFamily="monospace">
                  {franchiseDetails?.refNo}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <BorderBox
          sx={{ justifyContent: "flex-end", alignItems: "end", border: "none" }}
        >
          <BorderBox
            sx={{
              flexDirection: "column",
              border: "none",
              maxWidth: 230,
            }}
          >
            <Typography variant="h6" fontFamily="monospace" textAlign="center">
              ARJAN V. BABANI
            </Typography>

            <Typography
              variant="h6"
              fontFamily="monospace"
              textAlign="center"
              fontWeight="bold"
              sx={{
                mt: -1,
              }}
            >
              ICO-CITY TREASURER
            </Typography>
          </BorderBox>
        </BorderBox>
        <br />
        <BorderBox
          sx={{
            border: "none",
          }}
        >
          <Typography
            variant="subtitle1"
            fontFamily="monospace"
            textAlign="center"
            fontWeight="bold"
          >
            ( PLS. ATTACHED THIS TO TRIPLICATE O.R. )
          </Typography>
        </BorderBox>
      </BorderBox>
    );
  }
}

export default NewFranchise;
