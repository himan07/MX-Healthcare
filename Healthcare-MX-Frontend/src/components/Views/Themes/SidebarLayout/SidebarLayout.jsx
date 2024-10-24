import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,
  IconButton,
  Toolbar,
} from "@mui/material";
import { Home, AccountBox, CheckBox, Redeem, Menu } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import GradeIcon from "@mui/icons-material/Grade";

const menuItems = [
  {
    text: (
      <Typography
        variant="subtitle1"
        style={{ color: "#0063cc", fontWeight: "bold" }}
      >
        Points: 500
      </Typography>
    ),
    icon: <GradeIcon style={{ color: "#0063cc", fontWeight: "bold" }} />,
  },
  { text: "Home", icon: <Home /> },
  { text: "Account", icon: <AccountBox /> },
  { text: "Surveys", icon: <CheckBox /> },
  { text: "Rewards", icon: <Redeem /> },
  { text: "Logout", icon: <LogoutIcon /> },
];

const SidebarMenuItem = ({ text, icon }) => (
  <ListItem button>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

const SideBarLayout = ({setDrawerOpen, isDrawerOpen}) => {

  return (
    <Box sx={{ display: "flex" }}>
      {/* <Toolbar>
        <IconButton
          sx={{
            backgroundColor: "#02003d",
            color: "white",
            width: 48,
            height: 48,
            borderRadius: 2,
            padding: 0,
            marginTop: -5,
            marginLeft: -0.2,
            "&:hover": {
              backgroundColor: "#02003d",
            },
          }}
          aria-label="menu"
          onClick={() => setDrawerOpen(!isDrawerOpen)}
        >
          <Menu />
        </IconButton>
      </Toolbar> */}

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={()=> setDrawerOpen(!isDrawerOpen)}
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: 250,
            boxSizing: "border-box",
            marginTop: "80px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 2,
            paddingBottom: 2,
          }}
        >
          <Avatar sx={{ width: 80, height: 80, mb: 2 }} />
          <Typography
            variant="h6"
            style={{ color: "#0063cc", fontWeight: "bold" }}
          >
            Jonas Scheteman
          </Typography>
        </Box>
        <List sx={{ ml: 2 }}>
          {menuItems.map(({ text, icon }) => (
            <SidebarMenuItem key={text} text={text} icon={icon} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideBarLayout;
