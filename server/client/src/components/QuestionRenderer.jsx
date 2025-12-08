import React from 'react';

export default function QuestionRenderer({ q, index, value, onChange }) {
  return (
    <div className="card">
      <div><strong>{index + 1}. {q.text}</strong></div>

      {q.type === 'mcq' && (q.options || []).map((opt, i) => (
        <div key={i} style={{ marginTop: 8 }}>
          <label>
            <input type="radio" name={`q-${index}`} checked={value === i} onChange={() => onChange(i)} /> {opt.text}
          </label>
        </div>
      ))}

      {q.type === 'tf' && (
        <div style={{ marginTop: 8 }}>
          <label><input type="radio" name={`q-${index}`} checked={value === true} onChange={() => onChange(true)} /> True</label>
          <label style={{ marginLeft: 12 }}><input type="radio" name={`q-${index}`} checked={value === false} onChange={() => onChange(false)} /> False</label>
        </div>
      )}

      {q.type === 'text' && (
        <div style={{ marginTop: 8 }}>
          <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="Type your answer" />
        </div>
      )}
    </div>
  );
}
