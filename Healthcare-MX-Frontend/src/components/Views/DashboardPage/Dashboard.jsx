import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";

const TileCard = ({
  title,
  subtitle,
  progress,
  description,
  totalTasks,
  background,
}) => (
  <Card
    sx={{
      background: background,
      color: "white",
      borderRadius: 4,
      minHeight: 180,
    }}
  >
    <CardContent>
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        {subtitle}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={(progress / totalTasks) * 100}
        sx={{
          height: 8,
          borderRadius: 5,
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
      <Typography variant="body2" sx={{ mt: 1 }}>
        {description}
      </Typography>
      <Button
        variant="outlined"
        sx={{ mt: 2, borderColor: "white", color: "white" }}
      >
        Participate
      </Button>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  return (
    <Box
      sx={{
        maxWidth: 1200,
        p: 4,
        mx: "auto",
        mt: 0,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{ mb: 4, textAlign: "left", color: "#0063cc" }}
      >
        Let's earn some points!
      </Typography>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 3 }}
      >
        <TileCard
          title="Profile Surveys"
          subtitle="0 of 13 updated"
          progress={0}
          totalTasks={13}
          description="Want to qualify for more surveys? Update 13 profile surveys"
          background="linear-gradient(135deg, #66a6ff, #89f7fe)"
        />
        <TileCard
          title="Polls"
          subtitle="0 of 17 voted"
          progress={0}
          totalTasks={17}
          description="Your opinion matters! 17 polls are eager for your input"
          background="linear-gradient(135deg, #f093fb, #f5576c)"
        />
        <TileCard
          title="Surveys"
          subtitle="0 of 10 completed"
          progress={0}
          totalTasks={10}
          description="Complete 10 surveys to earn rewards!"
          background="linear-gradient(135deg, #fa709a, #fee140)"
        />
        <TileCard
          title="Games"
          subtitle="0 of 4 played"
          progress={0}
          totalTasks={4}
          description="Calling all gamers! Check out our exciting new games!"
          background="linear-gradient(135deg, #43e97b, #38f9d7)"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
