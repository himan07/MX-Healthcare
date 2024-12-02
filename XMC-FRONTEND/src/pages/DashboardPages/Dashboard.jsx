import React from "react";
import { Grid, Container, Typography, Box } from "@mui/material";
import "../../assets/styles/Dashboard.css";
import ProfileContainer from "../../components/DashboardComponents/profile/Profile";
import TopicCard from "../../components/DashboardComponents/TopicCard";
import DashboardCard from "../../components/DashboardComponents/Header/DashboardCard";

const Dashboard = () => {
  const topics = [
    { name: "Topic Name", reward: "$100", time: "30 mins", rate: "Low" },
    { name: "Topic Name", reward: "$25", time: "15 mins", rate: "Low" },
    { name: "Topic Name", reward: "$120", time: "20 mins", rate: "High" },
  ];

  return (
    <Box
      sx={{
        py: { xs: 4, sm: 5, md: 6 },
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Typography variant="h4">
          Hello, John!
        </Typography>
        
        <Grid
          maxWidth="md"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: 0,
          }}
        >
          <DashboardCard balance="$15.2" studiesCompleted={2} />
        </Grid>
        
        <ProfileContainer progress={25} />

        <Grid container spacing={2}>
          {topics.map((topic, index) => (
            <Grid item xs={12} md={4} key={index}>
              <TopicCard {...topic} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
