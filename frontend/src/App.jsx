import React, { useState } from "react";

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
  ]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    job: "",
    number: "",
  });

  const [editId, setEditId] = useState(null);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.email.trim()) {
      setError("Username aur Email bharna zaroori hai!");
      return;
    }

    setError("");

    if (editId !== null) {
      setUsers(
        users.map((user) =>
          user.id === editId ? { ...user, ...formData } : user,
        ),
      );
      setEditId(null);

      const newUser = {
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        ...formData,
      };
      setUsers([...users, newUser]);
    }

    setFormData({
      username: "",
      email: "",
      job: "",
      number: "",
    });
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setFormData({
      username: user.username,
      email: user.email,
      job: user.job,
      number: user.number,
    });
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({
      username: "",
      email: "",
      job: "",
      number: "",
    });
    setError("");
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Kya aap sach me is user ko delete karna chahte hain?")
    ) {
      setUsers(users.filter((user) => user.id !== id));
      if (editId === id) {
        handleCancel();
      }
    }
  };

  return (
    <div className="container">
      <div className="crud-card mb-4">
        <div className="card-header">
          <div className="header-title">
            <h2>{editId !== null ? "Edit User Details" : "Add New User"}</h2>
            <p>
              {editId !== null
                ? `User ID #${editId} ki details update karein`
                : "Naya user create karne ke liye details bharein"}
            </p>
          </div>
        </div>

        {error && <div className="form-alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="crud-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                name="username"
                placeholder="e.g. Rahul Sharma"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. rahul@example.com"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Job / Designation</label>
              <input
                type="text"
                name="job"
                placeholder="e.g. React Developer"
                value={formData.job}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="number"
                placeholder="e.g. 9876543210"
                value={formData.number}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-actions">
            {editId !== null && (
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}

            <button type="submit" className="btn-add">
              {editId !== null ? "Update User" : "+ Add User"}
            </button>
          </div>
        </form>
      </div>

      <div className="crud-card">
        <div className="card-header">
          <div className="header-title">
            <h2>User Management</h2>
            <p>Kul {users.length} users registered hain</p>
          </div>
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
                      <span className="badge-job">{user.job || "N/A"}</span>
                    </td>
                    <td>{user.number || "N/A"}</td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <button
                          type="button"
                          className="btn-action btn-edit"
                          onClick={() => handleEdit(user)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
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
                    Koi user nahi mila. Upar diye gaye form se naya user add
                    karein!
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
