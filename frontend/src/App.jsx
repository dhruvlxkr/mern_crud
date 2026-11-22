import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "ravi_dangi",
      email: "ravi.d@beyoung.in",
      job: "Php Developer",
      number: "9876543210",
    },
    {
      id: 2,
      username: "Harsh Gupta",
      email: "harsh.g@beyoung.in",
      job: "UI/UX Designer",
      number: "9812345678",
    },
    {
      id: 3,
      username: "Rishabh soni",
      email: "Rishabh.s@beyoung.in",
      job: "Full Stack",
      number: "9812345678",
    },
    {
      id: 4,
      username: "Dharmendra Laxkar",
      email: "dharmendra.l@beyoung.in",
      job: "Full Stack & Php",
      number: "9812345678",
    },
    {
      id: 5,
      username: "Pradeep Sir",
      email: "pradeep.s@beyoung.in",
      job: "Php Developer",
      number: "9812345678",
    },
  ]);

  const handleAdd = () => {};

  const handleEdit = (user) => {
    alert(`Edit user: ${user.username}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="container">
      <div className="crud-card">
        <div className="card-header">
          <div className="header-title">
            <h2>User Management</h2>
            <p>Manage and view all registered users</p>
          </div>
          <button className="btn-add" onClick={handleAdd}>
            <span className="btn-icon">+</span> Add User
          </button>
        </div>

        <div className="table-responsive">
          <table className="crud-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Job</th>
                <th>Number</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <span className="badge-id">#{user.id}</span>
                    </td>
                    <td className="font-semibold">{user.username}</td>
                    <td className="text-muted">{user.email}</td>
                    <td>
                      <span className="badge-job">{user.job}</span>
                    </td>
                    <td>{user.number}</td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button
                          className="btn-action btn-edit"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-action btn-delete"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No users found. Click the "Add User" button to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
