import React, { useState } from "react";
import axios from "axios";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
    setDescription("");

    axios.post('http://localhost:8081/todo', newTask)
      .then((response) => {
        console.log(response.data);
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTitle("");
        setDescription("");
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
      });
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="reminder">
      <h1>To-do</h1>
      <form className="todo-form" onSubmit={handleFormSubmit}>
        <div>
          <div>
            <label htmlFor="title">Title: </label>
          </div>

          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <div>
          <div>
            <label htmlFor="description">Description: </label>
          </div>

          <textarea
            cols={50}
            rows={5}
            name="description"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <button className="btn">Submit</button>
      </form>
      {tasks.map((task) => (
        <div className="list" key={task.id}>
          <h3>Title: {task.title}</h3>
          <h4>Description: {task.description}</h4>
          <button
            className="btn"
            onClick={() => handleTaskDelete(task.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
