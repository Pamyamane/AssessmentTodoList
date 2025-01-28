import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DeleteModal from "./Modal/DeleteModal";
import menu from "./Images/menu.png";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Pagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

const TaskList = () => {
  const [users, setUsers] = useState([]);
  const [record, setRecord] = useState(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    LoadUsers();
  }, []);

  const LoadUsers = async () => {
    const result = await axios.get("http://localhost:5003/users");
    setUsers(result.data);
    setRecord(result.data);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    const filteredRecords = users.filter(
      (user) =>
        user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.status.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.dueDate.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.priority
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        user.comments.toLowerCase().includes(event.target.value.toLowerCase())
    );

    setRecord(filteredRecords);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const openDeleteModal = (task) => {
    setSelectedTask(task);
    const modal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    );
    modal.show();
  };

  const handleDelete = async () => {
    if (selectedTask) {
      await axios.delete(`http://localhost:5003/users/${selectedTask.id}`);
      LoadUsers();

      const modal = window.bootstrap.Modal.getInstance(
        document.getElementById("deleteModal")
      );
      modal.hide();

      Swal.fire({
        title: "Task Deleted Successfully!",
        icon: "success",
        timer: 2000,
      });
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = record.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(record.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  const handleEdit = (id) => {
    navigate(`/EditTaskForm/${id}`);
  };

  const handleAdd = () => {
    navigate(`/TaskForm`);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Grid container alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Box display="flex" alignItems="center">
            <img
              src={menu}
              alt="Menu"
              style={{
                borderRadius: "50%",
                width: "40px",
                marginRight: "15px",
              }}
            />
            <Typography
              variant="h4"
              sx={{ color: "#0778db", fontWeight: "bold" }}
            >
              Task List
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{ textTransform: "none", borderRadius: "20px", mr: 2 }}
          >
            New Task
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{ textTransform: "none", borderRadius: "20px" }}
          >
            Refresh
          </Button>
        </Grid>
      </Grid>

      {/* Search Field */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: "600px", mx: "auto" }}
        />
      </Box>

      {/* Task Table */}
      <TableContainer
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          overflowX: "auto",
          backgroundColor: "#fff",
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: "#0077b5" }}>
            {" "}
            {/* LinkedIn Blue Color */}
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Select
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Assigned To
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Due Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Priority
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Comments
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Edit
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRecords.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:hover": { backgroundColor: "#f9f9f9" },
                }}
              >
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>{user.name}</TableCell>{" "}
                {/* Slightly bold text */}
                <TableCell sx={{ fontWeight: "bold" }}>{user.status}</TableCell>
                <TableCell>{formatDate(user.dueDate)}</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {user.priority}
                </TableCell>
                <TableCell>{user.comments}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <EditIcon
                      sx={{ cursor: "pointer" }}
                      color="primary"
                      onClick={() => handleEdit(user.id)}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title="Delete">
                    <DeleteIcon
                      sx={{ cursor: "pointer" }}
                      color="error"
                      onClick={() => openDeleteModal(user)}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteModal selectedTask={selectedTask} handleDelete={handleDelete} />

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => paginate(page)}
          shape="rounded"
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default TaskList;
