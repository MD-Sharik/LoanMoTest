import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Switch,
  FormControlLabel,
  FormGroup,
  Tab,
  Tabs,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  PhotoCamera as PhotoCameraIcon
} from '@mui/icons-material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ProfileAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
  font-size: 3rem;
`;

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Settings = () => {
  const { user, updateUserProfile } = useAuth();
  const { darkMode, compactMode, updateThemeSettings } = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@loanmo.com',
    phone: '9876543210',
    role: user?.role || 'admin'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    newEnquiryAlert: true,
    followupReminders: true,
    systemUpdates: false
  });
  const [appSettings, setAppSettings] = useState({
    darkMode: darkMode,
    compactMode: compactMode,
    language: 'English',
    autoRefresh: true
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    setAppSettings(prev => ({
      ...prev,
      darkMode,
      compactMode
    }));
  }, [darkMode, compactMode]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };

  const handleAppSettingChange = (e) => {
    const { name, checked } = e.target;
    setAppSettings({
      ...appSettings,
      [name]: checked
    });
  };

  const handleSaveProfile = () => {
    // In a real app, you would send this to your backend
    updateUserProfile({
      name: profileData.name,
      email: profileData.email
    });
    
    setSnackbar({
      open: true,
      message: 'Profile updated successfully!',
      severity: 'success'
    });
  };

  const handleSavePassword = () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'Passwords do not match!',
        severity: 'error'
      });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setSnackbar({
        open: true,
        message: 'Password must be at least 6 characters long!',
        severity: 'error'
      });
      return;
    }
    
    // In a real app, you would send this to your backend
    setSnackbar({
      open: true,
      message: 'Password updated successfully!',
      severity: 'success'
    });
    
    // Reset password fields
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleSaveNotifications = () => {
    setSnackbar({
      open: true,
      message: 'Notification settings updated successfully!',
      severity: 'success'
    });
  };

  const handleSaveAppSettings = () => {
    // Update theme context with new settings
    updateThemeSettings({
      darkMode: appSettings.darkMode,
      compactMode: appSettings.compactMode
    });
    
    setSnackbar({
      open: true,
      message: 'Application settings updated successfully!',
      severity: 'success'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Box>
      <Typography variant="h5" mb={3}>Settings</Typography>
      
      <StyledPaper>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab icon={<PersonIcon />} label="Profile" />
          <Tab icon={<SecurityIcon />} label="Security" />
          <Tab icon={<NotificationsIcon />} label="Notifications" />
          <Tab icon={<PaletteIcon />} label="Appearance" />
        </Tabs>
        
        {/* Profile Settings */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
              <ProfileAvatar src={user?.avatar}>
                {profileData.name.charAt(0)}
              </ProfileAvatar>
              <IconButton 
                color="primary" 
                aria-label="upload picture" 
                component="label"
                sx={{ mb: 2 }}
              >
                <input hidden accept="image/*" type="file" />
                <PhotoCameraIcon />
              </IconButton>
              <Typography variant="body2" color="textSecondary" align="center">
                Click the camera icon to upload a new profile picture
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>Personal Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Role"
                    name="role"
                    value={profileData.role}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        
        {/* Security Settings */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>Change Password</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="New Password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Confirm New Password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary"
                onClick={handleSavePassword}
              >
                Update Password
              </Button>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h6" gutterBottom>Two-Factor Authentication</Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            Two-factor authentication adds an extra layer of security to your account
          </Alert>
          <Button variant="outlined" color="primary">
            Enable Two-Factor Authentication
          </Button>
        </TabPanel>
        
        {/* Notification Settings */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>Notification Preferences</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch 
                  checked={notificationSettings.emailNotifications} 
                  onChange={handleNotificationChange}
                  name="emailNotifications"
                  color="primary"
                />
              }
              label="Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={notificationSettings.smsNotifications} 
                  onChange={handleNotificationChange}
                  name="smsNotifications"
                  color="primary"
                />
              }
              label="SMS Notifications"
            />
          </FormGroup>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>Alert Settings</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch 
                  checked={notificationSettings.newEnquiryAlert} 
                  onChange={handleNotificationChange}
                  name="newEnquiryAlert"
                  color="primary"
                />
              }
              label="New Enquiry Alerts"
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={notificationSettings.followupReminders} 
                  onChange={handleNotificationChange}
                  name="followupReminders"
                  color="primary"
                />
              }
              label="Followup Reminders"
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={notificationSettings.systemUpdates} 
                  onChange={handleNotificationChange}
                  name="systemUpdates"
                  color="primary"
                />
              }
              label="System Updates"
            />
          </FormGroup>
          
          <Box mt={3}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSaveNotifications}
            >
              Save Notification Settings
            </Button>
          </Box>
        </TabPanel>
        
        {/* Appearance Settings */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>Theme Settings</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch 
                  checked={appSettings.darkMode} 
                  onChange={handleAppSettingChange}
                  name="darkMode"
                  color="primary"
                />
              }
              label="Dark Mode"
            />
            <FormControlLabel
              control={
                <Switch 
                  checked={appSettings.compactMode} 
                  onChange={handleAppSettingChange}
                  name="compactMode"
                  color="primary"
                />
              }
              label="Compact Mode"
            />
          </FormGroup>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>Application Settings</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch 
                  checked={appSettings.autoRefresh} 
                  onChange={handleAppSettingChange}
                  name="autoRefresh"
                  color="primary"
                />
              }
              label="Auto-refresh Data"
            />
          </FormGroup>
          
          <Box mt={3}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleSaveAppSettings}
            >
              Save Appearance Settings
            </Button>
          </Box>
        </TabPanel>
      </StyledPaper>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 