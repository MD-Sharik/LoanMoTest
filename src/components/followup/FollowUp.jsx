import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Breadcrumbs,
  Chip,
  Grid
} from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import styled from 'styled-components';

const PageTitle = styled(Typography)`
  font-weight: 500;
  margin-bottom: 16px;
`;

const StyledPaper = styled(Paper)`
  margin-bottom: 24px;
  border-radius: 4px;
  overflow: hidden;
`;

const DetailHeader = styled(Box)`
  background-color: #333;
  color: white;
  padding: 12px 16px;
`;

const DetailContent = styled(Box)`
  padding: 16px;
`;

const DetailRow = styled(Box)`
  display: flex;
  margin-bottom: 8px;
`;

const DetailLabel = styled(Typography)`
  font-weight: 500;
  width: 120px;
  flex-shrink: 0;
`;

const DetailValue = styled(Typography)`
  color: ${props => props.theme.palette.text.secondary};
`;

const StatusChip = styled(Chip)`
  font-weight: 500;
`;

const FollowUp = () => {
  // Mock data for customer details
  const customerData = {
    name: 'MR. Jitendra Jitendra',
    email: 'jitendra@example.com',
    number: '8920669974',
    date: '2025-02-27 00:00:00',
    status: 'Pending'
  };

  // Mock data for follow-up history
  const followUpData = [
    {
      id: 1,
      details: 'OLD Hf Deluxe Exchange Me Deke New Leni Hai 1 Week Ke Andar And Kal Tak Visit Kar Lenege',
      status: 'Interested',
      substatus: 'Assign To Field',
      fieldOfficer: 'LOVELEEN SINGH',
      showroom: '',
      opportunitySubstatus: '',
      nextFollowDate: '28/2/2025',
      nextFollowTime: '18:27',
      createUser: 'MANISHA KUMARI'
    }
  ];

  return (
    <Box>
      {/* Breadcrumbs */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
            Home
          </Link>
          <Typography color="text.primary">FollowUp History</Typography>
        </Breadcrumbs>
      </Box>

      {/* Page Title */}
      <PageTitle variant="h5">FollowUp History</PageTitle>

      {/* Customer Details */}
      <StyledPaper elevation={2}>
        <DetailHeader>
          <Typography variant="subtitle1">Customer Details</Typography>
        </DetailHeader>
        <DetailContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <DetailRow>
                <DetailLabel variant="body2">Name</DetailLabel>
                <DetailValue variant="body2">{customerData.name}</DetailValue>
              </DetailRow>
            </Grid>
            <Grid item xs={12} md={4}>
              <DetailRow>
                <DetailLabel variant="body2">Date</DetailLabel>
                <DetailValue variant="body2">{customerData.date}</DetailValue>
              </DetailRow>
            </Grid>
            <Grid item xs={12} md={4}>
              <DetailRow>
                <DetailLabel variant="body2">Email</DetailLabel>
                <DetailValue variant="body2">{customerData.email}</DetailValue>
              </DetailRow>
            </Grid>
            <Grid item xs={12} md={4}>
              <DetailRow>
                <DetailLabel variant="body2">Status</DetailLabel>
                <DetailValue variant="body2">
                  <StatusChip 
                    label={customerData.status} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                </DetailValue>
              </DetailRow>
            </Grid>
            <Grid item xs={12} md={4}>
              <DetailRow>
                <DetailLabel variant="body2">Number</DetailLabel>
                <DetailValue variant="body2">{customerData.number}</DetailValue>
              </DetailRow>
            </Grid>
          </Grid>
        </DetailContent>
      </StyledPaper>

      {/* Follow-up History Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>SL No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Details</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Substatus</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Field Officer</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Showroom</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Opportunity Substatus</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Next Follow Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Next Follow Time</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Create User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {followUpData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.details}</TableCell>
                <TableCell>
                  <Chip 
                    label={row.status} 
                    size="small" 
                    color="primary" 
                    sx={{ backgroundColor: '#3f51b5', color: 'white' }}
                  />
                </TableCell>
                <TableCell>{row.substatus}</TableCell>
                <TableCell>{row.fieldOfficer}</TableCell>
                <TableCell>{row.showroom}</TableCell>
                <TableCell>{row.opportunitySubstatus}</TableCell>
                <TableCell>{row.nextFollowDate}</TableCell>
                <TableCell>{row.nextFollowTime}</TableCell>
                <TableCell>{row.createUser}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FollowUp; 