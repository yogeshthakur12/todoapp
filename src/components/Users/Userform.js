import styles from "../styles.module.css";
import React from "react";
import Button from "../atoms/button";
import FormInput from "../atoms/input";
import { TfiClose } from "react-icons/tfi";

const UserForm = (props) => {
  const { initialValues, closePopup, open, handleClickOpen, handleSearch } =
    props;

  const [formvalues, setFormvalues] = React.useState({
    name:initialValues.name || "",
    email: initialValues.email || "",
    username: initialValues.username || "",
    password: initialValues.password || "",
    phone: initialValues.phone || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ? task the first element value from the form
    // ! there is other way to handle this but this the easiest way bcz there is only 2 element on the form input and btn

    props.onSubmit(formvalues);
  };
  const handleNameChange = (e) => {
   const {name}=e.target

    setFormvalues((prevstate) => {
      return { ...prevstate, [name]: e.target.value };
    });
  };

  return (
    <>
      <div className={styles.formBox}>
        <FormInput
          type="text"
          className="textInput"
          name="name"
          placeholder="Search user by Name.."
          onChange={handleSearch}
        />

        <Button
          id={"btnSave"}
          type={"Submit"}
          value={"Add User"}
          isDisabled={false}
          clickHandler={handleClickOpen}
          className={styles.button}
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
                    <p> {initialValues.id ? "Update User" : "Add New User"} </p>
                    <h1 onClick={closePopup} style={{ cursor: "pointer" }}>
                      <TfiClose />
                    </h1>
                  </div>
                  <div className={styles.containerformBox}>
                  <FormInput
                      type={"text"}
                      placeholder={"Enter Name.."}
                      name={"name"}
                      defaultValue={initialValues?.name}
                      onChange={handleNameChange}
                      label={"Name"}
                      autocomplete="off"
                      required={true}
                    />
                    

                    <FormInput
                      type={"text"}
                      placeholder={"Enter email.."}
                      name={"email"}
                      defaultValue={initialValues?.email}
                      onChange={handleNameChange}
                      label={"Email"}
                      autocomplete="off"
                      required={true}
                    />
                    <FormInput
                      type={"text"}
                      placeholder={"Enter username.."}
                      name={"username"}
                      defaultValue={initialValues?.username}
                      onChange={handleNameChange}
                      label={"Username"}
                      autocomplete="off"
                      required={true}
                    />
                    
                    <FormInput
                      type={"text"}
                      placeholder={"Enter Phone Number.."}
                      name={"phone"}
                      defaultValue={initialValues?.phone}
                      onChange={handleNameChange}
                      label={"Phone"}
                      autocomplete="off"
                      required={true}
                    />

                    <div className={styles.buttonsave}>
                      <Button
                        id={"btnSave"}
                        type={"Submit"}
                        value={"Save"}
                        className={styles.button}
                      />
                    </div>
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
export default UserForm;
