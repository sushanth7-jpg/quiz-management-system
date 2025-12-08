import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import QuizList from "./pages/QuizList";
import { getToken } from "./utils/helpers";

export default function App() {
  const [route, setRoute] = useState("home"); // home, admin-login, admin-dashboard, quiz-list
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  function go(to) {
    setRoute(to);
  }

  const token = getToken();

  return (
    <>
      <Navbar onNavigate={go} />
      <div className="container">
        {route === "home" && <Home />}
        {route === "admin-login" && (
          <AdminLogin onLogin={() => setRoute("admin-dashboard")} />
        )}
        {route === "admin-dashboard" && token && <AdminDashboard />}
        {route === "quiz-list" && (
          <QuizList
            onTake={(id) => {
              setSelectedQuizId(id);
              setRoute("take-quiz");
            }}
          />
        )}
        {route === "take-quiz" && selectedQuizId && (
          <QuizList
            takeId={selectedQuizId}
            onBack={() => setRoute("quiz-list")}
          />
        )}
      </div>
    </>
  );
}
