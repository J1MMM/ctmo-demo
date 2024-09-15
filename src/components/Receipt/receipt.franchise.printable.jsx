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

class CashierFranchiseReceiptPrintable extends Component {
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
      <BorderBox
        sx={{
          p: 1,
          border: "none",
          maxWidth: 450,
          marginLeft: "2.5rem",
          marginTop: "2.8rem",
        }}
      >
        <BorderBox sx={{ flexDirection: "column", border: "none" }}>
          <BorderBox
            sx={{
              display: "grid",
              gridTemplateColumns: "30% 70%",
              border: "none",
            }}
          >
            <BorderBox sx={{ p: 4, border: "none" }}></BorderBox>
            <BorderBox
              sx={{
                flexDirection: "column",
                borderLeft: "none",
                borderRight: "none",
                border: "none",
              }}
            >
              <BorderBox
                sx={{
                  borderTop: "none",
                  flex: 1,
                  alignItems: "center",
                  border: "none",
                }}
              >
                <Typography
                  component={"span"}
                  fontFamily={"monospace"}
                  textAlign="center"
                  fontWeight="bold"
                  m={1}
                  sx={{
                    color: "transparent",
                    userSelect: "none",
                  }}
                >
                  Official Receipt of the Republic of the Philippines
                </Typography>
              </BorderBox>
              <span
                style={{ position: "absolute", right: "8.5rem", top: "5.5rem" }}
              >
                {franchiseDetails?.paymentOr}
              </span>
              <BorderBox sx={{ border: "none", position: "relative" }}>
                <Typography
                  component={"span"}
                  fontFamily={"monospace"}
                  m={1}
                  ml={4}
                  sx={{ color: "transparent", userSelect: "none" }}
                >
                  <b
                    style={{
                      color: "transparent",
                      userSelect: "none",
                      paddingTop: "8rem",
                    }}
                  >
                    No.
                  </b>
                  {franchiseDetails?.paymentOr}
                </Typography>
              </BorderBox>
              <BorderBox sx={{ borderBottom: "none", border: "none" }}>
                <Typography component={"span"} fontFamily={"monospace"} m={1}>
                  <b
                    style={{
                      color: "transparent",
                      userSelect: "none",
                    }}
                  >
                    Date:
                  </b>
                  {dayjs(datenow).format("MMMM D, YYYY")}
                </Typography>
              </BorderBox>
            </BorderBox>
          </BorderBox>

          <table className="table noOutline">
            <tbody>
              <tr>
                <td className="td w-75">
                  <b
                    style={{
                      color: "transparent",
                      userSelect: "none",
                    }}
                  >
                    Agency:{" "}
                  </b>{" "}
                  SPC CTMO
                </td>
                <td className="td w-25"></td>
              </tr>
            </tbody>
          </table>

          <table className="table noOutline">
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
                  <b
                    style={{
                      color: "transparent",
                      userSelect: "none",
                      marginLeft: "8px",
                    }}
                  >
                    Payor:{" "}
                  </b>
                  {franchiseDetails?.fname} {franchiseDetails?.mi}{" "}
                  {franchiseDetails?.lname}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table noOutline" style={{ marginTop: "1rem" }}>
            <tbody>
              <tr>
                <th className="th">
                  <span
                    style={{
                      color: "transparent",
                      userSelect: "none",
                    }}
                  >
                    Nature of
                  </span>
                  <span
                    style={{
                      color: "transparent",
                      userSelect: "none",
                    }}
                  >
                    Collection
                  </span>
                </th>
                <th className="th">
                  <span
                    style={{
                      color: "transparent",
                      userSelect: "none",
                    }}
                  >
                    Account
                  </span>
                  <span
                    style={{
                      color: "transparent",
                      userSelect: "none",
                    }}
                  >
                    Code
                  </span>
                </th>
                <th
                  className="th"
                  style={{
                    color: "transparent",
                    userSelect: "none",
                  }}
                >
                  Amount
                </th>
              </tr>

              {receiptDataHaha.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="td" style={{ minWidth: 155 }}>
                      {item?.label ? (
                        item?.label
                      ) : (
                        <span className="invi">.</span>
                      )}
                    </td>
                    <td className="td">
                      {" "}
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
                <th
                  className="th"
                  colSpan={1}
                  style={{
                    color: "transparent",
                    userSelect: "none",
                  }}
                >
                  Total
                </th>

                <th className="th" style={{ textAlign: "start" }}></th>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <span
            style={{
              textAlign: "end",
              fontFamily: "monospace",
              marginRight: "8rem",
              marginTop: "-1.1rem",
            }}
          >
            {totalAmount.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
            })}
          </span>
          <table
            className="table noOutline"
            style={{ display: "block", mariginTop: "10rem" }}
          >
            <tbody>
              <tr>
                <td
                  className="td"
                  style={{
                    color: "transparent",
                    userSelect: "none",
                  }}
                >
                  Amount
                </td>
                <td
                  className="td"
                  style={{ borderLeft: "none", textAlign: "start" }}
                  colSpan={2}
                ></td>
              </tr>
            </tbody>
          </table>

          <span
            style={{
              fontFamily: "monospace",
              marginLeft: "1rem",
              fontSize: 10,
              // marginTop: ".5rem",
            }}
          >
            <b> {numberToWords(totalAmount)?.toUpperCase()}</b>
          </span>

          <table className="table noOutline">
            <tbody>
              <tr>
                <td className="td">
                  <div style={{ display: "flex", gap: "8px" }}>
                    <label
                      htmlFor="cash"
                      style={{
                        color: "transparent",
                        userSelect: "none",
                      }}
                    >
                      Cash
                    </label>
                  </div>
                </td>
                <td
                  className="td"
                  style={{
                    color: "transparent",
                    userSelect: "none",
                  }}
                >
                  Drawee Bank
                </td>
                <td
                  className="td"
                  style={{
                    color: "transparent",
                    userSelect: "none",
                  }}
                >
                  Number
                </td>
                <td
                  className="td"
                  style={{
                    color: "transparent",
                    userSelect: "none",
                  }}
                >
                  Date
                </td>
              </tr>
              <tr>
                <td className="td">
                  <div style={{ display: "flex", gap: "8px" }}>
                    <label
                      htmlFor="check"
                      style={{
                        color: "transparent",
                        userSelect: "none",
                      }}
                    >
                      Check
                    </label>
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
                <td className="td"></td>
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
                    <label
                      style={{
                        color: "transparent",
                        userSelect: "none",
                      }}
                      htmlFor="money"
                    >
                      Money Order
                    </label>
                  </div>
                </td>
                <td className="td"></td>
                <td className="td"></td>
              </tr>
            </tbody>
          </table>

          <table className="table noOutline">
            <tbody>
              <tr>
                <td
                  className="td b-0"
                  style={{
                    color: "transparent",
                    userSelect: "none",
                  }}
                >
                  Received the amount stated above.
                </td>
              </tr>
              <tr>
                <td className="td b-0">
                  <div className="container">
                    <span
                      style={{
                        textAlign: "start",
                        marginBottom: "-5px",
                        marginTop: "-50px",
                        fontWeight: "500",
                        fontSize: "larger",
                        minWidth: 200,
                      }}
                    ></span>

                    <span
                      style={{
                        textAlign: "center",

                        marginTop: "-3px",
                        color: "transparent",
                        userSelect: "none",
                      }}
                    >
                      Collecting Officer
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <span
            style={{
              marginLeft: "8rem",
              fontFamily: "monospace",
              marginTop: "2rem",
            }}
          >
            <span
              style={{
                display: "block",
                marginLeft: "-5rem",
                marginBottom: "-.8rem",
              }}
            >
              {franchiseDetails.mtop}
            </span>
            <b>{fullname}</b>
          </span>
          <table className="table noOutline">
            <tbody>
              <tr>
                <td
                  className="td center"
                  style={{
                    color: "transparent",
                    userSelect: "none",
                  }}
                >
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

export default CashierFranchiseReceiptPrintable;
