import { useState } from 'react';
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
  TextField,
  IconButton,
  Card,
  CardHeader,
  CardContent
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon
} from '@mui/icons-material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChatContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 180px);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const ChatHeader = styled(Box)`
  background-color: #1976d2;
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
`;

const ChatMessages = styled(Box)`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #f5f7fb;
`;

const ChatInputContainer = styled(Box)`
  display: flex;
  padding: 16px;
  background-color: white;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
`;

const UserAvatar = styled(Avatar)`
  background-color: ${props => props.bgcolor || '#1976d2'};
  margin-right: 16px;
`;

const ContactsList = styled(List)`
  padding: 0;
  height: calc(100vh - 180px);
  overflow-y: auto;
`;

const ContactItem = styled(ListItem)`
  border-radius: 8px;
  margin: 4px 0;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(25, 118, 210, 0.08);
  }
  
  &.active {
    background-color: rgba(25, 118, 210, 0.12);
  }
`;

const MessageBubble = styled(Box)`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  margin-bottom: 8px;
  position: relative;
  word-wrap: break-word;
  
  ${props => props.sent ? `
    align-self: flex-end;
    background-color: #1976d2;
    color: white;
    border-bottom-right-radius: 4px;
  ` : `
    align-self: flex-start;
    background-color: white;
    border-bottom-left-radius: 4px;
  `}
`;

const MessageTime = styled(Typography)`
  font-size: 0.7rem;
  color: ${props => props.sent ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
  text-align: ${props => props.sent ? 'right' : 'left'};
  margin-top: 4px;
`;

const Chat = () => {
  const [message, setMessage] = useState('');
  const [activeContact, setActiveContact] = useState(0);
  
  // Sample data
  const contacts = [
    { id: 1, name: 'Alexander Pierce', status: 'online', avatar: 'A', bgcolor: '#1976d2', unread: 2 },
    { id: 2, name: 'Sarah Bullock', status: 'offline', avatar: 'S', bgcolor: '#d32f2f', unread: 0 },
    { id: 3, name: 'Norman', status: 'online', avatar: 'N', bgcolor: '#2e7d32', unread: 1 },
    { id: 4, name: 'Jane', status: 'away', avatar: 'J', bgcolor: '#ed6c02', unread: 0 },
    { id: 5, name: 'John', status: 'online', avatar: 'J', bgcolor: '#9c27b0', unread: 0 },
    { id: 6, name: 'Nora', status: 'offline', avatar: 'N', bgcolor: '#0288d1', unread: 0 },
    { id: 7, name: 'Nadia', status: 'online', avatar: 'N', bgcolor: '#7b1fa2', unread: 0 },
  ];
  
  const conversations = [
    {
      contactId: 1,
      messages: [
        { id: 1, text: 'Is this template really for free?', time: '2:00 pm', sent: false },
        { id: 2, text: 'Yes, it is completely free and open source!', time: '2:05 pm', sent: true },
        { id: 3, text: 'Working with AdminLTE on a great new app! Wanna join?', time: '5:37 pm', sent: false },
        { id: 4, text: 'I would love to hear more about it.', time: '5:38 pm', sent: true },
        { id: 5, text: 'What kind of features are you implementing?', time: '5:39 pm', sent: true },
      ]
    },
    {
      contactId: 2,
      messages: [
        { id: 1, text: 'You better believe it!', time: '2:05 pm', sent: false },
        { id: 2, text: 'I\'m working on a new project.', time: '2:10 pm', sent: true },
        { id: 3, text: 'That sounds interesting!', time: '6:10 pm', sent: false },
      ]
    },
    {
      contactId: 3,
      messages: [
        { id: 1, text: 'Looking forward to your reply', time: '9:00 am', sent: false },
        { id: 2, text: 'Sorry for the delay, I was in a meeting.', time: '11:30 am', sent: true },
      ]
    }
  ];
  
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // In a real app, you would send this to an API
      // For now, we'll just clear the input
      setMessage('');
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const getConversation = (contactId) => {
    return conversations.find(conv => conv.contactId === contactId)?.messages || [];
  };
  
  const activeContactData = contacts[activeContact];
  const activeConversation = getConversation(activeContactData.id);
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>Direct Chat</Typography>
      </Grid>
      
      <Grid item xs={12} md={4}>
        <StyledPaper>
          <Typography variant="h6" gutterBottom>Contacts</Typography>
          <Divider sx={{ mb: 2 }} />
          
          <ContactsList>
            {contacts.map((contact, index) => (
              <ContactItem 
                button 
                key={contact.id}
                className={activeContact === index ? 'active' : ''}
                onClick={() => setActiveContact(index)}
              >
                <ListItemAvatar>
                  <UserAvatar bgcolor={contact.bgcolor}>
                    {contact.avatar}
                  </UserAvatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="subtitle1">{contact.name}</Typography>
                      {contact.unread > 0 && (
                        <Avatar 
                          sx={{ 
                            width: 20, 
                            height: 20, 
                            fontSize: '0.75rem',
                            bgcolor: '#f44336'
                          }}
                        >
                          {contact.unread}
                        </Avatar>
                      )}
                    </Box>
                  }
                  secondary={
                    <Box display="flex" alignItems="center">
                      <Box 
                        component="span" 
                        sx={{ 
                          width: 8, 
                          height: 8, 
                          borderRadius: '50%', 
                          display: 'inline-block',
                          mr: 1,
                          bgcolor: contact.status === 'online' 
                            ? '#4caf50' 
                            : contact.status === 'away' 
                              ? '#ff9800' 
                              : '#bdbdbd'
                        }} 
                      />
                      <Typography variant="body2" component="span">
                        {contact.status}
                      </Typography>
                    </Box>
                  }
                />
              </ContactItem>
            ))}
          </ContactsList>
        </StyledPaper>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <ChatContainer>
          <ChatHeader>
            <UserAvatar bgcolor={activeContactData.bgcolor}>
              {activeContactData.avatar}
            </UserAvatar>
            <Box>
              <Typography variant="h6">{activeContactData.name}</Typography>
              <Box display="flex" alignItems="center">
                <Box 
                  component="span" 
                  sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    display: 'inline-block',
                    mr: 1,
                    bgcolor: activeContactData.status === 'online' 
                      ? '#4caf50' 
                      : activeContactData.status === 'away' 
                        ? '#ff9800' 
                        : '#bdbdbd'
                  }} 
                />
                <Typography variant="body2" component="span">
                  {activeContactData.status}
                </Typography>
              </Box>
            </Box>
          </ChatHeader>
          
          <ChatMessages>
            <Box display="flex" flexDirection="column">
              {activeConversation.map(msg => (
                <Box key={msg.id} display="flex" flexDirection="column" alignItems={msg.sent ? 'flex-end' : 'flex-start'}>
                  <MessageBubble sent={msg.sent}>
                    {msg.text}
                  </MessageBubble>
                  <MessageTime sent={msg.sent} variant="caption">
                    {msg.time}
                  </MessageTime>
                </Box>
              ))}
            </Box>
          </ChatMessages>
          
          <ChatInputContainer>
            <IconButton color="primary" sx={{ mr: 1 }}>
              <AttachFileIcon />
            </IconButton>
            <IconButton color="primary" sx={{ mr: 1 }}>
              <EmojiIcon />
            </IconButton>
            <TextField
              fullWidth
              placeholder="Type a message..."
              variant="outlined"
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <IconButton 
              color="primary" 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              sx={{ ml: 1 }}
            >
              <SendIcon />
            </IconButton>
          </ChatInputContainer>
        </ChatContainer>
      </Grid>
    </Grid>
  );
};

export default Chat;