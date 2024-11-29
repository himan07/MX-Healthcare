import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Navbar = () => {
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
          <Box>
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
