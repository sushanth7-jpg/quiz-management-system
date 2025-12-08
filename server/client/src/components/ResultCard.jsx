import React from 'react';

export default function ResultCard({ result }) {
  return (
    <div>
      <div className="card">
        <h3>Score: {result.score} / {result.total}</h3>
      </div>
      <div>
        {result.detailed.map((d, i) => (
          <div className="card" key={i}>
            <div className="small">Question #{d.index + 1}</div>
            <div>Correct: {String(d.correct)}</div>
            <div>Given: {String(d.given)}</div>
            <div>Answer: {String(d.correctAnswer)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}