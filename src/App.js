import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const initialState = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState();
  const [checkedTodos, setCheckedTodos] = useState([]);
 
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  };

  const updateItem = (title, id, completed) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? {  title,id, completed } : todo
      )
    );
    setEditTodo('');
  };
  

  const toggleCheck = (id) => {
    if (checkedTodos.includes(id)) {
      setCheckedTodos(checkedTodos.filter((todoId) => todoId !== id));
    } else {
      setCheckedTodos([...checkedTodos, id]);
    }
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
