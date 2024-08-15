import { Box, Button, Chip, Grid, TextField, Typography } from "@mui/material";
import React, { Component } from "react";
import BorderBox from "../../common/ui/BorderBox";
import dayjs from "dayjs";
import bg from "../../../assets/images/franchiseformbg.jpg";

class FranchiseFormPrintable extends Component {
  render() {
    const { franchiseDetails } = this.props;
    const datenow = new Date();

    return (
      <Box
        border="1px solid transparent"
        display="block"
        width="8.5in"
        height="11in"
        position="relative"
        zIndex={1}
      >
        <img
          src={bg}
          alt=""
          style={{
            objectFit: "cover",
            width: "100%",
            position: "absolute",
            zIndex: -1,
          }}
        />
        {/* main content  */}
        <Box m=".9in" mt={"1.8in"}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box display="flex" flexDirection="row" gap={1}>
              <Typography fontFamily="serif" fontWeight="bold" variant="body1">
                APPLICANT:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: "underline",
                }}
              >
                {franchiseDetails?.fname} {franchiseDetails?.mi}{" "}
                {franchiseDetails?.lname}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" gap={1}>
              <Typography fontFamily="serif" fontWeight="bold" variant="body1">
                MTOP NO:
              </Typography>
              <Typography variant="body1" sx={{ textDecoration: "underline" }}>
                {franchiseDetails?.mtop}
              </Typography>
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box display="flex" flexDirection="row" gap={1}>
              <Typography fontFamily="serif" fontWeight="bold" variant="body1">
                ADDRESS:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: "underline",
                }}
              >
                {franchiseDetails?.address} SAN PABLO CITY LAGUNA
              </Typography>
            </Box>
          </Box>

          <Typography
            fontFamily="serif"
            fontWeight="bold"
            variant="body1"
            textAlign="center"
            mt={1.5}
          >
            Applicant is hereby authorized to operate motorized service for HIRE
            in the city using:
          </Typography>

          <Box display="flex" justifyContent="space-between" mt={1.5}>
            <Box display="flex" flexDirection="column">
              <Typography fontFamily="serif" fontWeight="bold" variant="body1">
                MAKE
              </Typography>
              <Typography variant="body1">{franchiseDetails?.make}</Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography fontFamily="serif" fontWeight="bold" variant="body1">
                MOTOR NO.
              </Typography>
              <Typography variant="body1">
                {franchiseDetails?.motorno}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography fontFamily="serif" fontWeight="bold" variant="body1">
                CHASSIS NO.
              </Typography>
              <Typography variant="body1">
                {franchiseDetails?.chassisno}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography fontFamily="serif" fontWeight="bold" variant="body1">
                PLATE NO.
              </Typography>
              <Typography variant="body1">
                {franchiseDetails?.plateno}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column">
              <Typography fontFamily="serif" fontWeight="bold" variant="body1">
                TINPLATE NO.
              </Typography>
              <Typography variant="body1">{franchiseDetails?.mtop}</Typography>
            </Box>
          </Box>

          <Typography
            fontFamily="serif"
            fontWeight="bold"
            variant="body1"
            mt={1}
          >
            Subject to the following conditions:
          </Typography>

          <Box mt={1}>
            <ol>
              <li style={{ fontWeight: "bold", fontFamily: "serif" }}>
                Applicant/Operator shall comply with the rules and regulations
                prescribed by City Ordinance No. 2011-01, as amended and by the
                SPCTMB. Failure to comply thereof and to any of the conditions
                herein set forth shall be sufficient cause for suspension or
                cancellation of the authority herein granted;
              </li>
              <li style={{ fontWeight: "bold", fontFamily: "serif" }}>
                The unit shall be registered as for HIRE with the LAND
                TRANSPORTATION OFFICE-SAN PABLO CITY in accordance with their
                prescribed rules and regulations;
              </li>
              <li style={{ fontWeight: "bold", fontFamily: "serif" }}>
                Applicant/Operator shall pay to the OFFICE OF THE CITY
                TREASURER; Mayor's Permit, Franchised Tax and Other imposition/s
                under existing rules and regulations as prescribed by Ordinance
                No. 2011-01, as amended, subject to penalty and surcharge in
                case of late payment;
              </li>
              <li style={{ fontWeight: "bold", fontFamily: "serif" }}>
                Within the authorized route, applicant shall charge the
                following rate per passenger per trip:
                <p style={{ textIndent: ".2in" }}>
                  P8.00 per passenger within the city proper;
                </p>
                <p style={{ textIndent: ".2in" }}>
                  P1.00 additional for every kilometer or a fraction thereof
                  outside the city proper;
                </p>
              </li>
              <li style={{ fontWeight: "bold", fontFamily: "serif" }}>
                As provided for by existing laws, 20% DISCOUNT shall be accorded
                to the following passengers:
                <p style={{ textIndent: ".2in" }}>SENIOR CITIZENS;</p>
                <p style={{ textIndent: ".2in" }}>STUDENTS;</p>
                <p style={{ textIndent: ".2in" }}>PERSONS WITH DISABILITY;</p>
              </li>

              <li style={{ fontWeight: "bold", fontFamily: "serif" }}>
                This Tricycle Franchise shall be valid for one (1) year and can
                be renewed annually subject to the existing rules and
                regulations;
              </li>
              <li style={{ fontWeight: "bold", fontFamily: "serif" }}>
                Protect this document. It’s lost or destruction may affect your
                legal rights to operate the service. Any addition, alteration or
                deletion not authorized will invalidate this document.
              </li>
            </ol>
          </Box>

          <Typography
            mt={4}
            fontFamily="serif"
            fontWeight="bold"
            variant="body1"
          >
            SO ORDERED
          </Typography>
          <Typography fontFamily="serif" fontWeight="bold" variant="body1">
            SAN PABLO CITY
          </Typography>
          <Box display="flex" gap={1}>
            <Typography fontFamily="serif" fontWeight="bold" variant="body1">
              DATE:
            </Typography>
            <Typography sx={{ textDecoration: "underline" }}>
              {dayjs(franchiseDetails.date).format("MM/DD/YYYY")}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default FranchiseFormPrintable;
