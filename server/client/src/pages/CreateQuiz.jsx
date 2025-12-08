import React, { useState } from "react";
import { createQuiz } from "../api/quizApi";

function defaultMcq() {
  return {
    type: "mcq",
    text: "",
    options: [{ text: "" }, { text: "" }],
    correctIndex: 0,
  };
}

export default function CreateQuiz({ token }) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([defaultMcq()]);
  const [msg, setMsg] = useState("");

  function updateQuestion(i, q) {
    const copy = [...questions];
    copy[i] = q;
    setQuestions(copy);
  }

  function addQuestion() {
    setQuestions((prev) => [...prev, defaultMcq()]);
  }

  function removeQuestion(i) {
    setQuestions((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function handleCreate() {
    setMsg("");
    try {
      if (!title) return setMsg("Title required");
      const payload = { title, questions };
      await createQuiz(payload, token);
      setMsg("Quiz created");
      setTitle("");
      setQuestions([defaultMcq()]);
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div>
      <div className="card">
        <h3>Create Quiz</h3>
        <input
          placeholder="Quiz title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {questions.map((q, i) => (
          <div key={i} className="card">
            <label>Type</label>
            <select
              value={q.type}
              onChange={(e) => {
                const newType = e.target.value;

                let updated = { ...q, type: newType };

                if (newType === "mcq") {
                  updated = {
                    type: "mcq",
                    text: q.text,
                    options: q.options?.length
                      ? q.options
                      : [{ text: "" }, { text: "" }],
                    correctIndex: q.correctIndex ?? 0,
                  };
                }

                if (newType === "tf") {
                  updated = {
                    type: "tf",
                    text: q.text,
                    correctBoolean: q.correctBoolean ?? false,
                  };
                }

                if (newType === "text") {
                  updated = {
                    type: "text",
                    text: q.text,
                    correctText: q.correctText ?? "",
                  };
                }

                updateQuestion(i, updated);
              }}
            >
              <option value="mcq">MCQ</option>
              <option value="tf">True/False</option>
              <option value="text">Text</option>
            </select>

            <label>Question</label>
            <input
              value={q.text}
              onChange={(e) =>
                updateQuestion(i, { ...q, text: e.target.value })
              }
            />

            {q.type === "mcq" && (
              <>
                <div className="small">Options</div>
                {(q.options || []).map((opt, idx) => (
                  <div key={idx} style={{ marginTop: 6 }}>
                    <input
                      value={opt.text}
                      onChange={(e) => {
                        const opts = [...(q.options || [])];
                        opts[idx] = { text: e.target.value };
                        updateQuestion(i, { ...q, options: opts });
                      }}
                    />
                    <label style={{ marginLeft: 10 }}>
                      <input
                        type="radio"
                        name={`correct-${i}`}
                        checked={q.correctIndex === idx}
                        onChange={() =>
                          updateQuestion(i, { ...q, correctIndex: idx })
                        }
                      />{" "}
                      Correct
                    </label>
                  </div>
                ))}
                <div style={{ marginTop: 8 }}>
                  <button
                    className="muted"
                    onClick={() => {
                      const opts = [...(q.options || []), { text: "" }];
                      updateQuestion(i, { ...q, options: opts });
                    }}
                  >
                    Add option
                  </button>
                </div>
              </>
            )}

            {/*q.type === "mcq" && (
              <>
                <div className="small">Options</div>
                {(q.options || []).map((opt, idx) => (
                  <div
                    key={idx}
                    style={{
                      marginTop: 6,
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <input
                      style={{ flex: 1 }}
                      value={opt.text}
                      onChange={(e) => {
                        const opts = [...(q.options || [])];
                        opts[idx] = { text: e.target.value };
                        updateQuestion(i, { ...q, options: opts });
                      }}
                    />
                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <input
                        type="radio"
                        name={`correct-${i}`}
                        checked={q.correctIndex === idx}
                        onChange={() =>
                          updateQuestion(i, { ...q, correctIndex: idx })
                        }
                      />
                      Correct
                    </label>
                  </div>
                ))}
                <div style={{ marginTop: 8 }}>
                  <button
                    className="muted"
                    onClick={() => {
                      const opts = [...(q.options || []), { text: "" }];
                      updateQuestion(i, { ...q, options: opts });
                    }}
                  >
                    Add option
                  </button>
                </div>
              </>
            )*/}

            {q.type === "tf" && (
              <>
                <label>Correct</label>
                <select
                  value={q.correctBoolean ? "true" : "false"}
                  onChange={(e) =>
                    updateQuestion(i, {
                      ...q,
                      correctBoolean: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </>
            )}

            {q.type === "text" && (
              <>
                <label>Correct Text</label>
                <input
                  value={q.correctText || ""}
                  onChange={(e) =>
                    updateQuestion(i, { ...q, correctText: e.target.value })
                  }
                />
              </>
            )}

            <div style={{ marginTop: 8 }}>
              <button className="muted" onClick={() => removeQuestion(i)}>
                Remove question
              </button>
            </div>
          </div>
        ))}

        <div>
          <button onClick={addQuestion}>Add Question</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <button onClick={handleCreate}>Create Quiz</button>
        </div>

        {msg && (
          <div className="small" style={{ marginTop: 8 }}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
