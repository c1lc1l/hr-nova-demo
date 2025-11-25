import React from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent } from '@mui/material';
import { People, EventAvailable, Assessment, TrendingUp } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const StatCard = ({ title, value, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Box>
        <Box sx={{ color: color, opacity: 0.8 }}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcomeeeeee back, {user?.name}!
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Here's what's happening with your organization today
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Employees"
            value="247"
            icon={<People sx={{ fontSize: 40 }} />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Leaves"
            value="12"
            icon={<EventAvailable sx={{ fontSize: 40 }} />}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Reviews Due"
            value="8"
            icon={<Assessment sx={{ fontSize: 40 }} />}
            color="error.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Attendance Rate"
            value="94%"
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="success.main"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              AI-Powered Analytics
            </Typography>
            <Typography color="textSecondary">
              Performance trends and predictions will be displayed here using AWS SageMaker/Bedrock integration
            </Typography>
            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="body2" color="primary">
                ✓ Attrition Risk Analysis: Low (3 employees flagged)
              </Typography>
              <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>
                ⚠ Leave Pattern Anomaly Detected in Engineering Dept
              </Typography>
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                ✓ Performance Forecast: 15% improvement expected Q1 2026
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '400px' }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { action: 'Leave approved', user: 'Sarah Chen', time: '2 hours ago' },
                { action: 'New employee onboarded', user: 'Michael Brown', time: '5 hours ago' },
                { action: 'Performance review submitted', user: 'Emma Wilson', time: '1 day ago' },
                { action: 'Document verified (Blockchain)', user: 'System', time: '1 day ago' },
              ].map((activity, index) => (
                <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body2" fontWeight="bold">{activity.action}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {activity.user} • {activity.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
