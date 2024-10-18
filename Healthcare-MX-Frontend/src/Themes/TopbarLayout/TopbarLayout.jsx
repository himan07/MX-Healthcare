import * as React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';
import Logo from "../../assets/images/XcelMed.png";

const TopbarLayout = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}> 
      <AppBar position="sticky" sx={{ backgroundColor: '#02003d', boxShadow: 'none' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={Logo} 
              alt="Logo" 
              style={{ 
                height: "90px", 
                width: "auto", 
                maxWidth: "200px",
                borderRadius: "5px" 
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopbarLayout;
