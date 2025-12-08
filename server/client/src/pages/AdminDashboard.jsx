/*import React, { useState } from 'react';
import CreateQuiz from './CreateQuiz';
import { getToken, clearToken } from '../utils/helpers';

export default function AdminDashboard() {
  const [view, setView] = useState('create'); // create or list
  const token = getToken();

  return (
    <div>
      <div className="card">
        <div className="flex-between">
          <h3>Admin Dashboard</h3>
          <div>
            <button className="muted" onClick={() => setView('create')}>Create Quiz</button>
            <button style={{ marginLeft: 8 }} onClick={() => setView('list')}>My Quizzes</button>
            <button style={{ marginLeft: 8 }} className="muted" onClick={() => { clearToken(); window.location.reload(); }}>Logout</button>
          </div>
        </div>
      </div>

      {view === 'create' && <CreateQuiz token={token} />}
      {view === 'list' && (
        <div className="card">
          <div className="small">Quiz list / edit not implemented in this lightweight version. You can create quizzes here.</div>
        </div>
      )}
    </div>
  );
}*/

import React, { useState, useEffect } from "react";
import CreateQuiz from "./CreateQuiz";
import { listQuizzes } from "../api/quizApi";
import { getToken, clearToken } from "../utils/helpers";

export default function AdminDashboard() {
  const [view, setView] = useState("create");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const token = getToken();

  // Load quizzes when switching to "list"
  useEffect(() => {
    if (view === "list") {
      loadQuizzes();
    }
  }, [view]);

  async function loadQuizzes() {
    setLoading(true);
    setError("");
    try {
      const data = await listQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="card">
        <div className="flex-between">
          <h3>Admin Dashboard</h3>
          <div>
            <button
              style={{
                marginLeft: 8,
                backgroundColor: "green",
                color: "white",
              }}
              className="muted"
              onClick={() => setView("create")}
            >
              Create Quiz
            </button>
            <button style={{ marginLeft: 8 }} onClick={() => setView("list")}>
              My Quizzes
            </button>
            <button
              style={{ marginLeft: 8, backgroundColor: "red", color: "white" }}
              className="muted"
              onClick={() => {
                clearToken();
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Create Quiz Page */}
      {view === "create" && <CreateQuiz token={token} />}

      {/* My Quizzes Page */}
      {view === "list" && (
        <div className="card">
          <h3>My Quizzes</h3>

          {loading && <div className="small">Loading...</div>}
          {error && (
            <div className="small" style={{ color: "red" }}>
              {error}
            </div>
          )}

          {quizzes.length === 0 && !loading && (
            <div className="small">No quizzes found.</div>
          )}

          {quizzes.length > 0 && (
            <ul style={{ marginTop: 10 }}>
              {quizzes.map((q) => (
                <li key={q._id} style={{ marginBottom: 8 }}>
                  <strong>{q.title}</strong>
                  <div className="small">
                    {new Date(q.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
