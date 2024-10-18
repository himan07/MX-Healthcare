import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import logo from "../../../assets/images/XcelMed1.png";

const Login = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      minHeight="80vh"
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
              height: "80%",
              width: "80%",
            }}
          />
        </Box>

        <Card sx={{ boxShadow: 0, padding: 2, width: "50%" }}>
          <CardContent>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
              Log Into Your Account
            </Typography>

            <Box component="form" noValidate autoComplete="off" mt={2}>
              <TextField
                label="Email"
                size="large"
                variant="outlined"
                fullWidth
                margin="normal"
                required
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

              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: 6, p: 1.5, backgroundColor: "#02003d" }}
                size="large"
              >
                Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
