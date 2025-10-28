import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * A single task row that supports toggle, edit inline, and delete.
 */
export default function TodoItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const save = () => {
    const trimmed = draft.trim();
    if (trimmed && trimmed !== task.title) {
      onEdit(trimmed);
    }
    setIsEditing(false);
  };

  const cancel = () => {
    setDraft(task.title);
    setIsEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  };

  return (
    <>
      <input
        type="checkbox"
        className="checkbox"
        checked={task.completed}
        onChange={onToggle}
        aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
      />
      <div>
        {!isEditing ? (
          <p className="title" aria-label={`Task: ${task.title}`}>{task.title}</p>
        ) : (
          <input
            ref={inputRef}
            className="edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Edit task title"
          />
        )}
      </div>
      <div className="actions">
        {!isEditing ? (
          <>
            <button
              className="icon-btn primary"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit task "${task.title}"`}
            >
              Edit
            </button>
            <button
              className="icon-btn error"
              onClick={onDelete}
              aria-label={`Delete task "${task.title}"`}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button className="icon-btn accent" onClick={save} aria-label="Save edit">Save</button>
            <button className="icon-btn" onClick={cancel} aria-label="Cancel edit">Cancel</button>
          </>
        )}
      </div>
    </>
  );
}
