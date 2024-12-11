import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";

const ProfilePage = () => {
  // Define the progress value
  const progress = 25; // Matches the screenshot's progress percentage

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#fff",
      }}
    >
      {/* Circular Progress with percentage */}
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          marginRight: "16px",
        }}
      >
        <CircularProgress
          variant="determinate"
          value={progress}
          size={50}
          thickness={5}
          sx={{
            color: "rgba(46, 104, 174, 1)", // Blue progress color
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            component="div"
            fontWeight="bold"
            color="textPrimary"
          >
            {progress}%
          </Typography>
        </Box>
      </Box>

      {/* Profile Text Content */}
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Profile completeness
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            color="textSecondary"
          >
            Answer more profile questions to increase your chances of being
            chosen for studies.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
