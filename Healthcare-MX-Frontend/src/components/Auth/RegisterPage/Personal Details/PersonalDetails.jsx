import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  Autocomplete,
  Paper,
  Popper,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/system";
import countries from "../../../../dev-data/CountyData.json";
import professions from "../../../../dev-data/Profession.json";
import SendIcon from "@mui/icons-material/Send";
import { Link, useNavigate } from "react-router-dom";
import "../../../../assets/css/PersonalDetails.css";
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

const PersonalDetails = ({ activeStep, setActiveStep, setEmail, email }) => {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    trigger,
    control,
  } = useForm();

  const isMobile = useMediaQuery("(max-width:600px)");
  const profession = localStorage.getItem("profession");

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const emailRef = useRef(null);
  const confirmEmailRef = useRef(null);
  const countryRef = useRef(null);
  const mobileRef = useRef(null);
  const professionRef = useRef(null);
  const crtificateNoRef = useRef(null);
  const marketResearch = useRef(null);

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

  const onSubmit = async (data) => {
    console.log("data: ", data);
    const personalDetails = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      country: data.country,
      mobileNo: Number(data.mobileno),
      profession: data.profession,
      medicalNo: data.Medical,
    };

    const isValid = await trigger();

    if (isValid) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3000/api/personalDetails",
          personalDetails
        );
        console.log("Response:", response.data);
        navigate("/professional");
        setActiveStep(activeStep + 1);
      } catch (error) {
        setErr(error);
      }
    }
  };

  return (
    <Box className={`form-container ${isMobile ? "mobile" : ""}`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={`form-section ${isMobile ? "mobile" : ""}`}>
          <Box sx={{ flex: 1 }}>
            <TextField
              inputRef={firstNameRef}
              variant="outlined"
              fullWidth
              label="First Name"
              {...register("firstName", { required: "First name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName ? errors.firstName.message : ""}
              className="form-input"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#02003d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#02003d",
                  "&.Mui-focused": {
                    color: "none",
                  },
                },
              }}
              onKeyDown={(e) => handleKeyDown(e, firstNameRef, lastNameRef)}
            />
            <TextField
              inputRef={passwordRef}
              variant="outlined"
              fullWidth
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Minimum eight characters, at least one letter, one number, and one special character",
                },
              })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              className="form-input"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#02003d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#02003d",
                  "&.Mui-focused": {
                    color: "none",
                  },
                },
              }}
              onChange={(e) => {
                setPassword(e.target.value);
                clearErrors("password");
                setValue("password", e.target.value);
              }}
              onKeyDown={(e) =>
                handleKeyDown(e, passwordRef, confirmPasswordRef)
              }
            />

            <TextField
              inputRef={emailRef}
              variant="outlined"
              fullWidth
              label="Email"
              {...register("email", {
                required: "Email is required",
                onChange: (e) => {
                  setEmail(e.target.value);
                  localStorage.setItem("userEmail", e.target.value);
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              className="form-input"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#02003d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#02003d",
                  "&.Mui-focused": {
                    color: "none",
                  },
                },
              }}
              onKeyDown={(e) => handleKeyDown(e, emailRef, confirmEmailRef)}
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
                {err.response?.data?.message.length > 0 ? (
                  <>
                    Email already exists.{" "}
                    <Link
                      to="/professional"
                      style={{ color: "red", textDecoration: "underline" }}
                    >
                      Click here to complete your profile
                    </Link>
                  </>
                ) : (
                  err.message
                )}
              </Typography>
            ) : (
              ""
            )}

            <TextField
              inputRef={mobileRef}
              variant="outlined"
              fullWidth
              label="Mobile Number"
              {...register("mobileno", {
                required: "Mobile Number is required",
              })}
              error={!!errors.mobileno}
              helperText={errors.mobileno ? errors.mobileno.message : ""}
              className="form-input"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#02003d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#02003d",
                  "&.Mui-focused": {
                    color: "none",
                  },
                },
              }}
              onKeyDown={(e) => handleKeyDown(e, mobileRef, countryRef)}
            />
            <Autocomplete
              fullWidth
              disablePortal={true}
              options={professions}
              getOptionLabel={(option) => option.profession}
              onChange={(event, value) => {
                if (value) {
                  localStorage.setItem("profession", value.profession);
                }
              }}
              PopperComponent={(props) => <StyledPopper {...props} />}
              PaperComponent={(props) => <StyledPaper {...props} />}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Profession"
                  variant="outlined"
                  {...register("profession", {
                    required: "Profession is required",
                  })}
                  error={!!errors.profession}
                  helperText={
                    errors.profession ? errors.profession.message : ""
                  }
                  inputRef={professionRef}
                  className="form-input"
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#02003d",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "#02003d",
                      "&.Mui-focused": {
                        color: "none",
                      },
                    },
                  }}
                  onKeyDown={(e) =>
                    handleKeyDown(e, professionRef, crtificateNoRef)
                  }
                />
              )}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              inputRef={lastNameRef}
              variant="outlined"
              fullWidth
              label="Last Name"
              {...register("lastName", { required: "Last Name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName ? errors.lastName.message : ""}
              className="form-input"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#02003d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#02003d",
                  "&.Mui-focused": {
                    color: "none",
                  },
                },
              }}
              onKeyDown={(e) => handleKeyDown(e, lastNameRef, passwordRef)}
            />
            <TextField
              inputRef={confirmPasswordRef}
              variant="outlined"
              fullWidth
              label="Confirm Password"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
              className="form-input"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#02003d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#02003d",
                  "&.Mui-focused": {
                    color: "none",
                  },
                },
              }}
              onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef, emailRef)}
            />
            <TextField
              inputRef={confirmEmailRef}
              variant="outlined"
              fullWidth
              label="Confirm Email"
              {...register("confirmEmail", {
                required: "Confirm email is required",
                validate: (value) => value === email || "Email do not match",
              })}
              error={!!errors.confirmEmail}
              helperText={
                errors.confirmEmail ? errors.confirmEmail.message : ""
              }
              className="form-input"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#02003d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#02003d",
                  "&.Mui-focused": {
                    color: "none",
                  },
                },
              }}
              onKeyDown={(e) => handleKeyDown(e, confirmEmailRef, mobileRef)}
            />
            <Autocomplete
              fullWidth
              disablePortal={false}
              PopperComponent={(props) => <StyledPopper {...props} />}
              PaperComponent={(props) => <StyledPaper {...props} />}
              options={countries.map((item) => item.country)}
              onChange={(event, value) => {
                localStorage.setItem("country", value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  variant="outlined"
                  {...register("country", { required: "Country is required" })}
                  error={!!errors.country}
                  helperText={errors.country ? errors.country.message : ""}
                  inputRef={countryRef}
                  onKeyDown={(e) => handleKeyDown(e, countryRef, professionRef)}
                />
              )}
              className="form-input"
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#02003d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#02003d",
                  "&.Mui-focused": {
                    color: "none",
                  },
                },
              }}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Enter Your Medical License/Certification Number"
              {...register("Medical", {
                required: "Medical Certificate is required",
              })}
              error={!!errors.Medical}
              helperText={errors.Medical ? errors.Medical.message : ""}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#02003d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#02003d",
                  "&.Mui-focused": {
                    color: "none",
                  },
                },
              }}
              inputRef={crtificateNoRef}
              onKeyDown={(e) =>
                handleKeyDown(e, crtificateNoRef, marketResearch)
              }
            />
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Controller
            name="marketResearch"
            control={control}
            defaultValue={false}
            rules={{
              required: "You must opt-in to participate in market research.",
            }}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label={
                  <Typography className="checkbox-label">
                    I opt-in to participate in market research and other
                    healthcare studies.
                  </Typography>
                }
              />
            )}
          />
          {errors.marketResearch && (
            <Typography color="error" sx={{ fontSize: "0.8rem" }}>
              {errors.marketResearch.message}
            </Typography>
          )}

          <Controller
            name="termsAgreement"
            control={control}
            defaultValue={false}
            rules={{ required: "You must agree to the Terms of Use." }}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label={
                  <Typography className="checkbox-label">
                    By checking this box, you confirm you have read and agree to
                    our{" "}
                    <a
                      href="/terms-of-use"
                      target="_blank"
                      className="terms-text"
                    >
                      Terms of Use
                    </a>
                    ,{" "}
                    <a href="/privacy" target="_blank" className="terms-text">
                      Privacy Policy
                    </a>
                    , and{" "}
                    <a
                      href="/compensation"
                      target="_blank"
                      className="terms-text"
                    >
                      Compensation Provisions
                    </a>
                    .
                  </Typography>
                }
              />
            )}
          />
          {errors.termsAgreement && (
            <Typography color="error" sx={{ fontSize: "0.8rem" }}>
              {errors.termsAgreement.message}
            </Typography>
          )}
          <Controller
            name="ageConfirmation"
            control={control}
            defaultValue={false}
            rules={{ required: "You must confirm your age." }}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label={
                  <Typography className="checkbox-label">
                    I confirm that I am 18 years of age or older.
                  </Typography>
                }
              />
            )}
          />
          {errors.ageConfirmation && (
            <Typography color="error" sx={{ fontSize: "0.8rem" }}>
              {errors.ageConfirmation.message}
            </Typography>
          )}
        </Box>

        <Box className="submit-section">
          <Typography className="submit-info">
            You will be asked to provide a photo ID for identity verification.
            If you do not wish to provide this during registration, you can
            skip, but a representative may request an alternate form of
            verification.
          </Typography>
          <Button
            variant="contained"
            size="small"
            type="submit"
            className="submit-button"
            endIcon={<SendIcon />}
            style={{ backgroundColor: "#02003d" }}
          >
            Continue
          </Button>
        </Box>
      </form>
      <Typography
        variant="body1"
        sx={{
          color: "blue",
          p: 3,
          mt: 2,
          textAlign: "center",
          fontSize: "17px",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Click here to login
        </Link>
      </Typography>
    </Box>
  );
};

export default PersonalDetails;
