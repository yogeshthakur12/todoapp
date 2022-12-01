import styles from "./styles.module.css";
import React from "react";
import Button from "../atoms/button";
import FormInput from "../atoms/input";

const Form = (props) => {
  const { initialValues, closePopup, open } = props;
  const [formvalues, setFormvalues] = React.useState({
    name: initialValues.name || "",
    summary: initialValues.summary || "",
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
                    <h1> {initialValues.id ? "Update" : "Add new task"} </h1>
                    <h1 onClick={closePopup}>X</h1>
                  </div>
                  <div className={styles.containerformBox}>
                    <hr />
                    <FormInput
                      type="text"
                      placeholder="Enter Task name.."
                      name="name"
                      defaultValue={initialValues?.name}
                      onChange={handleNameChange}
                     required
                      label="Task Name"
                    />

                    <label htmlFor="summary">
                      <b>Task Summary</b>
                    </label>
                    <textarea
                      placeholder="Enter Task Summary"
                      defaultValue={initialValues?.summary}
                      onChange={handleNameChange}
                      name="summary"
                      required
                    />
                    <FormInput
                      type="checkbox"
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
