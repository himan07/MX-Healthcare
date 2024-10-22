import React, { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../firebase";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const ContactPage = ({ activeStep, setActiveStep }) => {
  const [getOtp, setGetOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const email = localStorage.getItem("userEmail");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isMobile = useMediaQuery("(max-width:600px)");

  const onSubmit = async (data) => {
    if (!getOtp) {
      sendOtp(data.mobile);
    } else {
      verifyOtp(data.otp);
    }
  };

  const sendOtp = (mobile) => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired. Please solve it again.");
          },
        },
        auth
      );
    }

    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = `+91${mobile}`;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmation) => {
        setConfirmationResult(confirmation);
        setGetOtp(true);
        console.log("OTP sent successfully");
      })
      .catch((error) => {
        console.error("Error during signInWithPhoneNumber:", error);
      });
  };

  const verifyOtp = (otp) => {
    confirmationResult
      .confirm(otp)
      .then((result) => {
        console.log("OTP verified successfully", result.user);
        handleVerifyOtp();
      })
      .catch((error) => {
        console.log("Error verifying OTP:", error);
      });
  };

  const handleVerifyOtp = () => {
    navigate("/Identity");
    setActiveStep(activeStep + 1);
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
        height: "calc(100vh - 280px)",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            maxWidth: 600,
            margin: "auto",
            padding: 2,
            boxShadow: 3,
            mt: 10,
          }}
        >
          <CardContent>
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                {!getOtp && (
                  <>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={email}
                      sx={{
                        mb: 2,
                        mt: 3,
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
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      variant="outlined"
                      fullWidth
                      required
                      label="Enter your mobile number"
                      {...register("mobile", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Please enter a valid 10-digit number",
                        },
                      })}
                      error={!!errors.mobile}
                      helperText={errors.mobile ? errors.mobile.message : ""}
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
                    <div id="recaptcha-container"></div>
                  </>
                )}

                {getOtp && (
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Enter OTP for Validation"
                    {...register("otp", {
                      required: "OTP is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Please enter a valid 6-digit OTP",
                      },
                    })}
                    error={!!errors.otp}
                    helperText={errors.otp ? errors.otp.message : ""}
                    sx={{
                      mb: 2,
                      mt: 3,
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
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "right", gap: 2 }}>
              <Button
                variant="contained"
                size="small"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "#02003d",
                  mt: 2,
                  height: "40px",
                  px: 3,
                }}
              >
                {getOtp ? "Verify OTP" : "Get OTP"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
};

export default ContactPage;
