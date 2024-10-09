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

const ContactPage = ({ activeStep, setActiveStep }) => {
  const [getOtp, setGetOtp] = useState(false);

  const email = localStorage.getItem("userEmail");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isMobile = useMediaQuery("(max-width:600px)");

  const onSubmit = (data) => {
    if (!getOtp) {
      console.log("Mobile Number Submitted:", data.mobile);
      setGetOtp(true);
    } else {
      console.log("OTP Submitted:", data.otp);
      handleVerifyOtp();
    }
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
                      sx={{ mb: 2, mt: 3 }}
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
                      sx={{ mb: 2 }}
                    />
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
                    sx={{ mb: 2, mt: 3 }}
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
                  backgroundColor: "#1359a0",
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
