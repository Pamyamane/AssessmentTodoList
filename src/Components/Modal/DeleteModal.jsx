import React from "react";

const DeleteModal = ({ selectedTask, handleDelete }) => {
  return (
    <div
      className="modal fade"
      id="deleteModal"
      tabIndex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-3 shadow-lg">
          {/* Modal Header */}
          <div className="modal-header" style={{ backgroundColor: "#0077b5", color: "white" }}>
            <h5 className="modal-title w-100 text-center" id="deleteModalLabel">
              Delete Task
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body text-center">
            <p>
              Are you sure you want to delete the task{" "}
              <strong>{selectedTask?.name}</strong>?
            </p>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer justify-content-center border-0">
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill px-4 py-2"
              data-bs-dismiss="modal"
              style={{
                transition: "background-color 0.3s, border-color 0.3s",
                borderColor: "#0077b5",
                color: "#0077b5"
              }}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-primary rounded-pill px-4 py-2"
              onClick={handleDelete}
              style={{
                backgroundColor: "#0077b5",
                color: "#fff",
                transition: "background-color 0.3s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) => e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)"}
              onMouseLeave={(e) => e.target.style.boxShadow = "none"}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
