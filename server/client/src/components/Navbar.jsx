import React from "react";

/**
 * Navbar now accepts `token` prop.
 * If token exists it navigates to 'admin-dashboard', otherwise to 'admin-login'.
 */
export default function Navbar({ onNavigate, token }) {
  return (
    <div className="card flex-between" style={{ margin: 0, borderRadius: 0 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <strong style={{ fontSize: 18 }}>Quiz Management</strong>

        <button
          style={{
            marginLeft: 8,
            backgroundColor: "palevioletred",
            color: "white",
          }}
          className="muted"
          onClick={() => onNavigate("home")}
        >
          Home
        </button>

        <button
          style={{ marginLeft: 8, backgroundColor: "teal", color: "white" }}
          className="muted"
          onClick={() => onNavigate("quiz-list")}
        >
          Quizzes
        </button>
      </div>

      <div>
        <button
          style={{
            marginLeft: 8,
            backgroundColor: "darkmagenta",
            color: "white",
          }}
          className="muted"
          onClick={() => {
            // navigate to dashboard if token present; else to login
            if (token) onNavigate("admin-dashboard");
            else onNavigate("admin-login");
          }}
        >
          Admin
        </button>
      </div>
    </div>
  );
}
