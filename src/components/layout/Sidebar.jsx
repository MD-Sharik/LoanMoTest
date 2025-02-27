import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
  Typography,
  Avatar,
  Collapse,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  QuestionAnswer as EnquiryIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft
} from '@mui/icons-material';
import styled from 'styled-components';

const StyledDrawer = styled(Drawer)`
  width: ${props => props.compactMode ? '220px' : '240px'};
  flex-shrink: 0;
  
  & .MuiDrawer-paper {
    width: ${props => props.compactMode ? '220px' : '240px'};
    box-sizing: border-box;
    background-color: ${props => props.darkMode ? '#1a1a1a' : '#1e2745'};
    color: #ffffff;
    border-right: none;
  }
`;

const LogoContainer = styled(Box)`
  display: flex;
  align-items: center;
  padding: ${props => props.compactMode ? '12px' : '16px'};
  background-color: ${props => props.darkMode ? '#121212' : '#141829'};
`;

const Logo = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  flex-grow: 1;
`;

const StyledListItem = styled(ListItem)`
  margin: ${props => props.compactMode ? '2px 6px' : '4px 8px'};
  border-radius: 4px;
  transition: all 0.3s ease;
  
  &.active {
    background-color: #1976d2;
  }
  
  &:hover {
    background-color: ${props => props.active ? '#1976d2' : 'rgba(255, 255, 255, 0.08)'};
  }
`;

const SubListItem = styled(ListItem)`
  margin: ${props => props.compactMode ? '1px 6px 1px 12px' : '2px 8px 2px 16px'};
  border-radius: 4px;
  padding-left: ${props => props.compactMode ? '24px' : '32px'};
  transition: all 0.3s ease;
  
  &.active {
    background-color: #9c27b0;
    color: white;
  }
  
  &:hover {
    background-color: ${props => props.active ? '#9c27b0' : 'rgba(255, 255, 255, 0.08)'};
  }
`;

const UserInfo = styled(Box)`
  display: flex;
  align-items: center;
  padding: ${props => props.compactMode ? '12px' : '16px'};
  background-color: ${props => props.darkMode ? '#1e1e1e' : '#1e2745'};
`;

const UserAvatar = styled(Avatar)`
  background-color: #1976d2;
  margin-right: 12px;
  width: ${props => props.compactMode ? '32px' : '40px'};
  height: ${props => props.compactMode ? '32px' : '40px'};
`;

const Sidebar = ({ open, toggleDrawer }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { darkMode, compactMode } = useTheme();
  const muiTheme = useMuiTheme();
  const [enquiryOpen, setEnquiryOpen] = useState(true);

  const handleEnquiryClick = () => {
    setEnquiryOpen(!enquiryOpen);
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isSubActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { 
      text: 'Enquiry Management', 
      icon: <EnquiryIcon />, 
      path: '/enquiry',
      submenu: true,
      subitems: [
        { text: 'All Enquiries', path: '/enquiry/all', color: '#9c27b0' },
        // { text: 'Followups', path: '/followup-history', color: '#9c27b0' }
        // { text: 'New Enquiries', path: '/enquiry/new', color: '#9c27b0' },
      ]
    },
    // { text: 'FollowUp History', icon: <HistoryIcon />, path: '/followup-history' },
    { text: 'Direct Chat', icon: <ChatIcon />, path: '/chat' },
    // { text: 'Team Members', icon: <PeopleIcon />, path: '/team' },
    // { text: 'Assignments', icon: <AssignmentIcon />, path: '/assignments' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' }
  ];

  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={open}
      darkMode={darkMode}
      compactMode={compactMode}
    >
      <LogoContainer darkMode={darkMode} compactMode={compactMode}>
        <Logo variant="h6">
          LoanMo
        </Logo>
        <IconButton onClick={toggleDrawer} sx={{ color: '#ffffff' }}>
          <ChevronLeft />
        </IconButton>
      </LogoContainer>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
      
      <UserInfo darkMode={darkMode} compactMode={compactMode}>
        <UserAvatar compactMode={compactMode}>
          {user?.name?.charAt(0) || 'A'}
        </UserAvatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontSize: compactMode ? '0.9rem' : '1rem' }}>
            {user?.name || 'Admin User'}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, fontSize: compactMode ? '0.75rem' : '0.875rem' }}>
            {user?.role || 'admin'}
          </Typography>
        </Box>
      </UserInfo>
      
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }} />
      
      <List sx={{ padding: compactMode ? '2px' : '4px' }}>
        {menuItems.map((item) => (
          item.submenu ? (
            <Box key={item.text}>
              <StyledListItem 
                button 
                onClick={handleEnquiryClick}
                active={isActive(item.path)}
                className={isActive(item.path) ? 'active' : ''}
                compactMode={compactMode}
              >
                <ListItemIcon sx={{ color: '#ffffff', minWidth: compactMode ? '32px' : '40px' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    style: { 
                      fontSize: compactMode ? '0.85rem' : '0.9rem'
                    } 
                  }}
                />
                {enquiryOpen ? <ExpandLess /> : <ExpandMore />}
              </StyledListItem>
              <Collapse in={enquiryOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subitems.map((subitem) => (
                    <SubListItem
                      button
                      component={Link}
                      to={subitem.path}
                      key={subitem.text}
                      active={isSubActive(subitem.path)}
                      className={isSubActive(subitem.path) ? 'active' : ''}
                      compactMode={compactMode}
                    >
                      <ListItemText 
                        primary={subitem.text} 
                        primaryTypographyProps={{ 
                          style: { 
                            color: isSubActive(subitem.path) ? 'white' : '#4C1A82',
                            fontSize: compactMode ? '0.8rem' : '0.875rem'
                          } 
                        }}
                      />
                    </SubListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <StyledListItem
              button
              component={Link}
              to={item.path}
              key={item.text}
              active={isActive(item.path)}
              className={isActive(item.path) ? 'active' : ''}
              compactMode={compactMode}
            >
              <ListItemIcon sx={{ color: '#ffffff', minWidth: compactMode ? '32px' : '40px' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  style: { 
                    fontSize: compactMode ? '0.85rem' : '0.9rem'
                  } 
                }}
              />
            </StyledListItem>
          )
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar; 