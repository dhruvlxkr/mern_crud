import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.job.trim() ||
      !formData.number.trim()
    ) {
      setError("All Field Filled Mendontry");
      return;
    }

    setError("");

    if (editId == null) {
      try {
        const res = await fetch("http://localhost:8001/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.status === 422 || !res.ok) {
          setError(data || "Failed to add User!");
        } else {
          alert("User Create Successfully!");

          setFormData({
            username: "",
            email: "",
            job: "",
            number: "",
          });
          getUserData();
        }
      } catch (error) {
        console.error("Error:", error);
        setError(
          "Unable to connect to the server. Please check if the backend is running.",
        );
      }
    } else {
      try {
        const res = await fetch(`http://localhost:8001/updateuser/${editId}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.status === 200) {
          alert("User Update Successfully");

          setEditId(null);
          setFormData({ username: "", email: "", job: "", number: "" });
          getUserData();
        } else {
          setError(data || "Failed to update user!");
        }
      } catch (error) {
        console.error("Error", error);
        setError("Unable to connect to server.");
      }
    }
  };

  const getUserData = async () => {
    try {
      const res = await fetch("http://localhost:8001/getdata", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 200) {
        setUsers(data);
      } else {
        console.error("Failed to fetch Data");
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Users?",
    );

    if (confirmDelete) {
      try {
        const res = await fetch(`http://localhost:8001/deleteUser/${id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        });

        const data = await res.json();

        if (res.status === 200) {
          alert("User Delete Successfully");

          if (editId === id) {
            handleCancel();
          }

          getUserData();
        } else {
          alert(data || "Failed to delete user!");
        }
      } catch (error) {
        console.error("Delete Error", error);
        alert("Failed to connect to server!");
      }
    }
  };
  let serial = 1;
  return (
    <div className="container">
      <div className="crud-card mb-4">
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
                      <span className="badge-id">#{serial++}</span>
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
