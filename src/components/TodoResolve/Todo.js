import React, { useEffect } from "react";
import { toast } from "react-toastify";

import Form from "./TodoForm";
import Header from "./TodoHeader";
import styles from "./styles.module.css";
import TodoInfo from "./TodoInfo";

const Todo = (props) => {
  const [open, setOpen] = React.useState(false);
  const [todoList, setTodoList] = React.useState([]);

  const [currentTodo, setCurrentTodo] = React.useState(null);

  useEffect(() => {
    fetchTodoList();
  }, []);

  /* Fetch all the list data */
  const fetchTodoList = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((todo) => todo.json())
      .then((todo) => setTodoList(todo));
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      window.location.reload(true);
      const temdata = todoList;
      setTodoList(temdata);
      return;
    }

    const result = todoList.filter((val) =>
      val.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setTodoList(result);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const closePopup = () => {
    setOpen(false);
    setCurrentTodo(null);
  };

  /* Delete data */
  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status !== 200) {
        return;
      } else window.confirm("are you sure you want to delete this task?");
      {
        const result = todoList.filter((todo) => todo.id !== id);
        setTodoList(result);
      }
    });
  };

  /* create  task using Post API */
  const handleAddNew =  (obj) => {
     fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: obj.title,
        completed: obj?.completed,
        userid:1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setTodoList((todoList) => [...todoList, data]);
      })
      .catch((error) => console.log(error));
  };

  /* update the task using Put method */

  const handleUpdate =  (obj) => {
     fetch(
      `https://jsonplaceholder.typicode.com/users/` + currentTodo.id,
      {
        method: "PUT",
        body: JSON.stringify({
          title: obj.title,
          completed: obj?.completed,
          userid:1
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // setUsers((users) => [...users, data]);
        const updatedUsers = todoList.map((todo) => {
          if (todo.id === currentTodo.id) {
            todo.title = obj.title;
            todo.completed = obj.completed;
          }

          return todo;
        });

        setTodoList((todoList) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (values, form) => {
    // * inputData comes from the form
    // * form comes from the form object which contain everything

    // validations
    if (!values.title.trim()) {
      toast.error("task name is invalid", "");
      return; // ? this will stop the process
    }

    // ? submission accept two cases add or update todo
    if (Boolean(currentTodo)) {
      // ? in case we have data on currentTodo that mean user clicked edit icon
      handleUpdate({
        title: values.title,

        completed: values?.completed,
      });
      setCurrentTodo(null);
    } else {
      // ? otherwise just add new todo
      handleAddNew({
        title: values.title,

        completed: values?.completed,
      });
    }
    setOpen(false);
   
  };

  const handleOnComplete = (id) => {
    const result = todoList.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo
    );
    setTodoList(result);
  };

  return (
    <div className={styles.todoMainBox}>
      <Header tasksNumber={todoList?.length} />
      
      <Form
        onSubmit={handleSubmit}
        initialValues={currentTodo || {}}
        handleClickOpen={handleClickOpen}
        closePopup={closePopup}
        open={open}
        handleSearch={handleSearch}
      />
      {/* ? todo body */}
      <div>
        {todoList?.length > 0 ? (
          todoList?.slice()  
          .reverse().map((todo) => (
            <TodoInfo
              key={todo.id}
              task={todo}
              onComplete={() => handleOnComplete(todo.id)}
              onDelete={() => handleDelete(todo.id)}
              onEdit={() => {
                handleClickOpen();
                setCurrentTodo(todo);
              }}
              
                
            
            />
          ))
        ) : (
          <p>no tasks</p>
        )}
      </div>
    </div>
  );
};

export default Todo;
