import React, { useState } from "react";
import PropType from "prop-types";
import "./TaskItem.css";

export default function TaskItem({
  id,
  title,
  taskState,
  onTaskUpdate,
  deleteTask
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const onChangeTitle = (event) => {
    const newTitle = event.target.value;
    setEditTitle(newTitle);
    onTaskUpdate(id, newTitle, taskState);
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      if (editTitle.length === 0) {
        deleteTask(id);
      }
    }
  };

  const onStateChangeTask = (event) => {
    onTaskUpdate(id, title, event.target.value);
  };

  if (isEditing) {
    return (
      <div className="task-item">
        <input
          type="text"
          value={editTitle}
          onChange={onChangeTitle}
          onKeyPress={onKeyPress}
        />
      </div>
    );
  } else {
    return (
      <div className="task-item">
        <div onClick={(e) => setIsEditing(true)}>{editTitle}</div>
        <select onChange={onStateChangeTask} value={taskState}>
          <option value="Pendente">Pendente</option>
          <option value="Fazendo">Fazendo</option>
          <option value="Terminado">Terminado</option>
        </select>
      </div>
    );
  }
}

TaskItem.PropType = {
  id: PropType.number.isRequired,
  title: PropType.string.isRequired,
  taskState: PropType.string.isRequired,
  onTaskUpdate: PropType.func.isRequired,
  deleteTask: PropType.func.isRequired
};
