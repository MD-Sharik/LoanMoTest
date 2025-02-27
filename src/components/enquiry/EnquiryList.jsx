import { useState } from 'react';
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
  TablePagination,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  Select,
  MenuItem,
  Grid,
  Tooltip,
  InputLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const TableHeaderCell = styled(TableCell)`
  font-weight: bold;
  background-color: #f5f7fb;
  cursor: pointer;
  user-select: none;
`;

const StatusChip = styled(Chip)`
  font-weight: 500;
`;

const ActionButton = styled(Button)`
  margin-left: 8px;
  text-transform: none;
  font-weight: 500;
`;

const EnquiryList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [numberFilter, setNumberFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortField, setSortField] = useState('slNo');
  const [sortDirection, setSortDirection] = useState('asc');

  // Sample data
  const enquiries = [
    { 
      slNo: 1,
      name: 'MR. Jitendra Jitendra', 
      number: '8920669974', 
      modelName: 'HF DELUXE KICK',
      location: 'NIHAL VIHAR WEST DELHI',
      status: 'Interested',
      createdAt: '27-02-2025'
    },
    { 
      slNo: 2,
      name: 'Rahul Sharma', 
      number: '9876543210', 
      modelName: 'SPLENDOR+',
      location: 'ROHINI DELHI',
      status: 'Followup',
      createdAt: '26-02-2025'
    },
    { 
      slNo: 3,
      name: 'Priya Singh', 
      number: '8765432109', 
      modelName: 'PASSION PRO',
      location: 'DWARKA DELHI',
      status: 'Interested',
      createdAt: '25-02-2025'
    },
    { 
      slNo: 4,
      name: 'Amit Kumar', 
      number: '7654321098', 
      modelName: 'GLAMOUR',
      location: 'JANAKPURI DELHI',
      status: 'Not Interested',
      createdAt: '24-02-2025'
    },
    { 
      slNo: 5,
      name: 'Neha Gupta', 
      number: '6543210987', 
      modelName: 'XTREME 160R',
      location: 'PITAMPURA DELHI',
      status: 'Followup',
      createdAt: '23-02-2025'
    },
    { 
      slNo: 6,
      name: 'Vikram Malhotra', 
      number: '9876543211', 
      modelName: 'XPULSE 200',
      location: 'LAXMI NAGAR DELHI',
      status: 'Interested',
      createdAt: '22-02-2025'
    },
    { 
      slNo: 7,
      name: 'Pooja Verma', 
      number: '8765432100', 
      modelName: 'PLEASURE+',
      location: 'SAKET DELHI',
      status: 'Not Interested',
      createdAt: '21-02-2025'
    },
    { 
      slNo: 8,
      name: 'Rajesh Khanna', 
      number: '7654321099', 
      modelName: 'DESTINI 125',
      location: 'VASANT KUNJ DELHI',
      status: 'Followup',
      createdAt: '20-02-2025'
    },
    { 
      slNo: 9,
      name: 'Sunita Patel', 
      number: '6543210988', 
      modelName: 'MAESTRO EDGE',
      location: 'KAROL BAGH DELHI',
      status: 'Interested',
      createdAt: '19-02-2025'
    },
    { 
      slNo: 10,
      name: 'Deepak Sharma', 
      number: '9876543212', 
      modelName: 'HF DELUXE',
      location: 'CONNAUGHT PLACE DELHI',
      status: 'Followup',
      createdAt: '18-02-2025'
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleApplyFilters = () => {
    // Apply filters logic here
    setPage(0);
  };

  const handleClearFilters = () => {
    setDateRange('');
    setNameFilter('');
    setNumberFilter('');
    setStatusFilter('');
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Interested':
        return { bg: '#2196f3', color: 'white' };
      case 'Followup':
        return { bg: '#ff9800', color: 'white' };
      case 'Not Interested':
        return { bg: '#f44336', color: 'white' };
      default:
        return { bg: '#757575', color: 'white' };
    }
  };

  // Filter and sort enquiries
  let filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.number.includes(searchQuery) ||
      enquiry.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      enquiry.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesName = nameFilter ? enquiry.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
    const matchesNumber = numberFilter ? enquiry.number.includes(numberFilter) : true;
    const matchesStatus = statusFilter ? enquiry.status === statusFilter : true;
    // Date range filtering would be implemented here with proper date parsing
    
    return matchesSearch && matchesName && matchesNumber && matchesStatus;
  });

  // Sort the filtered enquiries
  filteredEnquiries = [...filteredEnquiries].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return typeof aValue === 'string' ? aValue.localeCompare(bValue) : aValue - bValue;
    } else {
      return typeof aValue === 'string' ? bValue.localeCompare(aValue) : bValue - aValue;
    }
  });

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5" mb={3}>Enquiry</Typography>
        
        <StyledPaper>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <Typography variant="body1" fontWeight="bold" mb={1}>From Date:</Typography>
              <TextField
                type="text"
                placeholder="02/27/2025 - 02/27/2025"
                fullWidth
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" fontWeight="bold" mb={1}>Name:</Typography>
              <TextField
                placeholder="Enter Name"
                fullWidth
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" fontWeight="bold" mb={1}>Number:</Typography>
              <TextField
                placeholder="Enter Number With Comma"
                fullWidth
                value={numberFilter}
                onChange={(e) => setNumberFilter(e.target.value)}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="body1" fontWeight="bold" mb={1}>Status:</Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Interested">Interested</MenuItem>
                  <MenuItem value="Followup">Followup</MenuItem>
                  <MenuItem value="Not Interested">Not Interested</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-start" mt={1}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleApplyFilters}
                sx={{ mr: 1 }}
              >
                Apply
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleClearFilters}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>

      <StyledPaper>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" mr={1}>Show</Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                displayEmpty
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body1" ml={1}>entries</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" mr={1}>Search:</Typography>
            <TextField
              placeholder=""
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ width: 200 }}
            />
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell onClick={() => handleSort('slNo')}>
                  SL No. {getSortIcon('slNo')}
                </TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort('name')}>
                  Name {getSortIcon('name')}
                </TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort('number')}>
                  Number {getSortIcon('number')}
                </TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort('modelName')}>
                  Model Name {getSortIcon('modelName')}
                </TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort('location')}>
                  Location {getSortIcon('location')}
                </TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort('status')}>
                  Status {getSortIcon('status')}
                </TableHeaderCell>
                <TableHeaderCell onClick={() => handleSort('createdAt')}>
                  Created at {getSortIcon('createdAt')}
                </TableHeaderCell>
                <TableHeaderCell>Action</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEnquiries
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const statusColor = getStatusColor(row.status);
                  return (
                    <TableRow key={row.slNo} hover>
                      <TableCell>{row.slNo}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.number}</TableCell>
                      <TableCell>{row.modelName}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>
                        <StatusChip 
                          label={row.status} 
                          size="small"
                          style={{ 
                            backgroundColor: statusColor.bg,
                            color: statusColor.color
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell>
                        <Button 
                          variant="contained" 
                          size="small" 
                          color="primary"
                          startIcon={<EditIcon />}
                          sx={{ mr: 1, textTransform: 'none' }}
                        >
                          FollowUp
                        </Button>
                        <Button 
                          variant="contained" 
                          size="small" 
                          color="success"
                          sx={{ mr: 1, textTransform: 'none' }}
                        >
                          Add FollowUp
                        </Button>
                        <Button 
                          variant="contained" 
                          size="small" 
                          color="info"
                          sx={{ textTransform: 'none' }}
                        >
                          LoanProcessing
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Typography variant="body2">
            Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredEnquiries.length)} of {filteredEnquiries.length} entries
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              sx={{ mr: 1 }}
            >
              Previous
            </Button>
            <Button 
              variant="contained" 
              sx={{ mr: 1 }}
            >
              1
            </Button>
            <Button 
              variant="outlined" 
              disabled={page >= Math.ceil(filteredEnquiries.length / rowsPerPage) - 1}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default EnquiryList; 