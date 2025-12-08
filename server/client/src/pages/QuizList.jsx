import React, { useEffect, useState } from "react";
import { listQuizzes, getQuiz, submitQuiz } from "../api/quizApi";
import Loader from "../components/Loader";
import QuestionRenderer from "../components/QuestionRenderer";
import ResultCard from "../components/ResultCard";

export default function QuizList({ onTake, takeId, onBack }) {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (takeId) openQuiz(takeId);
  }, [takeId]);

  async function fetchList() {
    setLoading(true);
    try {
      const res = await listQuizzes();
      setQuizzes(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function openQuiz(id) {
    setLoading(true);
    try {
      const q = await getQuiz(id);
      setActiveQuiz(q);
      setAnswers(new Array(q.questions.length).fill(null));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function setAnswer(i, val) {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[i] = val;
      return copy;
    });
  }

  async function handleSubmit() {
    try {
      const res = await submitQuiz(activeQuiz._id, answers);
      setResult(res);
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <Loader />;

  if (activeQuiz) {
    if (result) {
      return (
        <div>
          <button
            onClick={() => {
              setResult(null);
              setActiveQuiz(null);
            }}
          >
            {onBack ? "Back" : "Back to list"}
          </button>
          <ResultCard result={result} />
        </div>
      );
    }

    return (
      <div>
        <button
          onClick={() => {
            setActiveQuiz(null);
            setAnswers([]);
          }}
        >
          {onBack ? onBack : "Back"}
        </button>
        <h3>{activeQuiz.title}</h3>
        {activeQuiz.questions.map((q, i) => (
          <QuestionRenderer
            key={i}
            q={q}
            index={i}
            value={answers[i]}
            onChange={(v) => setAnswer(i, v)}
          />
        ))}
        <div style={{ marginTop: 12 }}>
          <button onClick={handleSubmit}>Submit Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3>Available Quizzes</h3>
      {quizzes.map((q) => (
        <div className="card flex-between" key={q._id}>
          <div>
            <strong>{q.title}</strong>
            <div className="small">
              Created: {new Date(q.createdAt).toLocaleString()}
            </div>
          </div>
          <div>
            <button onClick={() => openQuiz(q._id)}>Take Quiz</button>
          </div>
        </div>
      ))}
    </div>
  );
}
