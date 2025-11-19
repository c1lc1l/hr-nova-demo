import React, { useState } from 'react';
import {
  Box, Typography, Paper, Button, Card, CardContent, Grid,
  LinearProgress, Chip, Dialog, DialogTitle, DialogContent,
  DialogActions, TextField, Rating
} from '@mui/material';
import { Add, TrendingUp } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const PerformanceReview = () => {
  const { user, hasPermission } = useAuth();
  const [open, setOpen] = useState(false);

  const reviews = [
    {
      id: 1,
      employee: 'John Doe',
      period: 'Q4 2025',
      status: 'Completed',
      overallRating: 4.5,
      categories: {
        technical: 4.5,
        communication: 4.0,
        teamwork: 5.0,
        leadership: 4.0
      },
      aiInsight: 'Strong performer with consistent improvement. High retention probability.'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      period: 'Q4 2025',
      status: 'Pending',
      overallRating: null,
      categories: {},
      aiInsight: 'Review in progress'
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      period: 'Q4 2025',
      status: 'In Progress',
      overallRating: null,
      categories: {},
      aiInsight: 'Awaiting manager feedback'
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Performance Reviews</Typography>
        {hasPermission('manage_performance') && (
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpen(true)}
          >
            New Review
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Completed Reviews
              </Typography>
              <Typography variant="h3">18</Typography>
              <LinearProgress variant="determinate" value={72} sx={{ mt: 2 }} />
              <Typography variant="caption" color="textSecondary">72% completion rate</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Reviews
              </Typography>
              <Typography variant="h3">8</Typography>
              <Typography variant="caption" color="warning.main">Due within 7 days</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Rating
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h3">4.2</Typography>
                <TrendingUp color="success" />
              </Box>
              <Typography variant="caption" color="success.main">+0.3 from last quarter</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        {reviews.map((review) => (
          <Paper key={review.id} sx={{ p: 3, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
              <Box>
                <Typography variant="h6">{review.employee}</Typography>
                <Typography variant="body2" color="textSecondary">{review.period}</Typography>
              </Box>
              <Chip label={review.status} color={getStatusColor(review.status)} />
            </Box>

            {review.overallRating && (
              <>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" gutterBottom>Overall Rating</Typography>
                  <Rating value={review.overallRating} readOnly precision={0.5} />
                  <Typography variant="h6" component="span" sx={{ ml: 1 }}>
                    {review.overallRating}/5.0
                  </Typography>
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary">Technical Skills</Typography>
                    <Typography variant="body1">{review.categories.technical}/5</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary">Communication</Typography>
                    <Typography variant="body1">{review.categories.communication}/5</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary">Teamwork</Typography>
                    <Typography variant="body1">{review.categories.teamwork}/5</Typography>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Typography variant="caption" color="textSecondary">Leadership</Typography>
                    <Typography variant="body1">{review.categories.leadership}/5</Typography>
                  </Grid>
                </Grid>
              </>
            )}

            <Box sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 1, opacity: 0.8 }}>
              <Typography variant="caption" fontWeight="bold">AI Insight (AWS Bedrock)</Typography>
              <Typography variant="body2">{review.aiInsight}</Typography>
            </Box>

            {hasPermission('manage_performance') && review.status !== 'Completed' && (
              <Box sx={{ mt: 2 }}>
                <Button variant="outlined" size="small">Continue Review</Button>
              </Box>
            )}
          </Paper>
        ))}
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Performance Review</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Employee" select margin="normal">
            <option value="">Select Employee</option>
          </TextField>
          <TextField fullWidth label="Review Period" margin="normal" />
          <TextField fullWidth label="Goals & Objectives" multiline rows={3} margin="normal" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpen(false)}>Create Review</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PerformanceReview;
