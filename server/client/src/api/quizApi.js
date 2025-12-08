import { getToken } from "../utils/helpers"; // ✅ FIXED IMPORT

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

export async function adminLogin(password) {
  return request("/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
}

export async function createQuiz(payload, token) {
  return request("/admin/quizzes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export async function listQuizzes() {
  return request("/quizzes");
}

export async function getQuiz(id) {
  return request(`/quizzes/${id}`);
}

export async function submitQuiz(id, answers) {
  return request(`/quizzes/${id}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
}

// ---------- ADMIN EDIT QUIZ ----------
export async function getQuizById(id) {
  const token = getToken();
  return request(`/admin/quizzes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateQuiz(id, payload, token) {
  return request(`/admin/quizzes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

// ---------- ADMIN DELETE QUIZ ----------
export async function deleteQuiz(id) {
  const token = getToken(); // ✅ FIXED getToken reference

  return request(`/admin/quizzes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
