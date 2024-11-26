import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import checkIcon from "../../assets/images/ShieldCheck.svg";
import warningIcon from "../../assets/images/ShieldWarning.svg";
import Clock from "../../assets/images/Clock.svg";

const TopicCard = ({ name, reward, time, rate }) => {
  const rateColor =
    rate === "High" ? "rgba(255, 246, 213, 1)" : "rgba(213, 255, 226, 1)";

  return (
    <Card sx={{ border: "1px solid e0e0e0", borderRadius: 2 }}>
      <CardContent>
        <Chip
          label={`${rate} disqualification rate`}
          style={{ backgroundColor: rateColor, borderRadius: 0 }}
          avatar={
            <img
              src={rate === "High" ? warningIcon : checkIcon}
              alt="check icon"
            />
          }
        />
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          {name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography
            variant="h5"
            sx={{
              backgroundColor: "rgba(236, 247, 255, 1)",
              p: 1,
              borderRadius: 2,
              width: "40%",
              color: "rgba(57, 96, 143, 1)",
            }}
          >
            {reward} <span style={{ fontSize: "15px" }}>Reward</span>
          </Typography>
          <Box sx={{ display: "flex", gap: "5px", mt: 1 }}>
            <img src={Clock} alt="icon is not found" height="25px" />
            <Typography variant="body2" sx={{ fontSize: "17px" }}>
              {time}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopicCard;
