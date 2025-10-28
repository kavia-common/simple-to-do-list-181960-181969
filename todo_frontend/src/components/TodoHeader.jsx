import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Renders app title, description and remaining task count with live updates.
 */
export default function TodoHeader({ remaining, total, filter, onFilterChange }) {
  return (
    <header className="todo-header">
      <h1>Tasks</h1>
      <p>Stay organized. Add, check off, and edit your to-dos.</p>
      <div role="status" aria-live="polite" className="count">
        {total === 0 ? 'No tasks yet' : `${remaining} of ${total} remaining`}
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button
          className={`icon-btn ${filter === 'all' ? 'primary' : ''}`}
          aria-pressed={filter === 'all'}
          aria-label="Show all tasks"
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`icon-btn ${filter === 'active' ? 'accent' : ''}`}
          aria-pressed={filter === 'active'}
          aria-label="Show active tasks"
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
        <button
          className={`icon-btn ${filter === 'completed' ? 'accent' : ''}`}
          aria-pressed={filter === 'completed'}
          aria-label="Show completed tasks"
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>
    </header>
  );
}
