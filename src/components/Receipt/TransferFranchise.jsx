import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import BorderBox from "../common/ui/BorderBox";
import dayjs from "dayjs";

//generate receipt data
const initialreceiptData = [
  { key: "7", label: "Sticker-Color Coding", price: 0 },
  { key: "11", label: "Garbage Fee", price: 0.0 },
  { key: "1", label: "Tin Plate", price: 0.0 },
  { key: "2", label: "Dropping", price: 0.0 },
  { key: "12", label: "Notarial Fee", price: 0.0 },
];

const justifyCenter = { justifyContent: "center", border: "none" };
const justifyStart = { justifyContent: "start", border: "none" };

class TransferFranchise extends Component {
  render() {
    const { franchiseDetails, fullname, receiptData, initialFormInfo } =
      this.props;
    console.log(franchiseDetails);
    const datenow = new Date();
    let totalAmount = 0;

    if (franchiseDetails && receiptData && receiptData.length > 0) {
      totalAmount = receiptData?.reduce((total, obj) => total + obj?.price, 0);
    }

    return (
      <BorderBox
        sx={{
          maxWidth: 450,
          flexDirection: "column",
          padding: 3,
          boxSizing: "borderbox",
          border: "none",
        }}
      >
        <BorderBox sx={justifyCenter}>
          <Typography
            component={"span"}
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
            component={"span"}
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
            component={"span"}
            fontFamily={"monospace"}
            textAlign="center"
            sx={{ textDecoration: "underline", mt: -1 }}
          >
            TRANSFER
          </Typography>
        </BorderBox>

        <br />
        <BorderBox sx={justifyStart}>
          <Typography
            component={"span"}
            variant="h6"
            fontFamily={"monospace"}
            fontWeight="bold"
          >
            NAME:
          </Typography>
        </BorderBox>
        <BorderBox sx={justifyCenter}>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mt: -1 }}
            fontFamily={"monospace"}
            component={"span"}
          >
            {franchiseDetails?.fname} {franchiseDetails?.mi}{" "}
            {franchiseDetails?.lname}
          </Typography>
        </BorderBox>
        <BorderBox sx={justifyStart}>
          <Typography
            component={"span"}
            variant="h6"
            fontFamily={"monospace"}
            fontWeight="bold"
          >
            ADDRESS:
          </Typography>
        </BorderBox>
        <BorderBox sx={justifyCenter}>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mt: -1 }}
            fontFamily={"monospace"}
            component={"span"}
          >
            {franchiseDetails?.address}
          </Typography>
        </BorderBox>

        <br />
        <BorderBox sx={justifyStart}>
          <Typography
            component={"span"}
            variant="h6"
            fontFamily={"monospace"}
            fontWeight="bold"
          >
            Amendment:
          </Typography>
        </BorderBox>
        {receiptData.length > 0
          ? receiptData?.map((item, index) => {
              return (
                <BorderBox
                  key={index}
                  sx={{ ...justifyStart, justifyContent: "space-between" }}
                >
                  <Typography
                    variant="h6"
                    fontFamily={"monospace"}
                    fontWeight="bold"
                    component={"span"}
                  >
                    {item?.label}
                  </Typography>
                  <Typography
                    component={"span"}
                    variant="h6"
                    fontFamily="monospace"
                  >
                    {item?.price?.toLocaleString("en", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Typography>
                </BorderBox>
              );
            })
          : null}
        <br />
        {initialreceiptData.map((item, index) => {
          return (
            <BorderBox
              key={index}
              sx={{ ...justifyStart, justifyContent: "space-between" }}
            >
              <Typography
                variant="h6"
                fontFamily={"monospace"}
                fontWeight="bold"
                component={"span"}
              >
                {item?.label}
              </Typography>
              <Typography
                component={"span"}
                variant="h6"
                fontFamily="monospace"
              >
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
          <Typography
            component={"span"}
            variant="h6"
            fontFamily={"monospace"}
            fontWeight="bold"
          >
            TOTAL
          </Typography>
          <Typography component={"span"} variant="h6" fontFamily="monospace">
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
                  component={"span"}
                >
                  MTOP
                </Typography>
              </td>
              <td className="td b-0 p-0 center">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  sx={{ minWidth: 50 }}
                  component={"span"}
                >
                  #
                </Typography>
              </td>
              <td className="td b-0 p-0 ">
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily="monospace"
                >
                  {franchiseDetails?.mtop}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className="td b-0 p-0">
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily={"monospace"}
                  fontWeight="bold"
                >
                  Make
                </Typography>
              </td>
              <td className="td b-0 p-0 center">
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily={"monospace"}
                  sx={{ minWidth: 50 }}
                >
                  :
                </Typography>
              </td>
              <td className="td b-0 p-0 ">
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily="monospace"
                >
                  {franchiseDetails?.make}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className="td b-0 p-0">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  component={"span"}
                  fontWeight="bold"
                >
                  Motor
                </Typography>
              </td>
              <td className="td b-0 p-0 center">
                <Typography
                  variant="h6"
                  component={"span"}
                  fontFamily={"monospace"}
                  sx={{ minWidth: 50 }}
                >
                  #
                </Typography>
              </td>
              <td className="td b-0 p-0 ">
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily="monospace"
                >
                  {franchiseDetails?.motorno}
                </Typography>
              </td>
            </tr>
            <tr>
              <td className="td b-0 p-0">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  component={"span"}
                  fontWeight="bold"
                >
                  Chassis
                </Typography>
              </td>
              <td className="td b-0 p-0 center">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  component={"span"}
                  sx={{ minWidth: 50 }}
                >
                  #
                </Typography>
              </td>
              <td className="td b-0 p-0 ">
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily="monospace"
                >
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
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily="monospace"
                >
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
        <table className="table b-0 p-0" style={{ maxWidth: 350 }}>
          <tbody>
            <tr>
              <td className="td b-0 p-0">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  fontWeight="bold"
                >
                  FROM:
                </Typography>
              </td>
              <td className="td b-0 p-0">
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily="monospace"
                >
                  {franchiseDetails?.newOwner != "" &&
                    `${initialFormInfo?.fname} ${initialFormInfo?.mi}
                  ${initialFormInfo?.lname}`}

                  {franchiseDetails.newDriver != "" &&
                    ` ${initialFormInfo.drivername}`}
                  {franchiseDetails.newMotor !== "" &&
                    ` ${initialFormInfo.motorno}`}
                  {franchiseDetails.newToda !== "" &&
                    ` ${initialFormInfo.toda}`}
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
                  TO:
                </Typography>
              </td>
              <td className="td b-0 p-0">
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily="monospace"
                >
                  {franchiseDetails.newOwner}
                  {franchiseDetails.newDriver}
                  {franchiseDetails.newMotor}
                  {franchiseDetails.newToda}
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
                  Processed by:
                </Typography>
              </td>
              <td className="td b-0 p-0">
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily="monospace"
                >
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
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily="monospace"
                >
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
                <Typography
                  component={"span"}
                  variant="h6"
                  fontFamily="monospace"
                >
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
              maxWidth: 250,
            }}
          >
            <Typography
              component={"span"}
              variant="h6"
              fontFamily="monospace"
              textAlign="center"
            >
              LUCIO GERALDO G. CIOLO
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
              ASST. CITY TREASURER
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

export default TransferFranchise;
