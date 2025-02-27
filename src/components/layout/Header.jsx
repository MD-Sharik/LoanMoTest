import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Box,
  Avatar,
  Tooltip,
  useTheme as useMuiTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  AccountCircle,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import styled from 'styled-components';

const StyledAppBar = styled(AppBar)`
  background-color: ${props => props.darkMode ? '#1a1a1a' : '#1976d2'};
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  z-index: 1201;
  width: ${props => props.open ? `calc(100% - ${props.compactMode ? '220px' : '240px'})` : '100%'};
  margin-left: ${props => props.open ? (props.compactMode ? '220px' : '240px') : 0};
  transition: width 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
  height: ${props => props.compactMode ? '56px' : '64px'};
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  padding-left: ${props => props.compactMode ? '12px' : '16px'};
  padding-right: ${props => props.compactMode ? '12px' : '16px'};
  min-height: ${props => props.compactMode ? '56px' : '64px'} !important;
`;

const LeftSection = styled(Box)`
  display: flex;
  align-items: center;
`;

const RightSection = styled(Box)`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled(Avatar)`
  background-color: ${props => props.darkMode ? '#333' : 'white'};
  color: ${props => props.darkMode ? 'white' : '#1976d2'};
  cursor: pointer;
  margin-left: 16px;
  width: ${props => props.compactMode ? '32px' : '40px'};
  height: ${props => props.compactMode ? '32px' : '40px'};
`;

const NotificationBadge = styled(Badge)`
  .MuiBadge-badge {
    background-color: #e91e63;
    color: white;
    font-size: ${props => props.compactMode ? '0.65rem' : '0.75rem'};
    height: ${props => props.compactMode ? '16px' : '20px'};
    min-width: ${props => props.compactMode ? '16px' : '20px'};
  }
`;

const Header = ({ open, toggleDrawer }) => {
  const { user, logout } = useAuth();
  const { darkMode, compactMode } = useTheme();
  const muiTheme = useMuiTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [messagesAnchorEl, setMessagesAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMessagesMenuOpen = (event) => {
    setMessagesAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
    setMessagesAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const handleSettingsClick = () => {
    handleMenuClose();
    navigate('/settings');
  };

  return (
    <StyledAppBar 
      position="fixed" 
      open={open} 
      darkMode={darkMode} 
      compactMode={compactMode}
    >
      <StyledToolbar compactMode={compactMode}>
        <LeftSection>
          {!open && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{ mr: 2 }}
              size={compactMode ? 'small' : 'medium'}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant={compactMode ? 'subtitle1' : 'h6'} 
            noWrap 
            component="div" 
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            {open ? '' : 'LoanMo CRM'}
          </Typography>
        </LeftSection>

        <RightSection>
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit" 
              onClick={handleNotificationsMenuOpen}
              size={compactMode ? 'small' : 'large'}
            >
              <NotificationBadge badgeContent={4} color="error" compactMode={compactMode}>
                <NotificationsIcon fontSize={compactMode ? 'small' : 'medium'} />
              </NotificationBadge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Messages">
            <IconButton
              color="inherit"
              onClick={handleMessagesMenuOpen}
              size={compactMode ? 'small' : 'large'}
              sx={{ ml: compactMode ? 1 : 2 }}
            >
              <NotificationBadge badgeContent={3} color="error" compactMode={compactMode}>
                <MailIcon fontSize={compactMode ? 'small' : 'medium'} />
              </NotificationBadge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Account">
            <UserAvatar 
              onClick={handleProfileMenuOpen} 
              darkMode={darkMode} 
              compactMode={compactMode}
            >
              {user?.name?.charAt(0) || 'A'}
            </UserAvatar>
          </Tooltip>
        </RightSection>
      </StyledToolbar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1">{user?.name || 'Admin User'}</Typography>
          <Typography variant="body2" color="textSecondary">{user?.email || 'admin@loanmo.com'}</Typography>
        </Box>
        <MenuItem onClick={handleMenuClose}>
          <AccountCircle sx={{ mr: 2 }} /> Profile
        </MenuItem>
        <MenuItem onClick={handleSettingsClick}>
          <SettingsIcon sx={{ mr: 2 }} /> Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 2 }} /> Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationsAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>New enquiry from John Doe</MenuItem>
        <MenuItem onClick={handleMenuClose}>Follow-up reminder: Sarah Smith</MenuItem>
        <MenuItem onClick={handleMenuClose}>New message from Alexander Pierce</MenuItem>
        <MenuItem onClick={handleMenuClose}>System update available</MenuItem>
      </Menu>

      {/* Messages Menu */}
      <Menu
        anchorEl={messagesAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(messagesAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Alexander Pierce: Is this template really for free?</MenuItem>
        <MenuItem onClick={handleMenuClose}>Sarah Bullock: You better believe it!</MenuItem>
        <MenuItem onClick={handleMenuClose}>Norman: Looking forward to your reply</MenuItem>
      </Menu>
    </StyledAppBar>
  );
};

export default Header; 