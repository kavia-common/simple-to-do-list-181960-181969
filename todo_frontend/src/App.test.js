import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

function addTask(title) {
  const input = screen.getByLabelText(/new task title/i);
  fireEvent.change(input, { target: { value: title } });
  const addBtn = screen.getByRole('button', { name: /add task/i });
  fireEvent.click(addBtn);
}

describe('Todo App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('users can add tasks via input and Add button', () => {
    render(<App />);
    addTask('First');
    addTask('Second');
    expect(screen.getByLabelText(/task: first/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/task: second/i)).toBeInTheDocument();
    // Count live region
    expect(screen.getByRole('status')).toHaveTextContent('2 of 2 remaining');
  });

  test('toggle completes a task', () => {
    render(<App />);
    addTask('Finish report');
    const checkbox = screen.getByRole('checkbox', { name: /mark task "finish report" as complete/i });
    fireEvent.click(checkbox);
    // Remaining count changes
    expect(screen.getByRole('status')).toHaveTextContent('0 of 1 remaining');
  });

  test('edit a task inline with save and cancel, Enter/Esc support', () => {
    render(<App />);
    addTask('Alpha');
    const editBtn = screen.getByRole('button', { name: /edit task "alpha"/i });
    fireEvent.click(editBtn);

    const editInput = screen.getByLabelText(/edit task title/i);
    fireEvent.change(editInput, { target: { value: 'Alpha edited' } });
    // Save with Enter
    fireEvent.keyDown(editInput, { key: 'Enter', code: 'Enter' });

    expect(screen.getByLabelText(/task: alpha edited/i)).toBeInTheDocument();

    // Edit again and cancel with Escape
    fireEvent.click(screen.getByRole('button', { name: /edit task "alpha edited"/i }));
    const edit2 = screen.getByLabelText(/edit task title/i);
    fireEvent.change(edit2, { target: { value: 'Alpha canceled' } });
    fireEvent.keyDown(edit2, { key: 'Escape', code: 'Escape' });
    // Should still be "Alpha edited"
    expect(screen.getByLabelText(/task: alpha edited/i)).toBeInTheDocument();
  });

  test('delete a task', () => {
    render(<App />);
    addTask('Remove me');
    const deleteBtn = screen.getByRole('button', { name: /delete task "remove me"/i });
    fireEvent.click(deleteBtn);
    expect(screen.queryByLabelText(/task: remove me/i)).not.toBeInTheDocument();
  });

  test('tasks persist across reloads using localStorage', () => {
    // First render: add tasks
    const { unmount } = render(<App />);
    addTask('Persist A');
    addTask('Persist B');
    expect(JSON.parse(window.localStorage.getItem('todo.tasks'))).toHaveLength(2);
    unmount();

    // Second render: should show previous tasks
    render(<App />);
    expect(screen.getByLabelText(/task: persist a/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/task: persist b/i)).toBeInTheDocument();
  });
});
