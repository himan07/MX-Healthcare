import React, { useState } from "react";
import { Box, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import "../../../assets/css/Stepper.css";

const steps = [
  "Personal Details",
  "Professional Details",
  "Contact Details",
  "Address",
];

const CustomStepper = ({activeStep}) => {

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: "1.1rem", 
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default CustomStepper;


