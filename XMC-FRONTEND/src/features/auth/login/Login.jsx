import React, { useState } from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import logo from "../../../assets/images/XcelMed1.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const navigate = useNavigate();
  const { signIn, setActive } = useSignIn();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setSnackbar({
          open: true,
          message: "Successfully logged in!",
          severity: "success"
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setSnackbar({
          open: true,
          message: "Something went wrong. Please try again.",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setSnackbar({
        open: true,
        message: error.errors?.[0]?.message || "An error occurred during sign in",
        severity: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="20px"
        minHeight="85vh"
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
                  {snackbar.message}
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

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ 
          vertical: 'top', 
          horizontal: 'right' 
        }}
        sx={{
          marginTop: '50px'
        }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            '& .MuiAlert-action': { 
              alignItems: 'center'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
