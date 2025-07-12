import React, { useState } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Add new todo
  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false }]);
    setInput("");
  };

  // Toggle todo completed state
  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Handle Enter key for input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
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

      <style>{`
        /* Simple Reset */
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-image: url('/pink-study.jpg');
          background-repeat: no-repeat;
          background-size: cover;
          margin: 0; padding: 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          min-height: 100vh;
        }
        .todo-app {
          background: white;
          margin-top: 50px;
          padding: 20px 30px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          width: 90%;
          max-width: 400px;
        }
        h1 {
          text-align: center;
          color: #333;
          margin-bottom: 20px;
        }
        .input-container {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          padding-right: 40px;
        }
        input[type="text"] {
          flex: 1;
          padding: 10px;
          font-size: 1rem;
          border: 2px solid #ddd;
          border-radius: 4px;
          transition: border-color 0.3s;
        }
        input[type="text"]:focus {
          border-color: #6B4353;
          outline: none;
        }
        button {
          background-color: #6B4353;
          border: none;
          color: white;
          padding: 10px 16px;
          font-size: 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #8F4057;
        }

        p {
          text-align: center;
        }
        .todo-list {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 300px;
          overflow-y: auto;
        }
        .todo-list li {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
          background: #F8C7DE;
          border-radius: 8px;
          border-radius: 8px;
          margin-bottom: 8px; 
        }
        .todo-list li.completed span {
          text-decoration: line-through;
          color: #999;
        }
        .todo-list label {
          flex: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .delete-btn {
          background: transparent;
          border: none;
          font-size: 1.3rem;
          color: #ff4d4d;
          cursor: pointer;
          padding: 0 8px;
          transition: color 0.2s;
        }
        .delete-btn:hover {
          color: #d10000;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .todo-app {
            margin-top: 100px;
            padding: 15px 20px;
            margin: 100px auto 0;
          }
          button {
            padding: 8px 12px;
            font-size: 0.9rem;
          }
          input[type="text"] {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TodoApp;
