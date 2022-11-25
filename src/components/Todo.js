import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";

//to get data from local storage

const getlocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
export const Todo = (props) => {
  const [todos, setTodos] = useState(getlocalItems());
  const [value, setValue] = useState("");
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  //adddata to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      alert("Please fill data");
    } else if (value && !toggleSubmit) {
      setTodos(
        todos.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, text: value };
          }
          return elem;
        })
      );
      settoggleSubmit(true);
      setValue("");
      setIsEditItem(null);
    } else {
      const newTodo = {
        id: new Date().getTime(),
        text: value,
        completed: false,
      };
      setTodos([...todos].concat(newTodo));
      setValue("");
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  function deleteTodo(id) {
    const updateTodos = [...todos].filter((value) => value.id !== id);
    setTodos(updateTodos);
  }

  function handleCheckboxChange(id) {
    const updateTodos = [...todos].map((value) => {
      if (value.id === id) {
        value.completed = !value.completed;
      }
      return value;
    });
    setTodos(updateTodos);
  }
  const editItem = (id) => {
    const newEditItem = todos.find((elem) => {
      return elem.id === id;
    });

    settoggleSubmit(false);
    setValue(newEditItem.text);
    setIsEditItem(id);
  };

  return (
    <>
      <div className="container">
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="header">
            <h1>Todos({todos.length})</h1>
          </div>
          <div>
            <label>
              <input
                className="todo-input"
                type="text"
                name="name"
                placeholder="Enter todo here"
                value={value}
                onChange={handleChange}
              />
              {toggleSubmit ? (
                <button className="todo-button">Submit</button>
              ) : (
                <button className="todo-button">Edit</button>
              )}
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
                    checked={value.completed}
                  />
                </td>

                <td className="title">{data.text}</td>

                <td className="react-icon">
                  <button className="edit" onClick={() => editItem(data.id)}>
                    <FaEdit
                      className="Faedit"
                      onClick={() => editItem(data.id)}
                    />
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteTodo(data.id)}
           >
                    <RiDeleteBin6Line className="RiDeleteBin6Line" />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};
