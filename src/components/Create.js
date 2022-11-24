import { useState } from "react";

export const Create = () => {
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newdata = task;
    setData([...data, newdata]);
    setTask("");
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setTask(e.target.value);
  };
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label>
        <input
          className="todo-input"
          type="text"
          name="name"
          placeholder="Enter todo here"
          value={task}
          onChange={handleChange}
        />
        <button className="todo-button">Submit</button>
      </label>
    </form>
  );
};
