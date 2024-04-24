import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import logo from "../../assets/images/receipt-logo.png";
import BorderBox from "../common/ui/BorderBox";
import dayjs from "dayjs";
import OutlinedTextField from "../common/ui/OutlinedTextField";
import DialogForm from "../common/ui/DialogForm";

class ViolationReceipt extends Component {
  render() {
    const { violationDetails } = this.props;
    const datenow = new Date();
    console.log(violationDetails);

    const totalAmount = violationDetails?.violation?.reduce(
      (total, obj) => total + obj?.price,
      0
    );

    return (
      <BorderBox sx={{ p: 3, border: "none" }}>
        <BorderBox sx={{ flexDirection: "column" }}>
          <BorderBox
            sx={{
              display: "grid",
              gridTemplateColumns: "20% 80%",
              border: "none",
            }}
          >
            <BorderBox sx={{ p: 3 }}>
              <img src={logo} width="100%" style={{ objectFit: "contain" }} />
            </BorderBox>
            <BorderBox
              sx={{
                flexDirection: "column",
                borderLeft: "none",
                borderRight: "none",
              }}
            >
              <BorderBox
                sx={{
                  borderTop: "none",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  textAlign="center"
                  fontWeight="bold"
                  m={1}
                >
                  Official Receipt of the Republic of the Philippines
                </Typography>
              </BorderBox>
              <BorderBox sx={{}}>
                <Typography variant="h6" m={1}>
                  <b>No.</b> {violationDetails?.receiptNo}
                </Typography>
              </BorderBox>
              <BorderBox sx={{ borderBottom: "none" }}>
                <Typography m={1} variant="h6">
                  <b>Date:</b> {dayjs(datenow).format("MMMM D, YYYY")}
                </Typography>
              </BorderBox>
            </BorderBox>
          </BorderBox>

          <table className="table">
            <tbody>
              <tr>
                <td className="td w-75">
                  <b>Agency: </b> SPC CTMO
                </td>
                <td className="td w-25">
                  <b>Fund: </b>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <tbody>
              <tr>
                <td
                  className="td by-0"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <b>Payor: </b>
                  {violationDetails.payor}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <tbody>
              <tr>
                <th className="th">Nature of Collection</th>
                <th className="th">General Fund(63%)</th>
                <th className="th">Trust Fund(37%)</th>
                <th className="th">Amount</th>
              </tr>

              {violationDetails.violation.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="td center">
                      {item.violation == "OTHERS"
                        ? `${violationDetails.others || ""} (OTHERS)`
                        : item.violation}
                    </td>
                    <td className="td center">
                      {(item.price * 0.63).toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </td>
                    <td className="td center">
                      {(item.price * 0.37).toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </td>
                    <td className="td center">
                      {item.price.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th className="th">Total</th>
                <th className="th">
                  {(totalAmount * 0.63).toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </th>
                <th className="th">
                  {(totalAmount * 0.37).toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </th>
                <th className="th">
                  {totalAmount.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </th>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <tbody>
              <tr>
                <td className="td">Amount in words:</td>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <tbody>
              <tr>
                <td className="td p-3"></td>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <tbody>
              <tr>
                <td className="td">
                  <input type="checkbox" id="cash" name="cash" value="cash" />
                  <label htmlFor="cash">Cash</label>
                </td>
                <td className="td">Drawee Bank</td>
                <td className="td">Number</td>
                <td className="td">Date</td>
              </tr>
              <tr>
                <td className="td">
                  <input
                    type="checkbox"
                    id="check"
                    name="check"
                    value="check"
                  />
                  <label htmlFor="check">Check</label>
                </td>
                <td className="td"></td>
                <td className="td"></td>
                <td className="td"></td>
              </tr>
              <tr>
                <td className="td" colSpan={2}>
                  <input
                    type="checkbox"
                    id="money"
                    name="money"
                    value="money"
                  />
                  <label htmlFor="money">Money Order</label>
                </td>
                <td className="td"></td>
                <td className="td"></td>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <tbody>
              <tr>
                <td className="td b-0">Received the amount stated above.</td>
              </tr>
              <tr>
                <td className="td b-0">
                  <div className="container">
                    <div className="broken-line" />
                    <p style={{ textAlign: "center" }}> Collecting Officer</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table">
            <tbody>
              <tr>
                <td className="td center">
                  NOTE: Write the number and date of the receipt on the back of
                  the check or money order received.
                </td>
              </tr>
            </tbody>
          </table>
        </BorderBox>
      </BorderBox>
    );
  }
}

export default ViolationReceipt;
