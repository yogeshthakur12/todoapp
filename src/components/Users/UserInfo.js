import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md'
import styles from '../styles.module.css';

import 'c:/Users/clickapps/todo-app/src/App.css';

const UserInfo = (props) => {
  const { task} = props;
  console.log(task);

  return (

    <div className="grid-container">
  <div className="grid-item" >

<div className={styles.label} key={task.id}>
    <p><label>Name: </label>{task?.name}</p>
<p><label>Username: </label>{task?.username}</p>
    <p><label>Email: </label>{task?.email}</p>
    
    
    <p><label>Phone: </label>{task?.phone}</p>
    
         
  </div>
  <div className={styles.iconsBox}>
  <MdEdit onClick={() => props.onEdit()}  className="deleteIcon" />
        <MdDelete onClick={() => props.onDelete()} className="editIcon" />
        
      </div>


 
     

      
    </div>


    </div>
    
    
  )
}

export default UserInfo