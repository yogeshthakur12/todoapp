import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md'
import styles from '../styles.module.css';

import 'c:/Users/clickapps/todo-app/src/App.css';

const TodoInfo = (props) => {
  const { task} = props;
  

  return (

    <div className="grid-container">
  <div className="grid-item" style={task?.completed===true ? {backgroundColor:'#99ffbb'} : {textDecoration:'none'}}>

<div className={styles.task1}><p>{task.title}</p>
  </div>
  <div className={styles.iconsBox}>
  <MdEdit onClick={() => props.onEdit()}  className="deleteIcon" />
        <MdDelete onClick={() => props.onDelete()} className="editIcon" />
        
      </div>


 
     

      
    </div>


    </div>
    
    
  )
}

export default TodoInfo