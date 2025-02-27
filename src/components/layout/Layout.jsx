import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, useTheme as useMuiTheme } from '@mui/material';
import { useTheme } from '../../context/ThemeContext';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const drawerWidth = 240;

const Main = styled(Box)`
  flex-grow: 1;
  padding: ${props => props.compactMode ? '12px' : '16px'};
  transition: margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
  margin-top: ${props => props.compactMode ? '56px' : '64px'};
  background-color: ${props => props.darkMode ? '#121212' : '#f5f7fb'};
  min-height: calc(100vh - ${props => props.compactMode ? '56px' : '64px'});
`;

const Layout = () => {
  const [open, setOpen] = useState(true);
  const { darkMode, compactMode } = useTheme();
  const muiTheme = useMuiTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} />
      <Main 
        open={open} 
        darkMode={darkMode} 
        compactMode={compactMode}
      >
        <Outlet />
      </Main>
    </Box>
  );
};

export default Layout; 