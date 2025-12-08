import React, { useState, useEffect } from "react";
import CreateQuiz from "./CreateQuiz";
import { listQuizzes, deleteQuiz } from "../api/quizApi";
import { getToken, clearToken } from "../utils/helpers";
import { getQuizById } from "../api/quizApi";

export default function AdminDashboard() {
  const [view, setView] = useState("create"); // create / list / edit
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editQuiz, setEditQuiz] = useState(null);
  const token = getToken();

  useEffect(() => {
    if (view === "list") loadQuizzes();
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

  async function handleDelete(id) {
    const yes = window.confirm("Are you sure you want to delete this quiz?");
    if (!yes) return;

    try {
      await deleteQuiz(id, token);
      loadQuizzes(); // refresh list
    } catch (err) {
      alert(err.message);
    }
  }

  // function handleEdit(quiz) {
  //   setEditQuiz(quiz);
  //   setView("edit");
  // }

  async function handleEdit(quiz) {
    try {
      const fullQuiz = await getQuizById(quiz._id); // ✅ fetch full quiz from admin route
      setEditQuiz(fullQuiz);
      setView("edit");
    } catch (err) {
      alert("Failed to load quiz: " + err.message);
    }
  }

  return (
    <div>
      {/* TOP BAR */}
      <div className="card">
        <div className="flex-between">
          <h3>Admin Dashboard</h3>

          <div>
            <button
              style={{
                marginLeft: 8,
                background: "linear-gradient(135deg, green, green)",
                color: "white",
              }}
              onClick={() => {
                setEditQuiz(null);
                setView("create");
              }}
            >
              Create Quiz
            </button>

            <button style={{ marginLeft: 8 }} onClick={() => setView("list")}>
              My Quizzes
            </button>

            <button
              style={{
                marginLeft: 8,
                background: "linear-gradient(135deg, #ff3b3b, #d80000)",
                color: "white",
              }}
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

      {/* CREATE PAGE */}
      {view === "create" && <CreateQuiz token={token} />}

      {/* EDIT QUIZ PAGE */}
      {/* {view === "edit" && <CreateQuiz token={token} editQuizData={editQuiz} />} */}

      {view === "edit" && (
        <CreateQuiz
          token={token}
          editQuizData={editQuiz}
          mode="edit"
          onDone={() => setView("list")}
        />
      )}

      {/* LIST PAGE */}
      {view === "list" && (
        <div className="card">
          <h3>My Quizzes</h3>

          {loading && <div className="small">Loading...</div>}
          {error && <div style={{ color: "red" }}>{error}</div>}

          {quizzes.length === 0 && !loading && (
            <div className="small">No quizzes found.</div>
          )}

          {quizzes.length > 0 && (
            <ul style={{ marginTop: 12 }}>
              {quizzes.map((q) => (
                <li
                  key={q._id}
                  style={{
                    marginBottom: 12,
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: 6,
                  }}
                >
                  <strong>{q.title}</strong>
                  <div className="small">
                    {new Date(q.createdAt).toLocaleString()}
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <button
                      style={{
                        marginRight: 8,
                        background: "blue",
                        color: "white",
                      }}
                      onClick={() => handleEdit(q)}
                    >
                      Edit
                    </button>

                    <button
                      style={{ background: "red", color: "white" }}
                      onClick={() => handleDelete(q._id)}
                    >
                      Delete
                    </button>
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
