
  
import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const initialState = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState();
  const [checkedTodos, setCheckedTodos] = useState([]);

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

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    // Include the completed status when adding a todo
    setTodos((prevTodos) => [...prevTodos, { ...todo, completed: false }]);
    alert('Todo added successfully!');
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
    alert('Todo removed!');
  };

  const updateItem = (title, id, completed) => {
    // Include the completed status when updating a todo
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title, completed } : todo
      )
    );
    setEditTodo('');
  };

  const toggleCheck = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    const updatedCheckedTodos = todos
      .filter((todo) => todo.id === id ? !todo.completed : todo.completed)
      .map((todo) => todo.id);
    setCheckedTodos(updatedCheckedTodos);
  };





  const clearCompleted = () => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => !checkedTodos.includes(todo.id))
    );
    setCheckedTodos([]);
  };

  const resetTodos = () => {
    setTodos([]);
    setCheckedTodos([]);
  };

  return (
    <div className="container">
      <button className="reset-button" onClick={resetTodos}>
      <i class="fa fa-refresh" aria-hidden="true"></i>
      </button>
      <h2 className="header">Todo List</h2>
      <TodoForm addTodo={addTodo} updateItem={updateItem} editTodo={editTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        setEditTodo={setEditTodo}
        toggleCheck={toggleCheck}
        checkedTodos={checkedTodos}
      />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default App;