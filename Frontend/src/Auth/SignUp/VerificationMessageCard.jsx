import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh", 
  },
  root: {
    padding: "20px 30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    maxWidth: "50%",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
  },
  icon: {
    fontSize: "4rem", 
    color: "#4caf50", 
  },
});

const VerificationMessageCard = () => {
  const classes = useStyles();



  return (
    <Box className={classes.outerContainer}>
      <Box className={classes.root}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <CheckCircleIcon className={classes.icon} fontSize="6rem" />
          </Grid>
          <Grid item>
            <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
              Your account has been created successfully. Please check your email
              and click the verification link to complete the authentication
              process!
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default VerificationMessageCard;
