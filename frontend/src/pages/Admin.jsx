import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css'; 

export default function Admin() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <div className="admin-box">
        <h1 className="admin-title">Admin Dashboard</h1>
        <div className="admin-buttons">
          <button onClick={() => navigate('/admin/users')} className="admin-button">
            Manage Users
          </button>
          <button onClick={() => navigate('/admin/manageTests')} className="admin-button">
            Manage Tests
          </button>
        </div>
      </div>
    </div>
  );
}
