import React, { useState, useEffect } from "react"; // ⬅️ useEffect added
import { createQuiz, updateQuiz } from "../api/quizApi"; // ⬅️ updateQuiz added
import { toast } from "react-toastify";

function defaultMcq() {
  return {
    type: "mcq",
    text: "",
    options: [{ text: "" }, { text: "" }],
    correctIndex: 0,
  };
}

export default function CreateQuiz({ token, mode = "create", editQuizData }) {
  // ⬅️ NEW props added
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([defaultMcq()]);

  // ------------------ PREFILL FOR EDIT ------------------
  useEffect(() => {
    if (mode === "edit" && editQuizData) {
      setTitle(editQuizData.title || "");
      setQuestions(
        editQuizData.questions && editQuizData.questions.length > 0
          ? editQuizData.questions
          : [defaultMcq()]
      );
    }
  }, [mode, editQuizData]);

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

  // ------------------ VALIDATION + CREATE (your original code) ------------------
  async function handleCreate() {
    try {
      if (!title || !title.trim()) {
        toast.error("Title required");
        return;
      }

      if (!questions || questions.length === 0) {
        toast.error("At least one question is required");
        return;
      }

      // Validate each question (unchanged)
      for (let qi = 0; qi < questions.length; qi++) {
        const q = questions[qi];

        if (!q.text || !q.text.trim()) {
          return toast.error(`Question ${qi + 1}: text is required`);
        }

        if (q.type === "mcq") {
          if (!Array.isArray(q.options) || q.options.length < 2) {
            return toast.error(
              `Question ${qi + 1}: MCQ must have at least 2 options`
            );
          }

          const validOpts = q.options.filter(
            (o) => o.text && o.text.trim() !== ""
          );
          if (validOpts.length < 2) {
            return toast.error(
              `Question ${qi + 1}: MCQ must have at least 2 non-empty options`
            );
          }
        }

        if (q.type === "tf" && typeof q.correctBoolean !== "boolean") {
          return toast.error(
            `Question ${qi + 1}: Correct True/False is required`
          );
        }

        if (q.type === "text" && !q.correctText.trim()) {
          return toast.error(`Question ${qi + 1}: Correct text required`);
        }
      }

      // SEND DATA
      const payload = { title: title.trim(), questions };
      await createQuiz(payload, token);

      toast.success("Quiz created successfully!");

      // Reset form
      setTitle("");
      setQuestions([defaultMcq()]);
    } catch (err) {
      toast.error(err.message || "Request failed");
    }
  }

  // ------------------ UPDATE FUNCTIONALITY (NEW) ------------------
  async function handleUpdate() {
    try {
      if (!title.trim()) return toast.error("Title required");

      const payload = { title: title.trim(), questions };

      await updateQuiz(editQuizData._id, payload, token);

      toast.success("Quiz updated successfully!");
    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  }

  return (
    <div>
      <div className="card">
        <h3>{mode === "edit" ? "Edit Quiz" : "Create Quiz"}</h3>

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

                let updated = q;

                if (newType === "mcq") {
                  updated = {
                    type: "mcq",
                    text: q.text,
                    options: q.options || [{ text: "" }, { text: "" }],
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
                {q.options?.map((opt, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <input
                      style={{ flex: 1 }}
                      value={opt.text}
                      onChange={(e) => {
                        const updatedOpts = [...q.options];
                        updatedOpts[idx] = { text: e.target.value };

                        updateQuestion(i, {
                          ...q,
                          options: updatedOpts,
                        });
                      }}
                    />

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
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

                <button
                  className="muted"
                  style={{ marginTop: 6 }}
                  onClick={() =>
                    updateQuestion(i, {
                      ...q,
                      options: [...q.options, { text: "" }],
                    })
                  }
                >
                  Add option
                </button>
              </>
            )}

            {q.type === "tf" && (
              <>
                <label>Correct Answer</label>
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
                  value={q.correctText}
                  onChange={(e) =>
                    updateQuestion(i, { ...q, correctText: e.target.value })
                  }
                />
              </>
            )}

            <button
              className="muted"
              style={{ marginTop: 15, marginBottom: 10, marginInline: 10 }}
              onClick={() => removeQuestion(i)}
            >
              Remove question
            </button>
          </div>
        ))}

        <button onClick={addQuestion}>Add Question</button>

        <div style={{ marginTop: 12 }}>
          {mode === "edit" ? (
            <button
              style={{
                marginLeft: 8,
                background: "linear-gradient(135deg, green, green)",
                color: "white",
              }}
              onClick={handleUpdate}
            >
              Update Quiz
            </button> // ⬅️ NEW
          ) : (
            <button
              style={{
                marginLeft: 8,
                background: "linear-gradient(135deg, green, green)",
                color: "white",
              }}
              onClick={handleCreate}
            >
              Create Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
