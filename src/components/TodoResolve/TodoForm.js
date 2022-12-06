import styles from "./styles.module.css";
import React from "react";
import Button from "../atoms/button";
import FormInput from "../atoms/input";
import { GrFormClose } from "react-icons/gr";

const Form = (props) => {
  const { initialValues, closePopup, open, handleClickOpen, handleSearch } =
    props;
  const [formvalues, setFormvalues] = React.useState({
    name: initialValues.title || "",
    completed: initialValues.completed || false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ? task the first element value from the form
    // ! there is other way to handle this but this the easiest way bcz there is only 2 element on the form input and btn

    props.onSubmit(formvalues);
  };
  const handleNameChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormvalues((prevstate) => {
      return { ...prevstate, [name]: type === "checkbox" ? checked : value };
    });
  };

  return (
    <>
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
          onChange={handleSearch}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className={styles.formBox}
        autoComplete="off"
      >
        <div>
          <div>
            {open ? (
              <div className={styles.mainformbox}>
                <div className={styles.popupBox}>
                  <div className={styles.headerFormBox}>
                    <p>
                      {" "}
                      {initialValues.id
                        ? "Update New Task"
                        : "Add New Task"}{" "}
                    </p>
                    <h1 onClick={closePopup} style={{ cursor: "pointer" }}>
                      <GrFormClose />
                    </h1>
                  </div>
                  <div className={styles.containerformBox}>
                    <hr />
                    <FormInput
                      type={"text"}
                      placeholder={"Enter Task name.."}
                      name={"title"}
                      defaultValue={initialValues?.title}
                      onChange={handleNameChange}
                      label={"Task Name"}
                      autocomplete="off"
                      required={true}
                    />

                    <FormInput
                      type={"checkbox"}
                      name="completed"
                      defaultChecked={initialValues?.completed}
                      onChange={handleNameChange}
                      label="Completed"
                  
                    />
                    <hr />

                    <Button
                      id={"btnSave"}
                      type={"Submit"}
                      value={initialValues.id ? "Update" : "Add"}
                      className={styles.button}
                    />
                  </div>
                </div>
              </div>
            ) : (
              
              ""
            )}
          </div>
        </div>
      </form>
    </>
  );
};
export default Form;
