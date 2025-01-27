import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

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
            navigate('/');
            Swal.fire({
                title: 'Task Added Successfully!',
                icon: 'success',
                buttons: false,
                timer: 2000,
            });
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    const [assignedToOptions, setAssignedToOptions] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState([]);

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
        setSelectedStatus(statusData);
        setSelectedPriority(priorityData);
        setAssignedToOptions(assignedToData);
    }, []);

    const handleStatusChange = (id) => {
        const selectedItem = statusData.find((item) => item.id === id);
        if (selectedItem) {
            setTask({
                ...task,
                status: selectedItem.Name,
            });
        }
    };

    const handlePriorityChange = (id) => {
        const selectedItem = priorityData.find((item) => item.id === id);
        if (selectedItem) {
            setTask({
                ...task,
                priority: selectedItem.Name,
            });
        }
    };

    const handleAssignedToChange = (id) => {
        const selectedItem = assignedToData.find((item) => item.id === id);
        if (selectedItem) {
            setTask({
                ...task,
                name: selectedItem.Name,
            });
        }
    };

    return (
        <div>
            <div className="container">
                <h3 className="text-center mt-5">New Task</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group col-md-6 col-sm-12 mt-3">
                            <label htmlFor="name" className="form-label"><span style={{ color: 'red' }}>*</span>Assigned To</label>
                            <select
                                className="form-control with-icon"
                                id="name"
                                onChange={(e) => handleAssignedToChange(e.target.value)}
                                required
                            >
                                <option value="">Select User</option>
                                {assignedToOptions.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-6 col-sm-12 mt-3">
                            <label htmlFor="status" className="form-label"><span style={{ color: 'red' }}>*</span>Status</label>
                            <select
                                className="form-control with-icon"
                                id="status"
                                onChange={(e) => handleStatusChange(e.target.value)}
                                required
                            >
                                <option value="">Select Status</option>
                                {selectedStatus.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.Name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group col-md-6 col-sm-12 mt-3">
                            <label htmlFor="dueDate" className="form-label"><span style={{ color: 'red' }}>*</span>Due Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="dueDate"
                                name="dueDate"
                                value={task.dueDate}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>
                        <div className="form-group col-md-6 col-sm-12 mt-3">
                            <label htmlFor="priority" className="form-label"><span style={{ color: 'red' }}>*</span>Priority</label>
                            <select
                                className="form-control with-icon"
                                id="priority"
                                onChange={(e) => handlePriorityChange(e.target.value)}
                                required
                            >
                                <option value="">Select Priority</option>
                                {selectedPriority.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group col-md-12 col-sm-12 mt-3">
                            <label htmlFor="comments" className="form-label"><span style={{ color: 'red' }}>*</span>Description</label>
                            <textarea
                                className="form-control"
                                id="comments"
                                name="comments"
                                value={task.comments}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="d-flex mt-3">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-success ms-3">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
