import React, { useState } from "react";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import InputField from "../../../components/InputField/InputField";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/clerk-react";
import { verifyMobileOtp } from "../../../utils/verifyMobileOtp";
import axios from "axios";
import { handleOtpSend } from "../../../utils/RegisterFn";

const Verification = ({ setActiveStep }) => {
  const { signUp, isLoaded } = useSignUp();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const phonenumber = localStorage.getItem("phonenumber");

  const userData = JSON.parse(localStorage.getItem("Data"));
  const countryCode = localStorage.getItem("countryCode");

  console.log("userData", userData);

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
      const mobileVerification = await verifyMobileOtp(
        Number(phonenumber),
        Number(data.phoneOtp)
      );

      if (mobileVerification === true) {
        const personalInfo = {
          email: userData.email,
          mobileNumber: Number(`${countryCode}${userData.mobile}`),
          name: `${userData.firstName} ${userData.lastName}`,
          gender: userData.gender,
          zipcode: Number(userData.zipcode),
          dateOfBirth: userData.dateOfBirth,
          profession: userData.professions,
          privacyPolicy: userData.termsAgreement,
        };

        await signUp.attemptEmailAddressVerification({ code: data.emailOtp });

        const response = await axios.post(
          "http://127.0.0.1:3000/create-personalInfo",
          personalInfo
        );

        if (response.status === 201) {
          setActiveStep((prevStep) => prevStep + 1);
          navigate("/register/professional-details");
        } else {
          console.error(
            "Failed to save personal information:",
            response.statusText
          );
        }
      } else {
        console.error("Mobile verification failed");
      }
    } catch (err) {
      console.error("Verification failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async (e) => {
    e.preventDefault();
    try {
      const userEmail = sessionStorage.getItem("userEmail");
      if (signUp.status === "missing_requirements") {
        const userData = JSON.parse(localStorage.getItem("Data"));
        await signUp.create({
          emailAddress: userEmail || userData.email,
          password: userData.password,
        });
      }
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      await handleOtpSend(userData.mobile);
    } catch (error) {
      console.error(
        "Error resending verification email:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        padding: {
          xs: "20px 10px",
          sm: "25px 15px",
          md: "30px 20px",
        },
      }}
    >
      <form onSubmit={handleSubmit(handleVerify)} style={{ width: "100%" }}>
        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 2.5, md: 3 },
            padding: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            margin: "auto",
          }}
        >
          <Typography variant="body1" sx={{ fontSize: "14px" }}>
            We've sent an OTP to your email ({userData.email}) and phone (
            {userData.mobile}). please enter the OTP below to verify your
            account.
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body1" sx={{ fontSize: "15px" }}>
              <a
                href=""
                className="terms-text"
                onClick={(e) => handleResendVerification(e)}
              >
                Didn't receive the code? Resend
              </a>
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2, sm: 2.5, md: 3 }, 
            }}
          >
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
                sx={{
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
                sx={{
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
