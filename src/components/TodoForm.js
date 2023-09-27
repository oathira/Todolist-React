import React, { useEffect, useState } from 'react';

const TodoForm = ({ addTodo, updateItem, editTodo }) => {
  const [todo, setTodo] = useState('');

  useEffect(() => {
    if (editTodo) {
      setTodo(editTodo.title);
    } else {
      setTodo('');
    }
  }, [editTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTodo) {
      updateItem(todo, editTodo.id, editTodo.completed);
    } else {
      addTodo({
        title: todo,
        completed: false,
        id: Date.now(),
      });
    }
    setTodo('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Add a todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="todo-btn" type="submit">
        <span>{editTodo ? 'Ok' : 'Add'}</span>
      </button>
    </form>
  );
};

export default TodoForm;
