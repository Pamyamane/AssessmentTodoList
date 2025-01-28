import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Typography,
  Box,
} from '@mui/material';

const TaskForm = () => {
  const [task, setTask] = useState({
    name: '',
    status: '',
    dueDate: '',
    priority: '',
    comments: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting task data:', task);

    try {
      const response = await axios.post('http://localhost:5003/users', task);
      console.log('Task added successfully:', response);
      Swal.fire({
        title: 'Task Added Successfully!',
        icon: 'success',
        buttons: false,
        timer: 2000,
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const statusData = [
    { id: '1', Name: 'In Progress' },
    { id: '2', Name: 'Not Started' },
    { id: '3', Name: 'Completed' },
  ];

  const priorityData = [
    { id: '1', Name: 'Low' },
    { id: '2', Name: 'Normal' },
    { id: '3', Name: 'High' },
  ];

  const assignedToData = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    Name: `User${i + 1}`,
  }));

  useEffect(() => {
    setTask((prevTask) => ({
      ...prevTask,
      status: '',
      priority: '',
      name: '',
    }));
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: 5,
        px: 2,
      }}
    >
      <Typography variant="h4" align="center" sx={{ marginBottom: 3 }}>
        New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Assigned To</InputLabel>
              <Select
                value={task.name}
                onChange={(e) =>
                  setTask({ ...task, name: e.target.value })
                }
                label="Assigned To"
                required
              >
                <MenuItem value="">
                  <em>Select User</em>
                </MenuItem>
                {assignedToData.map((item) => (
                  <MenuItem key={item.id} value={item.Name}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={task.status}
                onChange={(e) =>
                  setTask({ ...task, status: e.target.value })
                }
                label="Status"
                required
              >
                <MenuItem value="">
                  <em>Select Status</em>
                </MenuItem>
                {statusData.map((item) => (
                  <MenuItem key={item.id} value={item.Name}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Due Date"
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleInputChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                min: new Date().toISOString().split('T')[0],
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={task.priority}
                onChange={(e) =>
                  setTask({ ...task, priority: e.target.value })
                }
                label="Priority"
                required
              >
                <MenuItem value="">
                  <em>Select Priority</em>
                </MenuItem>
                {priorityData.map((item) => (
                  <MenuItem key={item.id} value={item.Name}>
                    {item.Name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="comments"
              value={task.comments}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mt: 4,
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TaskForm;
