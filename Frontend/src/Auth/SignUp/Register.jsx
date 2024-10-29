import React, { useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Autocomplete,
  Box,
  TextField,
  Link,
  FormControlLabel,
  Checkbox,
  Typography,
  Popper,
  Paper,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../assets/css/register.css";
import professions from "./dev-data/Profession.json";
import { styled } from "@mui/system";
import CustomeFileUploader from "./CustomeFileUploader";
import SendIcon from "@mui/icons-material/Send";
import { NavLink } from "react-router-dom";

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

const Register = () => {
  const classes = useStyles();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    trigger,
    control,
  } = useForm();

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
        // onSubmit();
        // currentRef.current.form.submit();
      }
    }
  };

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <Box className={classes.root}>
      <form>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
          gap={2}
        >
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
            inputRef={lastNameRef}
            variant="outlined"
            fullWidth
            label="Last Name"
            {...register("lastName", { required: "Last Name is required" })}
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ""}
            className="form-input"
            sx={{
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
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
          gap={2}
        >
          <Autocomplete
            options={genderOptions}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Gender"
                variant="outlined"
                sx={{
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
            )}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Birth"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  variant="outlined"
                  sx={{
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
              )}
              minDate={new Date("1900-01-01")}
              maxDate={new Date()}
            />
          </LocalizationProvider>
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
          gap={2}
        >
          <Box flexGrow={1}>
            <TextField
              inputRef={firstNameRef}
              variant="outlined"
              fullWidth
              label="Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
              className="form-input"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#02003d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#02003d",
                  "&.Mui-focused": {
                    color: "#02003d",
                  },
                },
              }}
              onKeyDown={(e) => handleKeyDown(e, firstNameRef, lastNameRef)}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Link href="#" underline="hover" color="#02003d" variant="body2">
                Verify Email
              </Link>
            </Box>
          </Box>
          <Box flexGrow={1}>
            <PhoneInput
              className="phone-input"
              country={"in"}
              placeholder="Enter your mobile number"
              inputStyle={{
                width: "100%",
                borderRadius: "4px",
                border: "1px solid #02003d",
                height: "56px",
                padding: "16.5px 14px",
                fontSize: "1rem",
                outline: "none",
                color: "#000",
              }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
              <Link href="#" underline="hover" color="#02003d" variant="body2">
                Verify Mobile
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
          gap={2}
        >
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
            onKeyDown={(e) => handleKeyDown(e, passwordRef, confirmPasswordRef)}
          />
          <TextField
            inputRef={passwordRef}
            variant="outlined"
            fullWidth
            label="Confirm Password"
            type="confirmpassword"
            {...register("confirmpassword", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "Minimum eight characters, at least one letter, one number, and one special character",
              },
            })}
            error={!!errors.confirmpassword}
            helperText={
              errors.confirmpassword ? errors.confirmpassword.message : ""
            }
            className="form-input"
            sx={{
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
            onKeyDown={(e) => handleKeyDown(e, passwordRef, confirmPasswordRef)}
          />
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
          gap={2}
        >
          <Box sx={{ width: "100%" }}>
            <TextField
              inputRef={firstNameRef}
              variant="outlined"
              fullWidth
              label="Zip Code"
              type="zip"
              {...register("zip", { required: "Zip Code is required" })}
              error={!!errors.zip}
              helperText={errors.zip ? errors.zip.message : ""}
              className="form-input"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#02003d",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#02003d",
                  "&.Mui-focused": {
                    color: "#02003d",
                  },
                },
              }}
              onKeyDown={(e) => handleKeyDown(e, firstNameRef, lastNameRef)}
            />
          </Box>
          <Box display="flex" sx={{ width: "100%" }}>
            <Typography variant="body1" sx={{ color: "#02003d", mr: 2, mt: 2 }}>
              Push Notifications:
            </Typography>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="SMS"
              sx={{
                color: "#02003d",
                "& .MuiCheckbox-root": {
                  padding: "0 9px",
                },
              }}
            />

            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="WhatsApp"
              sx={{
                color: "#02003d",
                "& .MuiCheckbox-root": {
                  padding: "0 9px",
                },
              }}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
          gap={2}
        >
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
            onKeyDown={(e) => handleKeyDown(e, crtificateNoRef, marketResearch)}
          />
        </Box>
        <Box>
          <CustomeFileUploader />
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
          {/* {errors.termsAgreement && (
            <Typography color="error" sx={{ fontSize: "0.8rem" }}>
              {errors.termsAgreement.message}
            </Typography>
          )} */}
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
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <Typography
            variant="body1"
            sx={{
              color: "blue",
              p: 3,
              mt: 2,
              textAlign: "center",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            Already have an account?{" "}
            <span style={{ textDecoration: "underline" }}>
              Click here to login
            </span>
          </Typography>
        </NavLink>
      </form>
    </Box>
  );
};

export default Register;
