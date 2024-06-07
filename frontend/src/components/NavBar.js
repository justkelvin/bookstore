import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = () => {
  return (
    <AppBar position="static" style={{ background: 'white', boxShadow: 'none', borderBottom: '1px solid #e0e0e0', padding: '5px'}}>
      <Toolbar>
        <Typography variant="h4" oWrap component="div" style={{ color: '#5ACCCC', fontWeight: 'bold', marginRight: '1rem' }}>Ello</Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton edge="start" color="inherit" aria-label="menu" style={{ color: '#5ACCCC', fontSize: '5rem' }}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;