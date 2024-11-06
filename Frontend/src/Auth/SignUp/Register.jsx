import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Autocomplete,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Popper,
  Paper,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  DialogActions,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MuiTelInput } from "mui-tel-input";
import "react-phone-input-2/lib/style.css";
import "../../assets/css/register.css";
import professions from "./dev-data/Profession.json";
import { styled } from "@mui/system";
import CustomeFileUploader from "./CustomeFileUploader";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import OtpInput from "react-otp-input";
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
  const navigate = useNavigate();
  const classes = useStyles();
  const [phonenumber, setPhonenumber] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [setErr, err] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = useForm();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const genderRef = useRef(null);
  const ageRef = useRef(null);
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const zipcodeRef = useRef(null);
  const professionRef = useRef(null);
  const crtificateNoRef = useRef(null);
  const marketResearch = useRef(null);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

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
    console.log(data);
    let email = data.email;
    let password = data.password;
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await sendEmailVerification(user);

      setTimeout(() => {
        setLoading(false);
      }, 2000);

      const isValid = await trigger();
      const createUserSchema = {
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        age: selectedDate,
        email: data.email,
        mobileNo: Number(phonenumber),
        zipcode: Number(data.zip),
        profession: data.profession,
        medicalCertificateNo: data.Medical,
        notification: {
          sms: data.sms,
          whatsApp: data.WhatsApp,
        },
      };

      if (isValid) {
        const response = await axios.post(
          "http://127.0.0.1:3000/api/createUser",
          createUserSchema
        );
        console.log(response);
      }
    } catch (error) {
      setErr(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        const { emailVerified } = userCred;
        if (!emailVerified) {
          alert(
            "Registration successful! Please check your email for verification."
          );
          navigate("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <Box className={classes.root}>
      <Typography
        variant="h5"
        sx={{ textAlign: "left", pb: 3, fontWeight: "bold" }}
      >
        Register to Unlock Benefits
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            onKeyDown={(e) => handleKeyDown(e, lastNameRef, genderRef)}
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
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                inputRef={genderRef}
                label="Select Gender"
                variant="outlined"
                {...register("gender", { required: "Gender is required" })}
                error={!!errors.gender}
                helperText={errors.gender ? errors.gender.message : ""}
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
                onKeyDown={(e) => handleKeyDown(e, genderRef, ageRef)}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            fullWidth
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date of Birth (DD/MM/YYYY)"
              value={selectedDate}
              onChange={(newValue) => {
                setSelectedDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="DD/MM/YYYY"
                  fullWidth
                  variant="outlined"
                  inputRef={ageRef}
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
                  onKeyDown={(e) => handleKeyDown(e, ageRef, emailRef)}
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
          <Box flexGrow={1} flexBasis="0">
            <TextField
              inputRef={emailRef}
              variant="outlined"
              fullWidth
              label="Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
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
              onKeyDown={(e) => handleKeyDown(e, emailRef, mobileRef)}
            />
          </Box>
          <Box flexGrow={1} flexBasis="0">
            <Box sx={{ display: "flex", gap: 1 }}>
              <MuiTelInput
                defaultCountry="IN"
                placeholder="Enter your mobile number"
                inputRef={mobileRef}
                value={phonenumber}
                onChange={setPhonenumber}
                onKeyDown={(e) => handleKeyDown(e, mobileRef, passwordRef)}
                style={{
                  width: "100%",
                  height: "56px",
                  borderRadius: "4px",
                  border: "1px solid #02003d",
                  color: "#000",
                }}
              />
              <Button
                variant="contained"
                size="small"
                style={{
                  backgroundColor: verify ? "#ddd" : "#4caf50",
                  textTransform: "capitalize",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  width: "15%",
                  height: "40px",
                  margin: "8px 0px",
                }}
                onClick={(e) => setOpenDialog(true)}
                disabled={verify}
              >
                {!verify ? "Verify" : verify ? "Verified" : ""}
              </Button>
            </Box>
            {verify === false && phonenumber.length >= 12 ? (
              <Typography
                variant="body1"
                sx={{ color: "red", fontSize: "14px" }}
              >
                To complete your registration, please verify your mobile number
                !
              </Typography>
            ) : (
              ""
            )}
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
            inputRef={confirmPasswordRef}
            variant="outlined"
            fullWidth
            label="Confirm Password"
            type="password"
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
              inputRef={zipcodeRef}
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
              onKeyDown={(e) => handleKeyDown(e, zipcodeRef, professionRef)}
            />
          </Box>
          <Box display="flex" sx={{ width: "100%" }}>
            <Typography variant="body1" sx={{ color: "#02003d", mr: 2, mt: 2 }}>
              Push Notifications:
            </Typography>
            <Controller
              name="sms"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label={
                    <Typography className="checkbox-label">SMS</Typography>
                  }
                />
              )}
            />
            <Controller
              name="WhatsApp"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label={
                    <Typography className="checkbox-label">WhatsApp</Typography>
                  }
                />
              )}
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
            PopperComponent={(props) => (
              <StyledPopper {...props} key="popper" />
            )}
            PaperComponent={(props) => <StyledPaper {...props} key="paper" />}
            renderOption={(props, option) => (
              <li {...props} key={option.profession}>
                {option.profession}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Profession"
                variant="outlined"
                inputRef={professionRef}
                {...register("profession", {
                  required: "Profession is required",
                })}
                error={!!errors.profession}
                helperText={errors.profession ? errors.profession.message : ""}
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

        <Box sx={{ mb: 3, display: "grid" }}>
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

        <Box
          className="submit-section"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Typography className="submit-info">
            You will be asked to provide a photo ID for identity verification.
            If you do not wish to provide this during registration, you can
            skip, but a representative may request an alternate form of
            verification.
          </Typography>
          <Button
            variant="contained"
            size="large"
            type="submit"
            className="submit-button"
            style={{ backgroundColor: verify === false ? "#ddd" : "#02003d" }}
            sx={{ width: "15%", m: "auto", mt: 2 }}
            disabled={verify === false}
          >
            {loading ? (
              <CircularProgress size={24} style={{ color: "#fff" }} />
            ) : (
              "Register"
            )}
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
            <span style={{ color: "black" }}>Already have an account?</span>{" "}
            <span style={{ textDecoration: "underline" }}>
              Click here to login
            </span>
          </Typography>
        </NavLink>
      </form>
      <Box>
        <Dialog
          open={openDialog}
          sx={{ padding: "10px" }}
          onClose={(e) => setOpenDialog(false)}
        >
          <DialogTitle>Please Enter OTP</DialogTitle>
          <Divider />
          <DialogContent sx={{ padding: "30px" }}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span> &nbsp;&nbsp;</span>}
              renderInput={(props) => (
                <TextField
                  {...props}
                  focused
                  style={{
                    width: "55px",
                    height: "55px",
                    fontSize: "1.5rem",
                    textAlign: "center",
                    margin: "0 5px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              )}
            />
          </DialogContent>
          <Divider />
          <DialogActions sx={{ padding: "10px" }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#C70039" }}
              onClick={() => {
                setVerify(false);
                setOpenDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#02003d" }}
              onClick={(e) => {
                setVerify(true);
                setOpenDialog(false);
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Register;
