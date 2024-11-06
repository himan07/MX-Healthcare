import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import logo from "../../assets/images/XcelMed1.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const resp = await signInWithEmailAndPassword(auth, email, password);
      if (!resp.user.emailVerified) {
        setLoading(false);
        setErrorMessage(
          "Your email address has not been verified yet. Please check your inbox for the verification email and click the link to verify your email address before logging in."
        );
        return;
      }

      console.log("User logged in: ", resp);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error signing in: ", error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      minHeight="83vh"
      width="80%"
      margin="auto"
    >
      <Box display="flex" width="100%" height="80%" boxShadow={3}>
        <Box
          width="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="#02003d"
        >
          <img
            src={logo}
            alt="image is not found"
            style={{
              height: "70%",
              width: "80%",
            }}
          />
        </Box>

        <Card sx={{ boxShadow: 0, padding: 2, width: "50%" }}>
          <CardContent>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
              Log Into Your Account
            </Typography>

            <Box
              component="form"
              noValidate
              autoComplete="off"
              mt={2}
              onSubmit={handleSubmit}
            >
              <TextField
                label="Email"
                size="large"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

              <TextField
                label="Password"
                size="large"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
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
              <Typography
                variant="body1"
                style={{ color: "red", fontSize: "14px" }}
              >
                {errorMessage}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 6, p: 1.5 }}
                style={{ backgroundColor: "#02003d" }}
                size="large"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} style={{ color: "#fff" }} />
                ) : (
                  "Login"
                )}
              </Button>
              <NavLink to="/" style={{ textDecoration: "none" }}>
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
                  <span style={{ color: "black" }}>Don't have an account?</span>{" "}
                  <span style={{ textDecoration: "underline" }}>
                    click here to create your account.
                  </span>
                </Typography>
              </NavLink>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
