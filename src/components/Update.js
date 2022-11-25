
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";

export const Update = () => {
    const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id:new Date().getTime(),
      text:todo,
      completed:false
    };
    setTodos([...todos ].concat(newTodo));
    
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setTodo(e.target.value);
  };
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
<div class="myDiv1">
<input type="checkbox" />
{todos.map((data)=>

<h1>{data.text}</h1>
)}


<button className="edit">
                <FaEdit className="Faedit" />
              </button>
              <button className="delete">
                <RiDeleteBin6Line className="RiDeleteBin6Line" />
              </button>
</div>
</form>
    </>
  );
};
