import React, { useState, useEffect } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ username: "", email: "", phone: "", password: "", role: "user" });
  const [formError, setFormError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null); // Store user ID for deletion confirmation
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          setError("Invalid response format.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  // Validate form inputs before creating user
  const validateForm = () => {
    setFormError("");
    if (!newUser.username.trim()) {
      setFormError("Username is required.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(newUser.email)) {
      setFormError("Invalid email format.");
      return false;
    }
    if (!/^[0-9]{10,15}$/.test(newUser.phone)) {
      setFormError("Phone number must be between 10-15 digits.");
      return false;
    }
    if (newUser.password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // Handle creating a new user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.error || "Failed to create user");
        return;
      }

      setUsers((prevUsers) => [...prevUsers, data.user]); // Update UI
      setNewUser({ username: "", email: "", phone: "", password: "", role: "user" }); // Reset form
      setIsModalOpen(false); // Close modal after submission
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    }
  };

  // Handle confirming delete action
  const confirmDeleteUser = (id) => {
    setDeleteUserId(id);
  };

  // Handle deleting a user
  const handleDeleteUser = async () => {
    if (!deleteUserId) return;

    try {
      const response = await fetch(`http://localhost:3000/api/users/${deleteUserId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== deleteUserId));
      } else {
        const errorData = await response.json();
        setFormError(errorData.error || "Failed to delete user");
      }
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    }

    setDeleteUserId(null); // Close delete confirmation popup
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Manage Users</h2>

      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={() => setIsModalOpen(true)}>
        + Add User
      </button>

      {/* ✅ Modal for Adding User */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            {formError && <p className="text-red-500 text-sm text-center">{formError}</p>}
            <form onSubmit={handleCreateUser}>
              <input type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} className="border px-3 py-2 rounded w-full mb-2" required />
              <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="border px-3 py-2 rounded w-full mb-2" required />
              <input type="text" placeholder="Phone Number" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} className="border px-3 py-2 rounded w-full mb-2" required />
              <input type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="border px-3 py-2 rounded w-full mb-2" required />
              <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="border px-3 py-2 rounded w-full mb-4" required>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex justify-between">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create</button>
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ✅ Delete Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="text-gray-600 mb-4">Do you really want to delete this user?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDeleteUser} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
              <button onClick={() => setDeleteUserId(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Updated Users Table with Phone Numbers */}
      <table className="w-full border min-w-max">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phone}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button onClick={() => confirmDeleteUser(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
