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
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { styled } from "@mui/system";
import states from "../../../../dev-data/states.json";
import specialities from "../../../../dev-data/Specialities.json";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SendIcon from "@mui/icons-material/Send";
import CustomFileUploader from "../../../../CustomeFileUploader";
import axios from "axios";

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

const ProfessionalPage = ({ activeStep, setActiveStep }) => {
  const profession = localStorage.getItem("profession");
  const country = localStorage.getItem("country");
  const [speciality, setSpeciality] = useState("");
  const [err, setErr] = useState("");

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

  const onSubmit = async (data) => {
    console.log(data);
    const professionalInfo = {
      specialty: speciality,
      image: data.image,
      nameOfOrganization: data.organisation,
      officialEmail: data.email,
      state: data.state,
      yearsOfPractice: data.experience,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/api/professionalDetails",
        professionalInfo
      );
      console.log(response);
      navigate("/contactPage");
      setActiveStep(activeStep + 1);
    } catch (error) {
      console.log(error);
      setErr(error);
    }
  };

  const handleBack = () => {
    navigate("/");
    setActiveStep(activeStep - 1);
  };

  const getOptions = () => {
    if (profession === "Doctor/HCP") {
      return specialities.data.doctors;
    } else if (profession === "Nursing") {
      return specialities.data.nurses;
    } else if (profession === "Lab Tech (Radio)") {
      return specialities.data.labTech;
    } else if (profession === "Non Clinical HCP") {
      return specialities.data.nonClinicalHcp;
    } else if (profession === "Pharmacy") {
      return specialities.data.pharmacySpecialities;
    } else if (profession === "Public Health") {
      return specialities.data.publicHealthSpecialities;
    } else if (profession === "Medical Student") {
      return specialities.data.medicalSpecialities;
    }
    return [];
  };

  console.log("country.country", country);

  const getStates = () => {
    if (country === "India") {
      return states?.data?.India;
    } else if (country === "United States") {
      return states?.data?.us;
    } else if (country === "Germany") {
      return states?.data?.Germany;
    } else if (country === "Switzerland") {
      return states?.data?.Switzerland;
    } else if (country === "Singapore") {
      return states?.data?.singapore;
    } else if (country === "Japan") {
      return states?.data?.japan;
    } else if (country === "United Kingdom") {
      return states?.data?.uk;
    } else if (country === "France") {
      return states?.data?.France;
    } else if (country === "Canada") {
      return states?.data?.Canada;
    } else if (country === "South Korea") {
      return states?.data?.SouthKorea;
    } else if (country === "China") {
      return states?.data?.china;
    } else if (country === "Israel") {
      return states?.data?.Israel;
    } else if (country === "Australia") {
      return states?.data?.Australia;
    } else if (country === "Netherlands") {
      return states?.data?.Netherlands;
    } else if (country === "Sweden") {
      return states?.data?.sweden;
    } else if (country === "Italy") {
      return states?.data?.Italy;
    } else if (country === "Belgium") {
      return states?.data?.belgium;
    } else if (country === "Brazil") {
      return states?.data?.brazil;
    } else if (country === "Thailand") {
      return states?.data?.Thiland;
    } else if (country === "Mexico") {
      return states?.data?.mexico;
    }
  };

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
              options={getOptions()}
              onChange={(e) => setSpeciality(e.target.value)}
              getOptionLabel={(option) => option || "Unknown"}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select your speciality"
                  variant="outlined"
                  inputRef={organisationNameRef}
                />
              )}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#02003d', 
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#02003d', 
                  '&.Mui-focused': {
                    color: 'none', 
                  },
                },
              }}
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
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#02003d', 
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#02003d', 
                  '&.Mui-focused': {
                    color: 'none', 
                  },
                },
              }}
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
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#02003d', 
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#02003d', 
                  '&.Mui-focused': {
                    color: 'none', 
                  },
                },
              }}
              onKeyDown={(e) =>
                handleKeyDown(e, officialEmailRef, practiceStateRef)
              }
            />
            {err ? (
              <Typography
                variant="body1"
                sx={{
                  fontSize: "18px",
                  color: "red",
                  pt: 2,
                  pb: 2,
                  mt: -3,
                  textAlign: "left",
                }}
              >
                {err.response.data.message ===
                "ProfessionalDetails validation failed: officialEmail: Email already exists" ? (
                  <>
                    Email already exists.{" "}
                    <Link
                      to="/contactPage"
                      style={{ color: "red", textDecoration: "underline" }}
                    >
                      Click here to complete your profile
                    </Link>
                  </>
                ) : (
                  err.response.data.message
                )}
              </Typography>
            ) : (
              ""
            )}

            <Autocomplete
              fullWidth
              disablePortal={false}
              PopperComponent={(props) => <StyledPopper {...props} />}
              PaperComponent={(props) => <StyledPaper {...props} />}
              options={getStates()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Please select the state of your practice"
                  variant="outlined"
                  inputRef={practiceStateRef}
                />
              )}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#02003d', 
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#02003d', 
                  '&.Mui-focused': {
                    color: 'none', 
                  },
                },
              }}
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
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#02003d', 
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#02003d', 
                  '&.Mui-focused': {
                    color: 'none', 
                  },
                },
              }}
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
              backgroundColor: "#02003d",
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
