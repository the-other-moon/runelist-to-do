import React, { useState, useEffect } from "react";
import "./TodoApp.css";

const TodoApp = () => {
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <div className="todo-app">
      <h1>Rune List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.length === 0 && <p>No tasks yet. Add some!</p>}
        {todos.map(({ id, text, completed }) => (
          <li key={id} className={completed ? "completed" : ""}>
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleTodo(id)}
              />
              <span>{text}</span>
            </label>
            <button onClick={() => deleteTodo(id)} className="delete-btn">
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
