import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "rgba(42, 106, 157, 1)",
              fontWeight: "bold",
            }}
          >
            XCEL MED CONNECT
          </Typography>
          <Box onClick={handleClick}>
            <Typography
              color="primary"
              sx={{
                cursor: "pointer",
                background: "rgba(57, 96, 143, 1))",
                "&:hover": {
                  opacity: 0.8,
                },
              }}
            >
              Login
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Navbar;
