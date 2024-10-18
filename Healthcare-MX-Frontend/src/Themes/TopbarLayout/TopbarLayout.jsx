import * as React from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Logo from "../../assets/images/XcelMed2.svg";

const TopbarLayout = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#02003d", boxShadow: "none", height:"80px" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                height: "100px",
                width: "auto",
                borderRadius: "5px",
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              flexGrow: 1,
            }}
          >
           XCEL MED CONNECT - World Wide Healthcare Experts Panel
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopbarLayout;
