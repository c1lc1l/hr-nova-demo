import React, { useState } from 'react';
import {
  Box, Typography, Paper, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Avatar, Chip, TextField,
  InputAdornment, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const EmployeeList = () => {
  const { hasPermission } = useAuth();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    { id: 1, name: 'John Doe', email: 'john.doe@company.com', department: 'Engineering', position: 'Senior Developer', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@company.com', department: 'HR', position: 'HR Manager', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike.j@company.com', department: 'Sales', position: 'Sales Executive', status: 'Active' },
    { id: 4, name: 'Sarah Chen', email: 'sarah.c@company.com', department: 'Marketing', position: 'Marketing Lead', status: 'On Leave' },
    { id: 5, name: 'Emma Wilson', email: 'emma.w@company.com', department: 'Engineering', position: 'DevOps Engineer', status: 'Active' },
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Employee Directory</Typography>
        {hasPermission('edit_all') && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          >
            Add Employee
          </Button>
        )}
      </Box>

      <Paper sx={{ mb: 2, p: 2 }}>
        <TextField
          fullWidth
          placeholder="Search by name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
                {hasPermission('edit_all') && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar>{employee.name.charAt(0)}</Avatar>
                      <Typography>{employee.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    <Chip
                      label={employee.status}
                      color={employee.status === 'Active' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  {hasPermission('edit_all') && (
                    <TableCell>
                      <Button size="small">Edit</Button>
                      <Button size="small" color="error">Remove</Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Full Name" margin="normal" />
          <TextField fullWidth label="Email" type="email" margin="normal" />
          <TextField fullWidth label="Department" margin="normal" />
          <TextField fullWidth label="Position" margin="normal" />
          <TextField fullWidth label="Start Date" type="date" margin="normal" InputLabelProps={{ shrink: true }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>Add Employee</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeList;
