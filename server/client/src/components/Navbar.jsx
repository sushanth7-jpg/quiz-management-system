import React from 'react';

export default function Navbar({ onNavigate }) {
  return (
    <div className="card flex-between" style={{ margin: 0, borderRadius: 0 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <strong style={{ fontSize: 18 }}>Quiz Management</strong>
        <button className="muted" onClick={() => onNavigate('home')}>Home</button>
        <button className="muted" onClick={() => onNavigate('quiz-list')}>Quizzes</button>
      </div>
      <div>
        <button onClick={() => onNavigate('admin-login')}>Admin</button>
      </div>
    </div>
  );
}
