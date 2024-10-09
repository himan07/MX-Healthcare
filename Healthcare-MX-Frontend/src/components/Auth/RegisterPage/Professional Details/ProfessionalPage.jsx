import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Paper,
  Popper,
  Grid,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { styled } from "@mui/system";
import countries from "../../../../dev-data/CountyData.json";
import specialities from "../../../../dev-data/Specialities.json";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendIcon from "@mui/icons-material/Send";
import CustomFileUploader from "../../../../CustomeFileUploader";

const StyledPopper = styled(Popper)({
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  marginTop: "8px",
  zIndex: 1000,
  fontSize: "16px",
});

const StyledPaper = styled(Paper)({
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  fontSize: "16px",
});

const ProfessionalPage = ({ activeStep, setActiveStep, profession }) => {
  console.log("profession: ", profession);
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  // Handling keyboard actions
  const organisationNameRef = useRef(null);
  const officialEmailRef = useRef(null);
  const practiceStateRef = useRef(null);
  const practiceyearRef = useRef(null);

  const handleKeyDown = (e, currentRef, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef) {
        nextRef.current.focus();
      } else {
        onSubmit();
        currentRef.current.form.submit();
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isMobile = useMediaQuery("(max-width:600px)");

  const onSubmit = (data) => {
    navigate("/contactPage");
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    navigate("/");
    setActiveStep(activeStep - 1);
  };

  const handleCountryChange = (event, value) => {
    setCountry(value);
  };

  const getOptions = () => {
    if (profession.profession === "Doctor/HCP") {
      return specialities.specialities.flatMap((item) => item.doctors);
    } else if (profession.profession === "Nursing") {
      return specialities.specialities.flatMap((item) => item.nurses);
    }
    return [];
  };

  const options = getOptions();

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
        px: isMobile ? 2 : 4,
        py: 2,
        borderRadius: "8px",
        maxWidth: isMobile ? "100%" : "90%",
        mx: "auto",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} direction="column">
          <Grid item xs={8}>
            <Autocomplete
              fullWidth
              disablePortal={false}
              PopperComponent={(props) => <StyledPopper {...props} />}
              PaperComponent={(props) => <StyledPaper {...props} />}
              options={options}
              getOptionLabel={(option) => options || "Unknown"}
              onChange={handleCountryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select your speciality"
                  variant="outlined"
                  inputRef={organisationNameRef}
                />
              )}
              sx={{ mb: 2 }}
            />
            <Box>
              <CustomFileUploader />
            </Box>

            <TextField
              variant="outlined"
              fullWidth
              inputRef={organisationNameRef}
              label="Please enter the name of your Organisation"
              {...register("organisation", {
                required: "Organisation name is required",
              })}
              error={!!errors.organisation}
              helperText={
                errors.organisation ? errors.organisation.message : ""
              }
              sx={{ mb: 2 }}
              onKeyDown={(e) =>
                handleKeyDown(e, organisationNameRef, officialEmailRef)
              }
            />

            <TextField
              variant="outlined"
              fullWidth
              inputRef={officialEmailRef}
              label="Please enter your official email"
              {...register("email", {
                required: "Official Email is required",
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              sx={{ mb: 2 }}
              onKeyDown={(e) =>
                handleKeyDown(e, officialEmailRef, practiceStateRef)
              }
            />

            <Autocomplete
              fullWidth
              disablePortal={false}
              PopperComponent={(props) => <StyledPopper {...props} />}
              PaperComponent={(props) => <StyledPaper {...props} />}
              options={countries.map((item) => item.country)}
              onChange={handleCountryChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Please select the state of your practice"
                  variant="outlined"
                  inputRef={practiceStateRef}
                />
              )}
              sx={{ mb: 2 }}
              onKeyDown={(e) =>
                handleKeyDown(e, practiceStateRef, practiceyearRef)
              }
            />

            <TextField
              variant="outlined"
              fullWidth
              inputRef={practiceyearRef}
              label="Years of practice"
              type="number"
              {...register("experience", {
                required: "Years of Practice is required",
              })}
              error={!!errors.experience}
              helperText={errors.experience ? errors.experience.message : ""}
              sx={{ mb: 2 }}
              onKeyDown={(e) => handleKeyDown(e, practiceyearRef, null)}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "right", gap: 2 }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#ffb366",
              mt: 2,
              height: "45px",
            }}
            startIcon={<ArrowBackIosIcon />}
            onClick={handleBack}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: "#1359a0",
              mt: 2,
              height: "45px",
            }}
            type="submit"
            endIcon={<SendIcon />}
          >
            Continue
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProfessionalPage;
