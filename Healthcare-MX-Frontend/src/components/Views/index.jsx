import React from "react";
import { Grid } from "@mui/material";
import SideBarLayout from "./Themes/SidebarLayout/SidebarLayout";
import Dashboard from "./DashboardPage/Dashboard";

const HomeLayout = ({ isDrawerOpen, setDrawerOpen }) => {
  return (
    <Grid container spacing={2}>
      <SideBarLayout
        setDrawerOpen={setDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
      <Grid item xs={12}>
        <Dashboard />
      </Grid>
    </Grid>
  );
};

export default HomeLayout;
