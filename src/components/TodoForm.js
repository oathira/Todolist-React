import React, { useEffect, useState } from 'react';

const TodoForm = ({ addTodo, updateItem, editTodo }) => {
  // State to manage the input text for adding or editing a todo
  const [todo, setTodo] = useState('');

  // Use useEffect to update the input text when editing a todo
  useEffect(() => {
    if (editTodo) {
      // If editTodo is provided, set the input text to its title
      setTodo(editTodo.title);
    } else {
      // If not editing, clear the input text
      setTodo('');
    }
  }, [editTodo]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTodo) {
      // If editing, call the updateItem function to update the todo
      updateItem(todo, editTodo.id, editTodo.completed);
    } else {
      // If not editing, call the addTodo function to add a new todo
      addTodo({
        title: todo,
        completed: false,
        id: Date.now(),
      });
    }
    // Clear the input text after submission
    setTodo('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {/* Input field for adding or editing a todo */}
      <input
        type="text"
        className="todo-input"
        placeholder="Add a todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      {/* Button to submit the form, with text based on whether editing or adding */}
      <button className="todo-btn" type="submit">
        <span>{editTodo ? 'Ok' : 'Add'}</span>
      </button>
    </form>
  );
};

export default TodoForm;
