import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  // Load initial state from local storage or use an empty array
  const initialState = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(initialState); // State to manage todo items
  const [editTodo, setEditTodo] = useState(); // State to manage editing a todo
  const [checkedTodos, setCheckedTodos] = useState([]); // State to manage checked todos

  // Initialize the completed status based on local storage data
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);

    // Initialize checkedTodos based on completed status
    const initialCheckedTodos = storedTodos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);
    setCheckedTodos(initialCheckedTodos);
  }, []);

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    // Include the completed status when adding a todo
    setTodos((prevTodos) => [...prevTodos, { ...todo, completed: false }]);
    alert('Todo added successfully!');
  };

  const deleteTodo = (id) => {
    // Remove a todo by filtering out the one with the given ID
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
    alert('Todo removed!');
  };

  const updateItem = (title, id, completed) => {
    // Update a todo's title and completed status
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title, completed } : todo
      )
    );
    setEditTodo('');
  };

  const toggleCheck = (id) => {
    // Toggle the completed status of a todo
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const updatedCheckedTodos = todos
      .filter((todo) => (todo.id === id ? !todo.completed : todo.completed))
      .map((todo) => todo.id);
    setCheckedTodos(updatedCheckedTodos);
  };

  const clearCompleted = () => {
    // Remove completed todos by filtering out those in checkedTodos
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => !checkedTodos.includes(todo.id))
    );
    setCheckedTodos([]);
  };

  const resetTodos = () => {
    // Reset todos and checkedTodos
    setTodos([]);
    setCheckedTodos([]);
  };

  return (
    <div className="container">
      {/* Reset button */}
      <button className="reset-button" onClick={resetTodos}>
        <i class="fa fa-refresh" aria-hidden="true"></i>
      </button>
      {/* Header */}
      <h2 className="header">Todo List</h2>
      {/* TodoForm component */}
      <TodoForm addTodo={addTodo} updateItem={updateItem} editTodo={editTodo} />
      {/* TodoList component */}
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        setEditTodo={setEditTodo}
        toggleCheck={toggleCheck}
        checkedTodos={checkedTodos}
      />
      {/* Clear completed todos button */}
      <button className="clear-completed" onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default App;
