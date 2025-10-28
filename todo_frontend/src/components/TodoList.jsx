import React from 'react';
import TodoItem from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * Scrollable list of tasks with callbacks for item actions.
 */
export default function TodoList({ tasks, onToggle, onEdit, onDelete }) {
  return (
    <ul className="todo-list" aria-label="Task list">
      {tasks.map(task => (
        <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
          <TodoItem
            task={task}
            onToggle={() => onToggle(task.id)}
            onEdit={(title) => onEdit(task.id, title)}
            onDelete={() => onDelete(task.id)}
          />
        </li>
      ))}
      {tasks.length === 0 && (
        <li style={{ listStyle: 'none', padding: '12px 20px', color: '#6b7280' }}>
          No tasks to display.
        </li>
      )}
    </ul>
  );
}
