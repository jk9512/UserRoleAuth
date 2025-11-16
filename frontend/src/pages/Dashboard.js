import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      {/* Dashboard Card */}
      <div className="card shadow-lg border-0">
        <div className="card-header bg-success text-white">
          <h3 className="mb-0">User Dashboard</h3>
        </div>

        <div className="card-body p-4">
          <h5 className="card-title">Welcome, <strong>{user?.name}</strong></h5>

          <p className="card-text mb-2">
            <strong>Your Roles:</strong> {user?.roles?.join(", ")}
          </p>

          <button className="btn btn-danger mt-3" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
