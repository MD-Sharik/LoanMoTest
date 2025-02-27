import { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  TextField,
  IconButton
} from '@mui/material';
import {
  TrendingUp,
  People,
  AssignmentTurnedIn,
  Warning,
  Send as SendIcon,
  CheckCircle
} from '@mui/icons-material';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styled from 'styled-components';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StyledPaper = styled(Paper)`
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StatCard = styled(StyledPaper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
`;

const StatIcon = styled(Avatar)`
  background-color: ${props => props.bgcolor};
  width: 48px;
  height: 48px;
`;

const ChatContainer = styled(StyledPaper)`
  max-height: 400px;
  display: flex;
  flex-direction: column;
`;

const ChatMessages = styled(List)`
  flex-grow: 1;
  overflow-y: auto;
  max-height: 300px;
`;

const ChatInputContainer = styled(Box)`
  display: flex;
  padding-top: 16px;
`;

const UserAvatar = styled(Avatar)`
  background-color: ${props => props.bgcolor || '#1976d2'};
`;

const Dashboard = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alexander Pierce', text: 'Is this template really for free?', time: '2:00 pm', avatar: 'A' },
    { id: 2, sender: 'Sarah Bullock', text: 'You better believe it!', time: '2:05 pm', avatar: 'S' },
    { id: 3, sender: 'Alexander Pierce', text: 'Working with AdminLTE on a great new app! Wanna join?', time: '5:37 pm', avatar: 'A' },
  ]);

  const handleSendMessage = () => {
    if (chatMessage.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        sender: 'Admin User',
        text: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: 'A'
      };
      setMessages([...messages, newMessage]);
      setChatMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Chart data
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Enquiries',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Conversions',
        data: [28, 48, 40, 19, 36, 27],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Followups',
        data: [15, 19, 18, 16, 19, 17],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Conversions',
        data: [2, 3, 1, 2, 1, 2],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Team members data
  const teamMembers = [
    { id: 1, name: 'Alexander Pierce', date: 'Today', avatar: 'A', bgcolor: '#1976d2' },
    { id: 2, name: 'Norman', date: 'Yesterday', avatar: 'N', bgcolor: '#2e7d32' },
  ];

  return (
    <Grid container spacing={3}>
      {/* Stats Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard>
          <Box>
            <Typography variant="h4" fontWeight="bold">10%</Typography>
            <Typography variant="body1" color="textSecondary">Total Enquiry</Typography>
          </Box>
          <StatIcon bgcolor="#1976d2">
            <TrendingUp />
          </StatIcon>
        </StatCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard>
          <Box>
            <Typography variant="h4" fontWeight="bold">41,410</Typography>
            <Typography variant="body1" color="textSecondary">Total Followup</Typography>
          </Box>
          <StatIcon bgcolor="#2e7d32">
            <People />
          </StatIcon>
        </StatCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard>
          <Box>
            <Typography variant="h4" fontWeight="bold">760</Typography>
            <Typography variant="body1" color="textSecondary">Total Lost</Typography>
          </Box>
          <StatIcon bgcolor="#d32f2f">
            <Warning />
          </StatIcon>
        </StatCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard>
          <Box>
            <Typography variant="h4" fontWeight="bold">2,000</Typography>
            <Typography variant="body1" color="textSecondary">Total AssignField</Typography>
          </Box>
          <StatIcon bgcolor="#4caf50">
            <CheckCircle />
          </StatIcon>
        </StatCard>
      </Grid>

      {/* Today's Stats */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard>
          <Box>
            <Typography variant="h4" fontWeight="bold">10%</Typography>
            <Typography variant="body1" color="textSecondary">Today Enquiry</Typography>
          </Box>
          <StatIcon bgcolor="#1976d2">
            <TrendingUp />
          </StatIcon>
        </StatCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard>
          <Box>
            <Typography variant="h4" fontWeight="bold">41,410</Typography>
            <Typography variant="body1" color="textSecondary">Today Followup</Typography>
          </Box>
          <StatIcon bgcolor="#2e7d32">
            <People />
          </StatIcon>
        </StatCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard>
          <Box>
            <Typography variant="h4" fontWeight="bold">760</Typography>
            <Typography variant="body1" color="textSecondary">Today Lost</Typography>
          </Box>
          <StatIcon bgcolor="#d32f2f">
            <Warning />
          </StatIcon>
        </StatCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard>
          <Box>
            <Typography variant="h4" fontWeight="bold">2,000</Typography>
            <Typography variant="body1" color="textSecondary">Today Assign Field</Typography>
          </Box>
          <StatIcon bgcolor="#4caf50">
            <CheckCircle />
          </StatIcon>
        </StatCard>
      </Grid>

      {/* Charts */}
      <Grid item xs={12} md={8}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>Enquiry & Conversion Trends</Typography>
              <Box sx={{ height: 300 }}>
                <Bar data={barChartData} options={chartOptions} />
              </Box>
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <StyledPaper>
              <Typography variant="h6" gutterBottom>Followup Performance</Typography>
              <Box sx={{ height: 300 }}>
                <Line data={lineChartData} options={chartOptions} />
              </Box>
            </StyledPaper>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} md={4}>
        <Grid container spacing={3}>
          {/* Direct Chat */}
          <Grid item xs={12}>
            <ChatContainer>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Direct Chat with Staff</Typography>
                <Typography variant="body2" color="textSecondary">3</Typography>
              </Box>
              <Divider />
              <ChatMessages>
                {messages.map((message) => (
                  <ListItem key={message.id} alignItems="flex-start">
                    <ListItemAvatar>
                      <UserAvatar>{message.avatar}</UserAvatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="subtitle2">{message.sender}</Typography>
                          <Typography variant="caption" color="textSecondary">{message.time}</Typography>
                        </Box>
                      }
                      secondary={message.text}
                    />
                  </ListItem>
                ))}
              </ChatMessages>
              <Divider />
              <ChatInputContainer>
                <TextField
                  fullWidth
                  placeholder="Type Message ..."
                  variant="outlined"
                  size="small"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <IconButton 
                  color="primary" 
                  onClick={handleSendMessage}
                  disabled={!chatMessage.trim()}
                  sx={{ ml: 1 }}
                >
                  <SendIcon />
                </IconButton>
              </ChatInputContainer>
            </ChatContainer>
          </Grid>

          {/* Latest Field Members */}
          <Grid item xs={12}>
            <StyledPaper>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Latest Field Members</Typography>
                <Typography variant="body2" color="primary">8 New Members</Typography>
              </Box>
              <Divider />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {teamMembers.slice(0, 8).map((member) => (
                  <Grid item xs={6} key={member.id}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <UserAvatar bgcolor={member.bgcolor}>{member.avatar}</UserAvatar>
                      <Typography variant="body2" sx={{ mt: 1 }}>{member.name}</Typography>
                      <Typography variant="caption" color="textSecondary">{member.date}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard; 