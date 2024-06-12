import PropTypes from "prop-types";
import "../TodoItem.css";
const TodoItem = ({ item, onDelete, onToggle }) => {
  return (
    <li className="todo-item">
      {" "}
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
      />
      <p className={item.completed ? "completed" : ""}>{item.task}</p>
      <button className="todo-btn" onClick={() => onDelete(item.id)}>
        Delete Todo
      </button>
    </li>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    task: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TodoItem;