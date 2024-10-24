import * as React from "react";
import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";
import Logo from "../../../../assets/images/XcelMed2.svg";

const TopbarLayout = ({ setDrawerOpen }) => {
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#02003d", boxShadow: "none", height: "80px" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2, cursor: "pointer" }}
          >
            <Menu />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                height: "90px",
                width: "auto",
                borderRadius: "5px",
              }}
            />
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              flexGrow: 1,
              ml: 2,
            }}
          >
            World Wide Healthcare Experts Panel
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopbarLayout;
