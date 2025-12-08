// import React from 'react';

// export default function QuestionRenderer({ q, index, value, onChange }) {
//   return (
//     <div className="card">
//       <div><strong>{index + 1}. {q.text}</strong></div>

//       {q.type === 'mcq' && (q.options || []).map((opt, i) => (
//         <div key={i} style={{ marginTop: 8 }}>
//           <label>
//             <input type="radio" name={`q-${index}`} checked={value === i} onChange={() => onChange(i)} /> {opt.text}
//           </label>
//         </div>
//       ))}

//       {q.type === 'tf' && (
//         <div style={{ marginTop: 8 }}>
//           <label><input type="radio" name={`q-${index}`} checked={value === true} onChange={() => onChange(true)} /> True</label>
//           <label style={{ marginLeft: 12 }}><input type="radio" name={`q-${index}`} checked={value === false} onChange={() => onChange(false)} /> False</label>
//         </div>
//       )}

//       {q.type === 'text' && (
//         <div style={{ marginTop: 8 }}>
//           <input value={value ?? ''} onChange={(e) => onChange(e.target.value)} placeholder="Type your answer" />
//         </div>
//       )}
//     </div>
//   );
// }

import React from "react";

export default function QuestionRenderer({ q, index, value, onChange }) {
  return (
    <div className="card" style={{ padding: 20 }}>
      {/* Question */}
      <div style={{ fontWeight: "bold", marginBottom: 12 }}>
        {index + 1}. {q.text}
      </div>

      {/* MCQ OPTIONS */}
      {q.type === "mcq" &&
        (q.options || []).map((opt, i) => {
          const selected = value === i;
          return (
            <div
              key={i}
              onClick={() => onChange(i)}
              style={{
                border: selected ? "2px solid #007bff" : "1px solid #ccc",
                backgroundColor: selected ? "#e8f0ff" : "#fff",
                padding: "12px 14px",
                borderRadius: 6,
                marginBottom: 10,
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              {opt.text}
            </div>
          );
        })}

      {/* TRUE / FALSE */}
      {q.type === "tf" &&
        [
          { label: "True", val: true },
          { label: "False", val: false },
        ].map((item) => {
          const selected = value === item.val;
          return (
            <div
              key={item.label}
              onClick={() => onChange(item.val)}
              style={{
                border: selected ? "2px solid #007bff" : "1px solid #ccc",
                backgroundColor: selected ? "#e8f0ff" : "#fff",
                padding: "12px 14px",
                borderRadius: 6,
                marginBottom: 10,
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              {item.label}
            </div>
          );
        })}

      {/* TEXT ANSWER */}
      {q.type === "text" && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "12px 14px",
            borderRadius: 6,
            marginTop: 10,
          }}
        >
          <input
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer"
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              fontSize: 15,
              background: "transparent",
            }}
          />
        </div>
      )}
    </div>
  );
}
