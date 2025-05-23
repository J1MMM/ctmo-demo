import { useEffect, useState } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { HiOutlineUserGroup } from "react-icons/hi2";

import { PiWarningCircle } from "react-icons/pi";
import useData from "../../hooks/useData";

import OverviewCard from "./OverviewCard";
import "react-calendar/dist/Calendar.css";
import BarGraph from "./BarGraph";
import { RiUserAddLine } from "react-icons/ri";

import PieGraph from "./PieGraph";
import { FaListOl } from "react-icons/fa6";
import OfficersTable from "./OfficersList";

const Dashboard = () => {
  const { headerShadow, setHeaderShadow, franchiseAnalytics } = useData();

  const [selectedBtn, setSelectedBtn] = useState("daily");

  useEffect(() => {
    document.title = "Dashboard | Franchise and Permit Management System";
    window.scrollTo(0, 0);

    return () => {
      setHeaderShadow(false);
    };
  }, []);

  const cardData = [
    {
      title: "Registered Clients",
      data: 4358,
      icon: <HiOutlineUserGroup color={"#FFF"} size={18} />,
      subText: "Registered Franchises in San Pablo City",
    },
    {
      title: "Available Franchises",
      data: 548,
      icon: <FaListOl color={"#1A237E"} sx={{ color: "#1A237E" }} size={16} />,
      subText: "Total count of available MTOP",
    },
    {
      title: "Recently Added",
      data: 145,
      icon: <RiUserAddLine color={"#1A237E"} size={18} />,
      subText: "clients that have been added recently",
    },

    {
      title: "Recently Revoked",
      data: 18,
      icon: <PiWarningCircle color={"#1A237E"} size={20} />,
      subText: "total count of clients revoked",
    },
  ];

  const handleBarchartClick = (btnName) => {
    setSelectedBtn(btnName);
  };

  return (
    <Box //main contianer scrollable
      height="100vh"
      maxHeight="90vh"
      sx={{
        overflowY: "scroll",
        overflowX: "hidden",
        backgroundColor: "#EEF2F6",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxSizing: "border-box",
      }}
      width="100%"
      onScroll={(e) => {
        if (e.target.scrollTop > 0 && !headerShadow) setHeaderShadow(true);
        if (e.target.scrollTop == 0 && headerShadow) setHeaderShadow(false);
      }}
    >
      <Box // bargraph and cards container for layout
        gap={2}
        width="100%"
        display="grid"
        sx={{
          gridTemplateColumns: {
            xs: "100%",
            sm: "100%",
            lg: "50% 50%",
          },
        }}
      >
        <Paper //bar graph container
          elevation={3}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            bgcolor: "#FFF",
            borderRadius: 3,
            flexDirection: "column",
            boxSizing: "border-box",
            padding: 2,
            height: 400,
          }}
        >
          <Stack direction="row" justifyContent="space-between">
            <Typography component={"span"} variant="h6">
              Franchise Overview
            </Typography>
            <ButtonGroup size="small">
              <Button
                key="daily"
                variant={selectedBtn == "daily" ? "contained" : "outlined"}
                onClick={() => handleBarchartClick("daily")}
              >
                Day
              </Button>
              <Button
                key="monthly"
                onClick={() => handleBarchartClick("monthly")}
                variant={selectedBtn == "monthly" ? "contained" : "outlined"}
              >
                Week
              </Button>
              <Button
                key="yearly"
                variant={selectedBtn == "yearly" ? "contained" : "outlined"}
                onClick={() => handleBarchartClick("yearly")}
              >
                Month
              </Button>
            </ButtonGroup>
          </Stack>
          <BarGraph dataset={franchiseAnalytics || []} />
        </Paper>

        <Box //cards container
          gap={2}
          width="100%"
          display="grid"
          maxHeight={400}
          sx={{
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr ",
            },
          }}
        >
          {cardData.map((data, index) => {
            return <OverviewCard key={index} data={data} index={index} />;
          })}
        </Box>
      </Box>

      <Box // table and piechart container
        gap={2}
        width="100%"
        display="grid"
        sx={{
          gridTemplateColumns: {
            xs: "100%",
            sm: "100%",
            lg: "50% 50%",
          },
          boxSizing: "border-box",
          flex: 1,
        }}
      >
        <Slide in={true} direction="up">
          <Paper
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 3,
              boxSizing: "border-box",
              flex: 1,
              position: "relative",
              height: 500,
            }}
          >
            <OfficersTable />
          </Paper>
        </Slide>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 3,
            boxSizing: "border-box",
            flex: 1,
            height: 500,
          }}
        >
          <Box
            gap={2}
            width="100%"
            height={"100%"}
            display="grid"
            sx={{
              gridTemplateColumns: {
                xs: "100%",
                sm: "100%",
                lg: "50% 50%",
              },
              boxSizing: "border-box",
              position: "relative",
            }}
          >
            <Box display="flex" flexDirection="column">
              <Typography component={"span"} variant="h6">
                Violators Overview
              </Typography>

              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  justifyContent: "center",
                  gap: 28,
                }}
              >
                <li>
                  <Typography
                    component={"span"}
                    variant="body1"
                    fontWeight={600}
                    sx={{ mb: -1 }}
                  >
                    Total Violators (5,085 )
                  </Typography>
                  <Typography
                    component={"span"}
                    variant="caption"
                    color="InactiveCaptionText"
                  >
                    total number of unpaid violators
                  </Typography>
                </li>
                <li>
                  <Typography
                    component={"span"}
                    variant="body1"
                    fontWeight={600}
                    sx={{ mb: -1 }}
                  >
                    Recently Paid (32)
                  </Typography>
                  <Typography
                    component={"span"}
                    variant="caption"
                    color="InactiveCaptionText"
                  >
                    total number of violators recently paid
                  </Typography>
                </li>
                <li>
                  <Typography
                    component={"span"}
                    variant="body1"
                    fontWeight={600}
                    sx={{ mb: -1 }}
                  >
                    Registered ({35}
                    %)
                  </Typography>
                  <Typography
                    component={"span"}
                    variant="caption"
                    color="InactiveCaptionText"
                  >
                    percentage of registered violators
                  </Typography>
                </li>
                <li>
                  <Typography
                    component={"span"}
                    variant="body1"
                    fontWeight={600}
                    sx={{ mb: -1 }}
                  >
                    Unregistered ({65}%)
                  </Typography>
                  <Typography
                    component={"span"}
                    variant="caption"
                    color="InactiveCaptionText"
                  >
                    percentage of unregistered violators
                  </Typography>
                </li>
              </ul>
            </Box>
            <Box maxHeight={450}>
              <PieGraph />
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
