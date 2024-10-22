import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import CustomStepper from "./Stepper";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import PersonalDetails from "./Personal Details/PersonalDetails";
import ProfessionalPage from "./Professional Details/ProfessionalPage";
import { makeStyles } from "@mui/styles";
import ContactPage from "./ContactPage/ContactPage";
import AddressPage from "./Addresspage/AddressPage";

const useStyles = makeStyles({
  root: {
    padding: "20px 30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    margin: "30px auto",
    maxWidth: "90%",
    height: "auto !important",
    overflowY: "scroll",
  },
});

const Registration = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/professional":
        setActiveStep(1);
        break;
      case "/contactPage":
        setActiveStep(2);
        break;
      case "/address":
        setActiveStep(3);
        break;
      default:
        setActiveStep(0);
    }
  }, [location.pathname]);

  const handleStepChange = (newStep) => {
    setActiveStep(newStep);

    switch (newStep) {
      case 1:
        navigate("/professional");
        break;
      case 2:
        navigate("/contactPage");
        break;
      case 4:
        navigate("/address");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <>
  
 
    <Box className={classes.root}>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomStepper activeStep={activeStep} />
        </Grid>
        <Grid item xs={12}>
          <Routes>
            <Route
              path="/"
              element={
                <PersonalDetails
                  activeStep={activeStep}
                  setActiveStep={handleStepChange}
                  setEmail={setEmail}
                  setProfession={setProfession}
                  profession={profession}
                  email={email}
                  setCountry={setCountry}
                />
              }
            />
            <Route
              path="/professional"
              element={
                <ProfessionalPage
                  activeStep={activeStep}
                  setActiveStep={handleStepChange}
                  profession={profession}
                  country={country}
                />
              }
            />
            <Route
              path="/contactPage"
              element={
                <ContactPage
                  activeStep={activeStep}
                  setActiveStep={handleStepChange}
                  email={email}
                />
              }
            />
      
            <Route
              path="/address"
              element={
                <AddressPage
                  activeStep={activeStep}
                  setActiveStep={handleStepChange}
                />
              }
            />
          </Routes>
        </Grid>
      </Grid>
    </Box>
    </>
  );
};

export default Registration;
