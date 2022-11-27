import React from "react";
import { toast } from "react-toastify";
import Form from "./Form";
import Header from "./Header";
import styles from "./styles.module.css";
import TodoInfo from "./TodoInfo";

const INIT_LIST = [
  { name: "task 1", id: "1", completed: false },
  { name: "task 2", id: "2", completed: false },
  { name: "task 3", id: "3", completed: false },
];
const Todo = () => {
  const [todoList, setTodoList] = React.useState(INIT_LIST);
  const [currentTodo, setCurrentTodo] = React.useState(null);

  const handleDelete = (id) => {
    if (window.confirm('are you sure you want to delete this task?')) {
      const result = todoList.filter((todo) => todo.id !== id);
      setTodoList(result);
    }
  };

  const handleAddNew = (obj) => {
    // ? organize the shape of the todo object
    const newId = todoList.length + 1;
    const newTodo = {
      id: newId,
      name: obj?.name,
      completed: false,
    };

    const result = [newTodo, ...todoList];
    setTodoList(result);
  };

  const handleUpdate = (obj) => {
    const newTodo = {
      ...currentTodo,
      name: obj?.name,
    };

    const result = todoList.map((todo) =>
      todo.id === currentTodo.id ? newTodo : todo
    );
    setTodoList(result);
  };

  const handleSubmit = (inputData, form) => {
    // * inputData comes from the form
    // * form comes from the form object which contain everything

    // validations
    if (!inputData?.trim()) {
      toast.error('task name is invalid', '')
      return; // ? this will stop the process
    }

    // ? submission accept two cases add or update todo
    if (Boolean(currentTodo)) {
      // ? in case we have data on currentTodo that mean user clicked edit icon
      handleUpdate({ name: inputData });
      setCurrentTodo(null)
      form.reset();
    } else {
      // ? otherwise just add new todo
      handleAddNew({ name: inputData });
      form.reset();
    }
  };

  const handleOnComplete = (id) => {
    const result = todoList.map((todo) =>
      todo.id === id ? {
        ...todo,
        completed: !todo.completed,
      }
      : todo
    );
    setTodoList(result)
  };

  return (
    <div className={styles.todoMainBox}>
      <Header tasksNumber={todoList?.length} />
      <Form onSubmit={handleSubmit} initialValues={currentTodo} />
      {/* ? todo body */}
      <div>
        {todoList?.length === 0 && <p>no tasks</p>}

        {todoList?.map((todo) => (
          <TodoInfo
            key={todo.id}
            task={todo}
            onComplete={() => handleOnComplete(todo.id)}
            onDelete={() => handleDelete(todo.id)}
            onEdit={() => setCurrentTodo(todo)}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
