import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//To get data from local storage
const notify = () => toast();
const getlocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};
export const Todo = () => {
  const [todos, setTodos] = useState(getlocalItems());
  const [inputValue, setInputValue] = useState("");
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  /*----------Add data to local storage----------*/
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todos));
  }, [todos]);

  /*----------handle submit function----------*/
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) {
      toast.error("Please enter Task", {
        theme: "colored",
        position: "top-center",
      });
    } else if (inputValue && !toggleSubmit) {
      toast("Task updated successfully", {
        theme: "light",
        position: "top-center",
      });
      setTodos(
        todos.map((elem) => {
          if (elem.id === isEditItem) {
            return {
              ...elem,
              text: inputValue,
            };
          }

          return elem;
        })
      );
      settoggleSubmit(true);

      setInputValue("");
      setIsEditItem(null);
    } else {
      toast("Task added successfully", {
        theme: "light",
        position: "top-center",
      });
      const newTodo = {
        id: new Date().getTime(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos].concat(newTodo));
      setInputValue("");
    }
  };

  /*----------handle input value  ----------*/
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  /*----------handle delete the todo Tasks----------*/
  function onDelete(id) {
    const updateTodos = [...todos].filter((value) => value.id !== id);
    setTodos(updateTodos);
    onclick = { notify };
    toast("Task Removed Successfully!", {
      theme: "light",
      position: "top-center", text:'green'
    });
  }

  /*------handle checkbox to mark Task True/False----------*/
  function handleCheckboxChange(id) {
    const updateTodos = [...todos].map((value) => {
      if (value.id === id) {
        return { ...value, completed: !value.completed };
      }

      return value;
    });

    setTodos(updateTodos);
  }

  /*----------Handle Update the Todo Tasks---------*/
  const onEdit = (id) => {
    const newEditItem = todos.find((elem) => {
      return elem.id === id;
    });

    settoggleSubmit(false);
    setInputValue(newEditItem.text);
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
                value={inputValue}
                onChange={handleInputChange}
              />
              {toggleSubmit ? (
                <button className="todo-button">Submit</button>
              ) : (
                <button className="todo-button">Update</button>
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
                    className="red-input"
                    type="checkbox"
                    onClick={() => handleCheckboxChange(data.id)}
                    checked={data.completed}
                  />
                </td>

                <td className="title">{data.text}</td>

                <td className="react-icon">
                  <button className="edit" onClick={() => onEdit(data.id)}>
                    <FaEdit className="Faedit" />
                  </button>
                  <button className="delete" onClick={() => onDelete(data.id)}>
                    <RiDeleteBin6Line className="RiDeleteBin6Line" />
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
