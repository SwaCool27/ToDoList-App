import { useEffect, useState } from "react";
import "../Todo.css";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [task, setTask] = useState([]);
  const [todo, setTodo] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("todo"));
    if (stored) {
      setTask(stored);
    }
  }, []);

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem("todo", JSON.stringify(updatedTasks));
    setTask(updatedTasks);
  };

  const addTodo = () => {
    if (todo.trim() !== "") {
      const newTask = { id: Date.now(), task: todo, completed: false };
      const updatedTasks = [...task, newTask];
      updateLocalStorage(updatedTasks);
      setTodo("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTasks = task.filter((item) => item.id !== id);
    updateLocalStorage(updatedTasks);
  };

  const toggleTodo = (id) => {
    const updatedTasks = task.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    updateLocalStorage(updatedTasks);
  };

  const handleSort = () => {
    const sortedTasks = [...task].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.task.localeCompare(b.task);
      } else {
        return b.task.localeCompare(a.task);
      }
    });
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setTask(sortedTasks);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = task.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "not-completed") return !item.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>Todo</h1>
      <div className="add-todo">
        <input
          type="text"
          className="input-todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="todo-btn" onClick={addTodo}>
          Add Todo
        </button>
      </div>
      {/* Highlighted: Add sorting and filtering UI */}
      <div className="sort-filter">
        <button className="sort-btn" onClick={handleSort}>
          Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
        <select className="filter-select" onChange={handleFilter} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not Completed</option>
        </select>
      </div>
      <div className="todo-list">
        <h1>Todo List</h1>
        <ul>
          {filteredTasks.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
