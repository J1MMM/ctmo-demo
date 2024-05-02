import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import BorderBox from "../common/ui/BorderBox";
import dayjs from "dayjs";

const justifyCenter = { justifyContent: "center", border: "none" };
const justifyStart = { justifyContent: "start", border: "none" };

class RenewFranchise extends Component {
  render() {
    const { franchiseDetails, fullname, receiptData } = this.props;
    let totalAmount = 0;
    let formattedDateRange = "";

    if (franchiseDetails && receiptData && receiptData.length > 0) {
      const datenow = new Date();
      const startDate = dayjs(datenow).format("YYYY");
      const endDate = dayjs(datenow).add(1, "year").format("YYYY");

      formattedDateRange = `${startDate}-${endDate}`;

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
        <table className="table b-0 ">
          <tbody>
            <tr>
              <td className="td b-0 p-0 ">
                <Typography
                  variant="h6"
                  fontFamily={"monospace"}
                  fontWeight="bold"
                >
                  NAME
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
                  {franchiseDetails?.fname} {franchiseDetails?.mi}{" "}
                  {franchiseDetails?.lname}
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
                  Address
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
                  {franchiseDetails?.address}
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
                  Year
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
                  {formattedDateRange}
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
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
            })
          : null}

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
        <table className="table b-0 ">
          <tbody>
            <tr>
              <td className="td b-0 p-0 w-10">
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
              <td className="td b-0 p-0 w-10">
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
              <td className="td b-0 p-0 w-10">
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
              <td className="td b-0 p-0 w-10">
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
              <td className="td b-0 p-0 w-10">
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
        <br />
        <br />
        <BorderBox
          sx={{
            justifyContent: "flex-start",
            alignItems: "end",
            border: "none",
          }}
        >
          <Box borderTop="1px solid #000" width="70%" />
        </BorderBox>

        <BorderBox sx={{ border: "none", gap: 1 }}>
          <Typography
            variant="h6"
            fontFamily={"monospace"}
            maxWidth={150}
            fontWeight="bold"
          >
            Computed by:
          </Typography>

          <Typography variant="h6" fontFamily="monospace">
            {fullname}
          </Typography>
        </BorderBox>
      </BorderBox>
    );
  }
}

export default RenewFranchise;
