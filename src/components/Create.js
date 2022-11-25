import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";
export const Create = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  function deleteTodo(id) {
    const updateTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updateTodos);
  }
  function handleCheckboxChange(id) {
    const updateTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updateTodos);
  }
  return (
    <>
      <form className="todo-form" onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              className="todo-input"
              type="text"
              name="name"
              placeholder="Enter todo here"
              value={todo}
              onChange={handleChange}
            />
            <button className="todo-button">Submit</button>
          </label>
        </div>
      </form>
      <br />
      <div id="divOne">
        <table className="tblOne">
          {todos.map((data) => (
            <tr key={data.id}>
              <td className="checkbox">
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(data.id)}
                  checked={todo.completed}
                />
              </td>

              <td className="title">{data.text}</td>

  
              <td className="react-icon">
                <button className="edit">
                  <FaEdit className="Faedit" />
                </button>
                <button className="delete" onClick={() => deleteTodo(data.id)}>
                  <RiDeleteBin6Line className="RiDeleteBin6Line" />
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};
