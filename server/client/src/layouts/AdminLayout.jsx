import React from 'react';

export default function AdminLayout({ children }) {
  return (
    <div>
      <div className="card">
        <h3>Admin</h3>
      </div>
      <div>{children}</div>
    </div>
  );
}
