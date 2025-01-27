import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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
            title: 'Task Updated Successfully!',
            icon: 'success',
            buttons: false,
            timer: 2000,
        });
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="container">
            <h3 className="text-center mt-5">Edit Task</h3>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group col-md-6 col-sm-12 mt-3">
                        <label htmlFor="name" className="form-label">
                            <span style={{ color: "red" }}>*</span> Assigned To
                        </label>
                        <select
                            className="form-control with-icon"
                            id="name"
                            onChange={(e) => handleAssignedToChange(e.target.value)}
                            required
                        >
                            <option value="">Select User</option>
                            {assignedToOptions.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                    selected={formData.name === item.Name}
                                >
                                    {item.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group col-md-6 col-sm-12 mt-3">
                        <label htmlFor="status" className="form-label">
                            <span style={{ color: "red" }}>*</span> Status
                        </label>
                        <select
                            className="form-control with-icon"
                            id="status"
                            onChange={(e) => handleStatusChange(e.target.value)}
                            required
                        >
                            <option value="">Select Status</option>
                            {statusOptions.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                    selected={formData.status === item.Name}
                                >
                                    {item.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group col-md-6 col-sm-12 mt-3">
                        <label htmlFor="dueDate" className="form-label">
                            <span style={{ color: "red" }}>*</span> Due Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            required
                        />
                    </div>

                    <div className="form-group col-md-6 col-sm-12 mt-3">
                        <label htmlFor="priority" className="form-label">
                            <span style={{ color: "red" }}>*</span> Priority
                        </label>
                        <select
                            className="form-control with-icon"
                            id="priority"
                            onChange={(e) => handlePriorityChange(e.target.value)}
                            required
                        >
                            <option value="">Select Priority</option>
                            {priorityOptions.map((item) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                    selected={formData.priority === item.Name}
                                >
                                    {item.Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group col-md-12 col-sm-12 mt-3">
                        <label htmlFor="comments" className="form-label">
                            <span style={{ color: "red" }}>*</span> Description
                        </label>
                        <textarea
                            className="form-control"
                            id="comments"
                            name="comments"
                            value={formData.comments}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="d-flex mt-3">
                    <button type="button" onClick={handleCancel} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-success ms-3">
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditTaskForm;
