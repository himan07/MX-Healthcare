import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Steps from "../components/Stepper/Stepper";
import { makeStyles } from "@mui/styles";
import { useLocation } from "react-router-dom";
import "../assets/styles/authLayout.css"

const useStyles = makeStyles({
  root: {
    padding: "20px 30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    maxWidth: "100%",
    width: "30%",
    overflowY: "scroll",
    margin: "40px 50px",
  },
});

const AuthLayout = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();
  

  const storedStep = localStorage.getItem("activeStep");
  const initialStep = storedStep ? parseInt(storedStep, 10) : 0;

  const [activeStep, setActiveStep] = useState(initialStep);

  const steps = ["Personal Details", "Verify", "Professional Details"];

  useEffect(() => {
    if (activeStep >= 0 && activeStep <= 2) {
      localStorage.setItem("activeStep", activeStep);
    }
  }, [activeStep]);

  const justifyContent = location.pathname === "/" ? "flex-end" : "center";

  const alignItems =
    location.pathname === "/register/verification" ? "center" : "flex-start";

  return (
    <Grid
      container
      justifyContent={justifyContent}
      alignItems={alignItems}
    >
      <Box className={classes.root}>
        <Steps steps={steps} activeStep={activeStep} />
        <Grid item xs={12}>
          {React.cloneElement(children, { activeStep, setActiveStep })}
        </Grid>
      </Box>
    </Grid>
  );
};

export default AuthLayout;
