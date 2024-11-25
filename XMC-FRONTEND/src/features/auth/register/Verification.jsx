import React, { useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import InputField from "../../../components/InputField/InputField";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignUp, useSignIn } from "@clerk/clerk-react";
import { verifyMobileOtp } from "../../../utils/verifyMobileOtp";
import axios from "axios";

const Verification = ({ setActiveStep }) => {
  const { signUp, isLoaded } = useSignUp();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("userEmail");
  const phonenumber = localStorage.getItem("phonenumber");

  const {
    register,
    handleSubmit,
    formState: { errors },
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
      verifyMobileOtp(Number(phonenumber), Number(data.phoneOtp));
      setActiveStep((prevStep) => prevStep + 1);
      navigate("/register/professional-details");
    } catch (err) {
      console.error("Verification failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();
    try {
      const url = `https://select-swift-42.clerk.accounts.dev/v1/me/email_addresses/${email}/prepare_verification`;

      const response = await axios.post(
        url,
        new URLSearchParams({
          strategy: "email_code",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Verification email resent successfully:", response.data);
    } catch (error) {
      console.error(
        "Error resending verification email:",
        error.response?.data || error.message
      );
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
              <a
                href=""
                className="terms-text"
                onClick={(e) => handleResendVerification(e)}
              >
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
