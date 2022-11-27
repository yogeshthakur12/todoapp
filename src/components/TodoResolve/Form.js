import React from "react";
import styles from "./styles.module.css";

const Form = (props) => {
  const { initialValues } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    // ? task the first element value from the form
    // ! there is other way to handle this but this the easiest way bcz there is only 2 element on the form input and btn
    const inputValue = e.target[0].value;

    props.onSubmit(inputValue, e?.target);
  };
  return (
    <form onSubmit={handleSubmit} className={styles.formBox} autoComplete="off">
      <input
        type="text"
        className="textInput"
        defaultValue={initialValues?.name}
        name="task_name"
        placeholder="enter task name"
      />
      <button type="submit">{initialValues ? "Update" : "Add"}</button>
    </form>
  );
};

export default Form;
