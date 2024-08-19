import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import logo from "../../assets/images/receipt-logo.png";
import BorderBox from "../common/ui/BorderBox";
import dayjs from "dayjs";
import OutlinedTextField from "../common/ui/OutlinedTextField";
import DialogForm from "../common/ui/DialogForm";
import useAuth from "../../hooks/useAuth";

function numberToWords(number) {
  const ones = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  function convertToWords(number) {
    if (number < 10) {
      return ones[number];
    } else if (number < 20) {
      return teens[number - 10];
    } else if (number < 100) {
      return (
        tens[Math.floor(number / 10)] +
        (number % 10 !== 0 ? " " + ones[number % 10] : "")
      );
    } else if (number < 1000) {
      return (
        ones[Math.floor(number / 100)] +
        " hundred" +
        (number % 100 !== 0 ? " " + convertToWords(number % 100) : "")
      );
    } else if (number < 1000000) {
      return (
        convertToWords(Math.floor(number / 1000)) +
        " thousand" +
        (number % 1000 !== 0 ? " " + convertToWords(number % 1000) : "")
      );
    } else if (number < 1000000000) {
      return (
        convertToWords(Math.floor(number / 1000000)) +
        " million" +
        (number % 1000000 !== 0 ? " " + convertToWords(number % 1000000) : "")
      );
    }
  }

  // Function to convert cents to words
  function centsToWords(cents) {
    if (cents === 0) {
      return "zero centavos";
    } else if (cents < 10) {
      return ones[cents] + " centavo";
    } else if (cents < 20) {
      return teens[cents - 10] + " centavos";
    } else {
      return (
        tens[Math.floor(cents / 10)] +
        (cents % 10 !== 0 ? " " + ones[cents % 10] : "") +
        " centavos"
      );
    }
  }

  // Split number into integer and decimal parts
  const integerPart = Math.floor(number);
  const decimalPart = Math.round((number - integerPart) * 100); // Convert decimal to cents

  let result = convertToWords(integerPart);

  // Include cents if decimal part is present
  if (decimalPart > 0) {
    result += " and " + centsToWords(decimalPart);
  }

  return result;
}

class CashierFranchiseReceipt extends Component {
  render() {
    const { fullname, franchiseDetails, receiptData } = this.props;
    let receiptDataHaha =
      receiptData?.length > 0
        ? [...receiptData]
        : [...franchiseDetails?.receiptData];

    const datenow = new Date();
    let totalAmount = 0;

    if (receiptDataHaha.length > 0) {
      totalAmount = receiptDataHaha?.reduce(
        (total, obj) => total + obj?.price,
        0
      );

      receiptDataHaha = receiptDataHaha?.concat(
        Array.from({
          length: Math.max(0, 8 - receiptDataHaha.length),
        })
      );
    }
    return (
      <BorderBox sx={{ p: 1, border: "none", maxWidth: 450 }}>
        <BorderBox sx={{ flexDirection: "column" }}>
          <BorderBox
            sx={{
              display: "grid",
              gridTemplateColumns: "30% 70%",
              border: "none",
            }}
          >
            <BorderBox sx={{ p: 4 }}>
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
                  fontFamily={"monospace"}
                  textAlign="center"
                  fontWeight="bold"
                  m={1}
                >
                  Official Receipt of the Republic of the Philippines
                </Typography>
              </BorderBox>
              <BorderBox sx={{}}>
                <Typography fontFamily={"monospace"} m={1}>
                  <b>No.</b>
                  {franchiseDetails?.paymentOr}
                </Typography>
              </BorderBox>
              <BorderBox sx={{ borderBottom: "none" }}>
                <Typography fontFamily={"monospace"} m={1}>
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    border: "none",
                  }}
                >
                  <b>Payor: </b>
                  {franchiseDetails?.fname} {franchiseDetails?.mi}{" "}
                  {franchiseDetails?.lname}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table">
            <tbody>
              <tr>
                <th className="th">
                  <p>Nature of</p>
                  <p>Collection</p>
                </th>
                <th className="th">
                  <p>Account</p>
                  <p>Code</p>
                </th>
                <th className="th">Amount</th>
              </tr>

              {receiptDataHaha.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="td ">
                      {item?.label ? item?.label : <p className="invi">.</p>}
                    </td>

                    <td className="td "></td>
                    <td className="td ">
                      {item?.displayPrice ||
                        item?.price?.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        })}
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th className="th" colSpan={2} style={{ textAlign: "start" }}>
                  Total
                </th>

                <th className="th" style={{ textAlign: "start" }}>
                  {totalAmount.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </th>
              </tr>

              <tr>
                <td className="td" style={{ borderRight: "none" }}>
                  Amount in words:
                </td>
                <td
                  className="td"
                  style={{ borderLeft: "none", textAlign: "start" }}
                  colSpan={2}
                >
                  <b> {numberToWords(totalAmount)?.toUpperCase()}</b>
                </td>
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
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input type="checkbox" id="cash" name="cash" value="cash" />
                    <label htmlFor="cash">Cash</label>
                  </div>
                </td>
                <td className="td">Drawee Bank</td>
                <td className="td">Number</td>
                <td className="td">Date</td>
              </tr>
              <tr>
                <td className="td">
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="checkbox"
                      id="check"
                      name="check"
                      value="check"
                    />
                    <label htmlFor="check">Check</label>
                  </div>
                </td>
                <td className="td">
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      margin: 0,
                      padding: 0,
                      border: "none",
                      fontSize: "larger",
                      outline: "none",
                      fontFamily: "monospace",
                    }}
                  />
                </td>
                <td className="td">
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      margin: 0,
                      padding: 0,
                      border: "none",
                      fontSize: "larger",
                      outline: "none",
                      fontFamily: "monospace",
                    }}
                  />
                </td>
                <td className="td">
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      margin: 0,
                      padding: 0,
                      border: "none",
                      fontSize: "larger",
                      outline: "none",
                      fontFamily: "monospace",
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="td" colSpan={2}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="checkbox"
                      id="money"
                      name="money"
                      value="money"
                    />
                    <label htmlFor="money">Money Order</label>
                  </div>
                </td>
                <td className="td"></td>
                <td className="td"></td>
              </tr>
            </tbody>
          </table>
          <table className="table">
            <p style={{ position: "absolute", left: 10, bottom: 80 }}>
              MTOP: {franchiseDetails.mtop}
            </p>
            <tbody>
              <tr>
                <td className="td b-0">Received the amount stated above.</td>
              </tr>
              <tr>
                <td className="td b-0">
                  <div className="container">
                    <p
                      style={{
                        textAlign: "center",
                        marginBottom: "-5px",
                        marginTop: "-10px",
                        fontWeight: "500",
                      }}
                    >
                      Lucio Geraldo G. Ciolo
                    </p>
                    <div className="broken-line" />
                    <p
                      style={{
                        textAlign: "center",

                        marginTop: "-3px",
                      }}
                    >
                      Collecting Officer
                    </p>
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

export default CashierFranchiseReceipt;
