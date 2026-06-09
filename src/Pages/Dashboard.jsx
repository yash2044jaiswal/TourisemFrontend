import { useState, useEffect } from "react";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";


export default function Dashboard() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {

  const token = localStorage.getItem("token");

  const savedUser = localStorage.getItem("user");

  if (!token || !savedUser) {
    setLoading(false);
    return;
  }

  setUser(JSON.parse(savedUser));

  setLoading(false);

}, []);

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setUser(null);

    window.location.href = "/Join";
  };


  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0d1117",
          color: "white",
          fontSize: "20px",
        }}
      >
        Loading Dashboard...
      </div>
    );
  }

  // LOGIN PAGE
  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0d1117",
          color: "white",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h2>Please Login First</h2>
        
        <button
          onClick={() => (window.location.href = "/Join")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go To Login
        </button>
      </div>
    );
  }

  // ROLE BASED DASHBOARD
  if (user.role === "admin") {
    return (
      <AdminDashboard
        user={user}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <UserDashboard
      user={user}
      onLogout={handleLogout}
    />
  );
}