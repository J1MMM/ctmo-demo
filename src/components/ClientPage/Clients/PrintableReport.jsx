import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import BorderBox from "../../common/ui/BorderBox";
import dayjs from "dayjs";

class PrintableReport extends Component {
  render() {
    const { franchiseDetails, paidViolations } = this.props;
    console.log(franchiseDetails);

    const date_released = franchiseDetails?.daterelease
      ? dayjs(franchiseDetails?.daterelease).format("MM/DD/YYYY")
      : "";

    const complaintsEl =
      franchiseDetails?.complaint?.length > 0 ? (
        franchiseDetails?.complaint?.map((v, i) => {
          if (v != "")
            return (
              <Chip
                sx={{ maxWidth: 750 }}
                key={i}
                label={v}
                color={paidViolations[i] == v ? "primary" : "error"}
              />
            );
        })
      ) : (
        <Box minHeight={30}></Box>
      );

    return (
      <BorderBox sx={{ border: "none", p: 3 }}>
        <BorderBox sx={{ flexDirection: "column" }}>
          <table className="table" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td className="td center">
                  <b>MTOP</b>
                </td>
                <td className="td center">
                  <b>Contact Number</b>
                </td>
                <td className="td center">
                  <b>TODA</b>
                </td>
                <td className="td center">
                  <b>Date of Release</b>
                </td>
              </tr>

              <tr>
                <td className="td center">{franchiseDetails?.mtop}</td>
                <td className="td center">{franchiseDetails?.contact}</td>
                <td className="td center">{franchiseDetails?.toda}</td>
                <td className="td center">{date_released}</td>
              </tr>

              <tr>
                <td className="td center" colSpan={2}>
                  <b>Owner's Details</b>
                </td>
                <td className="td center" colSpan={2}>
                  <b>Driver's Details</b>
                </td>
              </tr>
              <tr>
                <td className="td center" colSpan={2}>
                  {`${franchiseDetails?.lname}, ${franchiseDetails?.fname} ${franchiseDetails?.mi}`}
                  <br />
                  <b>NAME OF OWNER</b>
                </td>
                <td className="td center" colSpan={2}>
                  {franchiseDetails.drivername}
                  <br />
                  <b>NAME OF DRIVER</b>
                </td>
              </tr>

              <tr>
                <td className="td center" colSpan={4}>
                  <b>Motor Details</b>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table bt-0" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td className="td center">
                  {franchiseDetails.model}
                  <br />
                  <b>MODEL</b>
                </td>
                <td className="td center">
                  {franchiseDetails.motorno}
                  <br />
                  <b>MOTOR NO.</b>
                </td>
                <td className="td center">
                  {franchiseDetails.chassisno}
                  <br />
                  <b>CHASSIS NO.</b>
                </td>
                <td className="td center">
                  {franchiseDetails.driverlicenseno}
                  <br />
                  <b>LICENSE NO.</b>
                </td>
              </tr>
              <tr>
                <td className="td center">
                  {franchiseDetails.or}
                  <br />
                  <b>OR</b>
                </td>
                <td className="td center">
                  {franchiseDetails.cr}
                  <br />
                  <b>CR</b>
                </td>
                <td className="td center">
                  {franchiseDetails.plateno}
                  <br />
                  <b>PLATE NO.</b>
                </td>
                <td className="td center">
                  {franchiseDetails.stroke}
                  <br />
                  <b>STROKE</b>
                </td>
              </tr>
              <tr>
                <td className="td center" colSpan={2}>
                  <b>Remarks</b>
                </td>
                <td className="td center" colSpan={2}>
                  <b>REPORT/COMPLAINTS</b>
                </td>
              </tr>
              <tr>
                <td className="td center" colSpan={2}>
                  {franchiseDetails?.remarks}
                </td>
                <td className="td center" colSpan={2}>
                  <Box display={"flex"} gap={1}>
                    {complaintsEl}
                  </Box>
                </td>
              </tr>
            </tbody>
          </table>
        </BorderBox>
      </BorderBox>
    );
  }
}

export default PrintableReport;
