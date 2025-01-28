import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
    TextField,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Button,
    Grid,
    FormHelperText,
    Box,
} from "@mui/material";

const EditTaskForm = () => {
    const { id } = useParams(); // Get the task ID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        status: "",
        dueDate: "",
        priority: "",
        comments: "",
    });

    const [statusOptions, setStatusOptions] = useState([]);
    const [priorityOptions, setPriorityOptions] = useState([]);
    const [assignedToOptions, setAssignedToOptions] = useState([]);

    // dropdown data
    const statusData = [
        { id: "1", Name: "In Progress" },
        { id: "2", Name: "Not Started" },
        { id: "3", Name: "Completed" },
    ];

    const priorityData = [
        { id: "1", Name: "Low" },
        { id: "2", Name: "Normal" },
        { id: "3", Name: "High" },
    ];

    const assignedToData = Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        Name: `User${i + 1}`,
    }));

    useEffect(() => {
        // Fetch task data by ID
        const fetchTask = async () => {
            const result = await axios.get(`http://localhost:5003/users/${id}`);
            setFormData(result.data);
        };
        fetchTask();

        // Populate dropdown options
        setStatusOptions(statusData);
        setPriorityOptions(priorityData);
        setAssignedToOptions(assignedToData);
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStatusChange = (id) => {
        const selectedItem = statusData.find((item) => item.id === id);
        if (selectedItem) {
            setFormData({
                ...formData,
                status: selectedItem.Name,
            });
        }
    };

    const handlePriorityChange = (id) => {
        const selectedItem = priorityData.find((item) => item.id === id);
        if (selectedItem) {
            setFormData({
                ...formData,
                priority: selectedItem.Name,
            });
        }
    };

    const handleAssignedToChange = (id) => {
        const selectedItem = assignedToData.find((item) => item.id === id);
        if (selectedItem) {
            setFormData({
                ...formData,
                name: selectedItem.Name,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5003/users/${id}`, formData);
        navigate("/"); // Redirect back to the task list
        Swal.fire({
            title: "Task Updated Successfully!",
            icon: "success",
            buttons: false,
            timer: 2000,
        });
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <Box className="container" sx={{ width: "100%", padding: 3 }}>
            <h3 className="text-center mt-5">Edit Task</h3>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Assigned To */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Assigned To</InputLabel>
                            <Select
                                value={formData.name}
                                name="name"
                                onChange={(e) => handleAssignedToChange(e.target.value)}
                                label="Assigned To"
                                required
                            >
                                <MenuItem value="">Select User</MenuItem>
                                {assignedToOptions.map((item) => (
                                    <MenuItem key={item.id} value={item.Name}>
                                        {item.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={formData.status}
                                name="status"
                                onChange={(e) => handleStatusChange(e.target.value)}
                                label="Status"
                                required
                            >
                                <MenuItem value="">Select Status</MenuItem>
                                {statusOptions.map((item) => (
                                    <MenuItem key={item.id} value={item.Name}>
                                        {item.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Due Date */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            type="date"
                            label="Due Date"
                            value={formData.dueDate}
                            name="dueDate"
                            onChange={handleChange}
                            fullWidth
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: new Date().toISOString().split("T")[0],
                            }}
                        />
                    </Grid>

                    {/* Priority */}
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={formData.priority}
                                name="priority"
                                onChange={(e) => handlePriorityChange(e.target.value)}
                                label="Priority"
                                required
                            >
                                <MenuItem value="">Select Priority</MenuItem>
                                {priorityOptions.map((item) => (
                                    <MenuItem key={item.id} value={item.Name}>
                                        {item.Name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            value={formData.comments}
                            name="comments"
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>

                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                    <Button onClick={handleCancel} variant="outlined" color="secondary" sx={{ mr: 2 }}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Update
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default EditTaskForm;
