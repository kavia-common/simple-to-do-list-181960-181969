import React, { useMemo, useRef, useState } from 'react';
import '../App.css';
import TodoHeader from './TodoHeader';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';

/**
 * PUBLIC_INTERFACE
 * TodoApp is the main application component orchestrating state and persistence.
 */
export default function TodoApp() {
  // Persist tasks with localStorage
  const [tasks, setTasks] = useLocalStorage('todo.tasks', []);
  const [filter, setFilter] = useState('all');
  const liveRegionRef = useRef(null);

  const remaining = useMemo(() => tasks.filter(t => !t.completed).length, [tasks]);

  const announce = (msg) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = '';
      // force update for screen readers
      setTimeout(() => { if (liveRegionRef.current) liveRegionRef.current.textContent = msg; }, 50);
    }
  };

  // PUBLIC_INTERFACE
  const addTask = (title) => {
    /** Add a task with a generated id and default flags */
    const trimmed = title.trim();
    if (!trimmed) return;
    const newTask = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(16).slice(2)}`,
      title: trimmed,
      completed: false,
    };
    setTasks(prev => [newTask, ...prev]);
    announce(`Added task: ${trimmed}`);
  };

  // PUBLIC_INTERFACE
  const toggleTask = (id) => {
    /** Toggle the completion state of a task by id */
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // PUBLIC_INTERFACE
  const editTask = (id, newTitle) => {
    /** Edit the title of a task, trimming spaces; ignore empty to avoid blank */
    const title = newTitle.trim();
    if (!title) return;
    setTasks(prev => prev.map(t => t.id === id ? { ...t, title } : t));
    announce(`Edited task`);
  };

  // PUBLIC_INTERFACE
  const deleteTask = (id) => {
    /** Remove a task by id */
    setTasks(prev => prev.filter(t => t.id !== id));
    announce(`Deleted task`);
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed);
    if (filter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="container">
      <TodoHeader
        remaining={remaining}
        total={tasks.length}
        filter={filter}
        onFilterChange={setFilter}
      />
      <div aria-live="polite" aria-atomic="true" className="visually-hidden" ref={liveRegionRef} />
      <TodoForm onAdd={addTask} />
      <TodoList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={deleteTask}
      />
      <div className="footer" aria-hidden="true">
        Data is stored in your browser and persists across reloads.
      </div>
    </div>
  );
}
