import React, { useState } from 'react';
import {
  Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const LeaveManagement = () => {
  const { user, hasPermission } = useAuth();
  const [open, setOpen] = useState(false);
  const [leaveType, setLeaveType] = useState('');
  
  const leaves = [
    { id: 1, employee: 'John Doe', type: 'Annual Leave', from: '2025-12-01', to: '2025-12-05', status: 'Pending', days: 5 },
    { id: 2, employee: 'Jane Smith', type: 'Sick Leave', from: '2025-11-25', to: '2025-11-26', status: 'Approved', days: 2 },
    { id: 3, employee: 'Mike Johnson', type: 'Annual Leave', from: '2025-12-10', to: '2025-12-15', status: 'Rejected', days: 6 },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'success';
      case 'Pending': return 'warning';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Leave Management</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpen(true)}
        >
          Request Leave
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Status</TableCell>
                {hasPermission('approve_leave') && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.employee}</TableCell>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>{leave.from}</TableCell>
                  <TableCell>{leave.to}</TableCell>
                  <TableCell>{leave.days}</TableCell>
                  <TableCell>
                    <Chip label={leave.status} color={getStatusColor(leave.status)} size="small" />
                  </TableCell>
                  {hasPermission('approve_leave') && (
                    <TableCell>
                      {leave.status === 'Pending' && (
                        <>
                          <Button size="small" color="success">Approve</Button>
                          <Button size="small" color="error">Reject</Button>
                        </>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Leave</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Leave Type"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            margin="normal"
          >
            <MenuItem value="annual">Annual Leave</MenuItem>
            <MenuItem value="sick">Sick Leave</MenuItem>
            <MenuItem value="personal">Personal Leave</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="From Date"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="To Date"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Reason"
            multiline
            rows={4}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaveManagement;
