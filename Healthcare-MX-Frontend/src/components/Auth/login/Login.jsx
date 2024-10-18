import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

const Login = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      minHeight="80vh"
      width = "100%"
      margin="auto"
    >
      <Card sx={{ boxShadow: 5, padding: 2, width:"45%"  }}>
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
                mt:3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#02003d', 
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#02003d', 
                  '&.Mui-focused': {
                    color: 'none', 
                  },
                },
              }}
            />

            <TextField
              label="Password"
              size="largex"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              required
              sx={{
                mb: 2,
                mt:3,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#02003d', 
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#02003d', 
                  '&.Mui-focused': {
                    color: 'none', 
                  },
                },
              }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 6 , p:1.5, backgroundColor:"#02003d"}}
              size="large"
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
