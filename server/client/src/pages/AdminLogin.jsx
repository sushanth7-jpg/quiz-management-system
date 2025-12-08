import React, { useState } from "react";
import { adminLogin } from "../api/quizApi";
import { saveToken } from "../utils/helpers";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await adminLogin(password);
      saveToken(res.token);
      setMsg("Logged in");
      onLogin?.();
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div className="card">
      <h3>Admin Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ marginTop: 8 }}>
          <button type="submit">Login</button>
        </div>
      </form>
      {msg && <div className="small">{msg}</div>}
      {/* <div className="small" style={{ marginTop: 8 }}>
        (Use password from server .env = ADMIN_PASSWORD)
      </div> */}
    </div>
  );
}
