import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DeleteModal from "./Modal/DeleteModal";
import menu from "./Images/menu.png"
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

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
        user.priority.toLowerCase().includes(event.target.value.toLowerCase()) ||
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
        buttons: false,
        timer: 2000,
      });
    }
  };

  // Pagination 
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = record.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(record.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };


  const handelEdit = (id) => {
    navigate(`/EditTaskForm/${id}`); // Redirect to the edit form with the task ID
  };

  return (
    <div>
      <div className="container">
        <div className="d-flex align-items-center justify-content-start mt-5">
          <img src={menu} alt="Menu" className="me-3 menuimg" />
          <h3>Task List</h3>
        </div>
        <div className="mt-5">
          <div className="d-flex justify-content-between align-items-center">
            <div className="form-group col-md-6 col-sm-12 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="d-flex">
              <Link to="/TaskForm" className="btn btn-primary mb-3 me-2">
                <AddIcon /> New Task
              </Link>
              <button onClick={handleRefresh} style={{ backgroundColor: '#fcf07e' }} className="btn mb-3">
                <RefreshIcon /> Refresh
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 ms-2">
          <h6>Records : {record.length}</h6>
        </div>
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead style={{ color: "#8591ab" }}>
                <tr>
                  <th scope="col">
                    <input type="checkbox" />
                  </th >
                  <th scope="col">Assigned To</th>
                  <th scope="col">Status</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Comments</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((user) => (
                  <tr key={user.id}>
                    <th scope="row">
                      <input type="checkbox" />
                    </th>
                    <td style={{ color: "#0778db" }}>{user.name}</td>
                    <td>{user.status}</td>
                    <td>{formatDate(user.dueDate)}</td>
                    <td>{user.priority}</td>
                    <td>{user.comments}</td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn dropdown-toggle"
                          type="button"
                          id={`dropdownMenuButton${user.id}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          style={{ backgroundColor: '#fcf07e' }}
                        >

                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby={`dropdownMenuButton${user.id}`}
                        >
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => handelEdit(user.id)}
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => openDeleteModal(user)}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Use the DeleteModal Component */}
      <DeleteModal selectedTask={selectedTask} handleDelete={handleDelete} />

      <nav aria-label="Page navigation example">
        <ul className="pagination mt-4 justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TaskList;
