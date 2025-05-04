import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageUsers.css';

const BASE_URL = 'http://localhost:3001/admin/manageUsers';

export default function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(BASE_URL);
            setUsers(res.data);
        } catch (err) {
            console.error("Failed to fetch users:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            fetchUsers();
        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    };

    const handleToggleAdmin = async (id) => {
        try {
            await axios.patch(`${BASE_URL}/${id}/toggle-admin`);
            fetchUsers();
        } catch (err) {
            console.error("Failed to toggle admin status:", err);
        }
    };

    return (
        <div className="manage-users-container">
            <h2>Manage Users</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Is Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.isadmin ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => handleToggleAdmin(user._id)}>
                                    {user.isadmin ? 'Revoke Admin' : 'Make Admin'}
                                </button>
                                <button onClick={() => handleDelete(user._id)} className="delete-btn">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
