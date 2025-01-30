import React, { useState, useEffect } from 'react';
import './User.css';
import Swal from "sweetalert2";

const fetchUsers = async () => {
  try {
    const response = await fetch('/api/admin/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export default function User() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const usersList = await fetchUsers();
      setUsers(usersList);
    };
    getUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      try {
        await fetch(`/api/admin/delete/${userId}`, { method: 'DELETE' });
        setUsers(users.filter(user => user._id !== userId));
  
        Swal.fire("Deleted!", "User has been deleted.", "success");
      } catch (error) {
        console.error('Delete failed:', error);
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/admin/edit/${editingUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingUser),
      });
      setUsers(users.map(user => (user._id === editingUser._id ? editingUser : user)));
      setEditingUser(null);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="user-management">
  <h1>User Management</h1>

  {users.length === 0 ? (
    <p>Loading users...</p>
  ) : (
    <ul className="user-list mt-5">
      {users.map((user) => (
        <li key={user._id} className="user-item">
          {editingUser?._id === user._id ? (
            <form className="edit-form" onSubmit={handleEditUser}>
              <input
                type="text"
                name="username"
                value={editingUser?.username || ""}
                onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                className="edit-input"
              />
              <input
                type="email"
                name="email"
                value={editingUser?.email || ""}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                className="edit-input"
              />
              <button type="submit" className="btn save-btn">Save</button>
              <button type="button" className="btn cancel-btn" onClick={() => setEditingUser(null)}>Cancel</button>
            </form>
          ) : (
            <div className="user-info gap-5">
              <img
                src={user.profilePicture || "/default-avatar.png"} 
                alt={user.username}
                className="user-avatar h-15 w-15 rounded-full object-cover"
              />
              <span className="user-name">{user.username}</span>
              <span className="user-email">{user.email}</span>
              <div className="button-group">
                <button className="btn edit-btn" onClick={() => setEditingUser({ ...user })}>Edit</button>
                <button className="btn delete-btn" onClick={() => handleDeleteUser(user._id)}>Delete</button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )}
</div>
  );
}



