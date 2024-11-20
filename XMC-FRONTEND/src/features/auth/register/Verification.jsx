import React, { useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import InputField from "../../../components/InputField/InputField";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/clerk-react";

const Verification = ({ setActiveStep }) => {
  const { signUp, isLoaded } = useSignUp();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    navigate(-1);
  };

  const handleVerify = async (data) => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      await signUp.attemptEmailAddressVerification({
        code: data.emailOtp,
      });
      setActiveStep((prevStep) => prevStep + 1);
      navigate("/register/professional-details");
    } catch (err) {
      console.error("Verification failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container>
      <form onSubmit={handleSubmit(handleVerify)}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ fontSize: "14px" }}>
            We've sent an OTP to your email (himan9714@gmail.com) and phone
            (+918127044098). please enter the OTP below to verify your account.
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body1" sx={{ fontSize: "15px" }}>
              <a href="/terms-of-use" target="_blank" className="terms-text">
                Didn't recieve the code? Resend
              </a>
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <InputField
              placeholder="Email OTP"
              register={{
                ...register("emailOtp", {
                  required: "Email Otp is required",
                }),
              }}
              errors={errors.emailOtp}
            />
            <InputField
              placeholder="Phone OTP"
              register={{
                ...register("phoneOtp", {
                  required: "Phone Otp is required",
                }),
              }}
              errors={errors.phoneOtp}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                fullWidth
                style={{
                  backgroundColor: "#000000",
                  textTransform: "capitalize",
                }}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                fullWidth
                style={{
                  backgroundColor: "rgba(46, 104, 174, 1)",
                  textTransform: "capitalize",
                }}
                type="submit"
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Verify"
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Grid>
  );
};

export default Verification;
