import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Input form to add tasks. Supports Enter key and button click.
 */
export default function TodoForm({ onAdd }) {
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form className="todo-form" onSubmit={submit} aria-label="Add task form">
      <label htmlFor="new-task" className="visually-hidden">Add a new task</label>
      <input
        id="new-task"
        className="todo-input"
        type="text"
        placeholder="What do you need to do?"
        aria-label="New task title"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="btn" type="submit" aria-label="Add task">Add</button>
    </form>
  );
}
