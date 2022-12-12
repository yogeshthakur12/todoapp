import React, { useEffect } from "react";
import { toast } from "react-toastify";

import UserForm from "./Userform";
import Header from "./Header";
import styles from "../styles.module.css";
import UserInfo from "./UserInfo";

const User = (props) => {
  const [open, setOpen] = React.useState(false);
  const [userList, setUserList] = React.useState([]);

  const [currentTodo, setCurrentTodo] = React.useState(null);

  useEffect(() => {
    fetchUserList();
  }, []);

  /* Fetch all the list data */
  const fetchUserList = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((user) => user.json())

      .then((user) => setUserList(user));
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      window.location.reload(true);
      const temdata = userList;
      setUserList(temdata);
      return;
    }

    const result = userList.filter(
      (val) =>
        val.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        val.username.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setUserList(result);
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
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status !== 200) {
        return;
      } else window.confirm("are you sure you want to delete this user?");
      {
        const result = userList.filter((user) => user.id !== id);
        setUserList(result);
      }
    });
  };

  /* create  task using Post API */
  const handleAddNew = async (obj) => {

    
    await fetch('https://jsonplaceholder.typicode.com/users',{
      method: "POST",
      body: JSON.stringify({
      name:obj.name,
        email:obj.email,
        username: obj.username,
        password: obj.password,
        phone: obj.phone,
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
        console.log(data);
        setUserList((userList) => [...userList, data]);
      })
      .catch((error) => console.log(error));
  };

  /* update the task using Put method */

  const handleUpdate = async(obj) => {
    console.log(obj)
    await fetch(`https://jsonplaceholder.typicode.com/users/` + currentTodo.id, {
      method: "PUT",
      body: JSON.stringify({
       ...obj
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // setUsers((users) => [...users, data]);
        const updatedUsers = userList.map((user) => {
          if (user.id === currentTodo.id) {
           user.name =obj.name;
            user.email = obj.email;
            user.username = obj.username;
            user.password = obj.password;
            user.phone = obj.phone;
          }
         
          return user;
        });

        setUserList(updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (values,form) => {
    // * inputData comes from the form
    // * form comes from the form object which contain everything

    // ? submission accept two cases add or update todo
    if (Boolean(currentTodo)) {
      // ? in case we have data on currentTodo that mean user clicked edit icon
      handleUpdate({
       
        name:values.name,
       email: values.email,
        username: values.username,
        password: values.password,
        phone: values.phone,
      });
      setCurrentTodo(null);
    } else {
      // ? otherwise just add new todo
      handleAddNew({
        name:values.name,
        email: values.email,
         username: values.username,
         password: values.password,
         phone: values.phone,
      });
    }
    setOpen(false);
    form.reset();
  };

  return (
    <div className={styles.todoMainBox}>
      <Header tasksNumber={userList?.length} />

      <UserForm
        onSubmit={handleSubmit}
        initialValues={currentTodo || {}}
        handleClickOpen={handleClickOpen}
        closePopup={closePopup}
        open={open}
        handleSearch={handleSearch}
      />
      {/* ? todo body */}
      <div className={styles.todocontainer}>
        {userList?.length > 0 ? (
          userList?.map((user) => (
              <UserInfo
                key={user.id}
             
                task={user}
                onDelete={() => handleDelete(user.id)}
                onEdit={() => {
                  handleClickOpen();
                  setCurrentTodo(user);
                }}
              />
            ))
        ) : (
          <p>no Users</p>
        )}
      </div>
    </div>
  );
};

export default User;
