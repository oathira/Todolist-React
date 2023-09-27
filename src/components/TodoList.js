
// TodoList.js
import React from 'react';

const TodoList = ({ todos, deleteTodo, setEditTodo, toggleCheck, checkedTodos }) => {
  // Sort active todos by creation date (most recent on top)
  const activeTodos = todos
    .filter((todo) => !checkedTodos.includes(todo.id))
    .sort((a, b) => b.id - a.id);

  // Sort completed todos by completion date (most recent on top)
  const completedTodos = todos
    .filter((todo) => checkedTodos.includes(todo.id))
    .sort((a, b) => b.completed - a.completed);

  const editTask = (id) => {
    const task = todos.find((todo) => {
      return todo.id === id;
    });
    setEditTodo(task);
  };

  return (
    <div className="list-container">
      <ul className="list-items">
        {/* Render active todos in order of creation */}
        {activeTodos.map((todo) => {
          return (
            <li className="list-item" key={todo.id}>
               <label class="checkbox-container"> {todo.title} 
              <input
                type="checkbox"
                checked={checkedTodos.includes(todo.id)}
                onChange={() => toggleCheck(todo.id)}
              />
             
              <span id="todo-title" className={checkedTodos.includes(todo.id) ?'completed' : ''}>
             
              </span>
              </label>
              <div className="icons">
                <span className="icon" onClick={() => editTask(todo.id)}>
                  <i className="fa-solid fa-pen-to-square" id="edit"></i>
                </span>
                <span className="icon" onClick={() => deleteTodo(todo.id)}>
                  <i className="fa-solid fa-trash-can" id="delete"></i>
                </span>
              </div>
            </li>
          );
        })}

        {/* Render completed todos in order of completion */}
{completedTodos.map((todo) => {
  return (
    <li className="list-item" key={todo.id}>
     
      <label class="checkbox-container"> {todo.title}
  <input
        type="checkbox"
        checked={checkedTodos.includes(todo.id)}
        onChange={() => toggleCheck(todo.id)}
      />
  <span id="todo-title" className={checkedTodos.includes(todo.id) ? 'completed' : ''}>
         
        </span>
</label>
        
      
      <div className="icons">
        <span className="icon" onClick={() => editTask(todo.id)}>
          <i className="fa-solid fa-pen-to-square" id="edit"></i>
        </span>
        <span className="icon" onClick={() => deleteTodo(todo.id)}>
          <i className="fa-solid fa-trash-can" id="delete"></i>
        </span>
      </div>
    </li>
  );
})}

      </ul>
    </div>
  );
};

export default TodoList;