import React from "react";
import { toast } from "react-toastify";
import Button from "../atoms/button";
import Form from "./TodoForm";
import Header from "./TodoHeader";
import styles from "./styles.module.css";
import TodoInfo from "./TodoInfo";
import FormInput from "../atoms/input";
const INIT_LIST = [
  { name: "API call", summary: " task desciption...", id: "1", completed: false },
  { name: "Reuseable component", summary: "task desciption...", id: "2", completed: false },
  { name: "React-redux", summary: "task desciption...", id: "3", completed: false },
  { name: "javascript", summary: "task desciption...", id: "4", completed: true },
];

const Todo = (props) => {
  const [open, setOpen] = React.useState(false);
  const [todoList, setTodoList] = React.useState(INIT_LIST);

  const [currentTodo, setCurrentTodo] = React.useState(null);

  const handleSearch = (e) => {
    if (e.target.value === "") {
      window.location.reload(true);
      const temdata = todoList;
      setTodoList(temdata);
      return;
    }

    const result = todoList.filter((val) =>
      val.name.toLowerCase().includes(e.target.value.toLowerCase())
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
  const handleDelete = (id) => {
    if (window.confirm("are you sure you want to delete this task?")) {
      const result = todoList.filter((todo) => todo.id !== id);
      setTodoList(result);
    }
  };

  const handleAddNew = (obj) => {
    // ? organize the shape of the todo object
    const newId = todoList.length + 1;
    const newTodo = {
      id: newId,
      ...obj,
    };

    const result = [newTodo, ...todoList];
    setTodoList(result);
  };

  const handleUpdate = (obj) => {
    const newTodo = {
      ...currentTodo,
      ...obj,
    };

    const result = todoList.map((todo) =>
      todo.id === currentTodo.id ? newTodo : todo
    );
    setTodoList(result);
  };

  const handleSubmit = (values, form) => {
    // * inputData comes from the form
    // * form comes from the form object which contain everything

    // validations
    if (!values.name.trim()) {
      toast.error("task name is invalid", "");
      return; // ? this will stop the process
    }

    // ? submission accept two cases add or update todo
    if (Boolean(currentTodo)) {
      // ? in case we have data on currentTodo that mean user clicked edit icon
      handleUpdate({ name: values.name, summary: values.summary, completed:values.completed});
      setCurrentTodo(null);
    } else {
      // ? otherwise just add new todo
      handleAddNew({ name: values.name, summary: values.summary, completed:values.completed });
    }
    setOpen(false);
    form.reset();
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
      <div className={styles.formBox}>
        <Button 
        id={"btnSave"}
        type={"Submit"}
        value={"Add Task"}
        isDisabled={false}
        clickHandler={handleClickOpen}
        className={styles.button}
        />
        
<FormInput 
type="text"
className="textInput"
name="task_name"
placeholder="Search todo Tasks..."
onFocus={(e) => (e.target.placeholder = "")}
onBlur={(e) => (e.target.placeholder = "Search todo Tasks...")}
onChange={handleSearch}


/>
       
      
      </div>
      <Form
        onSubmit={handleSubmit}
        initialValues={currentTodo || {}}
        handleClickOpen={handleClickOpen}
        closePopup={closePopup}
        open={open}
        SearchTerm
      />
      {/* ? todo body */}
      <div>
        {todoList?.length > 0 ? (
          todoList?.map((todo) => (
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
