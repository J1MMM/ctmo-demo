import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { Component, useState } from "react";
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

  function convertToWords(num) {
    if (num < 10) {
      return ones[num];
    } else if (num < 20) {
      return teens[num - 10];
    } else if (num < 100) {
      return (
        tens[Math.floor(num / 10)] +
        (num % 10 !== 0 ? " " + ones[num % 10] : "")
      );
    } else if (num < 1000) {
      return (
        ones[Math.floor(num / 100)] +
        " hundred" +
        (num % 100 !== 0 ? " and " + convertToWords(num % 100) : "")
      );
    } else if (num < 1000000) {
      return (
        convertToWords(Math.floor(num / 1000)) +
        " thousand" +
        (num % 1000 !== 0 ? " " + convertToWords(num % 1000) : "")
      );
    } else if (num < 1000000000) {
      return (
        convertToWords(Math.floor(num / 1000000)) +
        " million" +
        (num % 1000000 !== 0 ? " " + convertToWords(num % 1000000) : "")
      );
    }
  }

  function convertDecimalToWords(decimal) {
    if (decimal === 0) return "";
    return " and " + convertToWords(decimal) + " centavos";
  }

  if (number === 0) {
    return ones[0];
  } else if (number < 0) {
    return (
      "minus " +
      convertToWords(Math.abs(Math.floor(number))) +
      convertDecimalToWords(
        Math.round((Math.abs(number) - Math.floor(Math.abs(number))) * 100)
      )
    );
  } else {
    const integerPart = Math.floor(number);
    const decimalPart = Math.round((number - integerPart) * 100);
    return convertToWords(integerPart) + convertDecimalToWords(decimalPart);
  }
}

class ReceiptViolationPrintableTF extends Component {
  render() {
    const { violationDetails, fullname } = this.props;
    const datenow = new Date();
    let totalAmount = 0;
    let receiptData = [];

    if (violationDetails) {
      const total = violationDetails?.violation?.reduce(
        (total, obj) => total + (obj?.price || 0), // Ensure obj?.price defaults to 0 if undefined or null
        0
      );

      totalAmount = (total || 0) * 0.37; // Ensure total defaults to 0 if undefined
      receiptData = violationDetails?.violation.concat(
        Array.from({
          length: Math.max(0, 8 - violationDetails?.violation.length),
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
              <p
                style={{
                  position: "absolute",
                  right: "8.5rem",
                  top: "5.5rem",
                }}
              >
                {violationDetails?.ortf}
              </p>
              <BorderBox sx={{ border: "none", position: "relative" }}>
                <Typography
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
                  {violationDetails?.paymentOr}
                </Typography>
              </BorderBox>
              <BorderBox sx={{ borderBottom: "none", border: "none" }}>
                <Typography fontFamily={"monospace"} m={1}>
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
                <td className="td w-25">TF</td>
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
                  {violationDetails?.name}
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table noOutline" style={{ marginTop: "1rem" }}>
            <tbody>
              <tr>
                <th className="th">
                  <p
                    style={{
                      color: "transparent",
                      userSelect: "none",
                    }}
                  >
                    Nature of
                  </p>
                  <p
                    style={{
                      color: "transparent",
                      userSelect: "none",
                    }}
                  >
                    Collection
                  </p>
                </th>
                <th className="th">
                  <p
                    style={{
                      color: "transparent",
                      userSelect: "none",
                    }}
                  >
                    Account
                  </p>
                  <p
                    style={{
                      color: "transparent",
                      userSelect: "none",
                    }}
                  >
                    Code
                  </p>
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

              {receiptData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="td" style={{ minWidth: 155 }}>
                      {item?.violation ? (
                        item?.violation
                      ) : (
                        <p className="invi">.</p>
                      )}
                    </td>
                    <td className="td">
                      {" "}
                      {item?.displayPrice ||
                        (item?.price &&
                          (item?.price * 0.37).toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                          }))}
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
          <p
            style={{
              textAlign: "end",
              fontFamily: "monospace",
              marginRight: "8rem",
              marginTop: "-1.2rem",
            }}
          >
            {totalAmount.toLocaleString("en-PH", {
              style: "currency",
              currency: "PHP",
            })}
          </p>
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

          <p
            style={{
              fontFamily: "monospace",
              marginLeft: "2rem",
              fontSize: 10,

              // marginTop: ".5rem",
            }}
          >
            <b> {numberToWords(totalAmount)?.toUpperCase()}</b>
          </p>

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
                    <p
                      style={{
                        textAlign: "start",
                        marginBottom: "-5px",
                        marginTop: "-50px",
                        fontWeight: "500",
                        fontSize: "larger",
                        minWidth: 200,
                      }}
                    ></p>

                    <p
                      style={{
                        textAlign: "center",

                        marginTop: "-3px",
                        color: "transparent",
                        userSelect: "none",
                      }}
                    >
                      Collecting Officer
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p
            style={{
              position: "absolute",
              fontFamily: "monospace",
              bottom: "2.3rem",
              left: "1.5rem",
            }}
          >
            {violationDetails.franchiseNo}
          </p>
          <p
            style={{
              marginLeft: "8rem",
              fontFamily: "monospace",
              marginTop: "2rem",
            }}
          >
            <b>Lucio Geraldo G. Ciolo</b>
          </p>
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

export default ReceiptViolationPrintableTF;
