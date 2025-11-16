import React from "react";

export default function AdminPage() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Admin Dashboard</h3>
        </div>

        <div className="card-body p-4">
          <h5 className="card-title">Admin Only Area</h5>
          <p className="card-text">
            This page is accessible only by users with the <strong>admin</strong> role.
          </p>

          <button className="btn btn-primary">
            Go to Admin Panel
          </button>
        </div>
      </div>
    </div>
  );
}
