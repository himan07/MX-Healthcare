import React from "react";
import { Grid } from "@mui/material";
import SideBarLayout from "./Themes/SidebarLayout/SidebarLayout";
import Dashboard from "./DashboardPage/Dashboard";

const HomeLayout = () => {
  return (
    <Grid container spacing={2}>
        <SideBarLayout />
      <Grid item xs={12}>
        <Dashboard />
      </Grid>
    </Grid>
  );
};

export default HomeLayout;
