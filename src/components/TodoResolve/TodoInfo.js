import React from 'react';
import { HiOutlineTrash, HiPencilAlt } from 'react-icons/hi'
import styles from './styles.module.css';

const TodoInfo = (props) => {
  const { task } = props;
  const randomId = React.useId();

  return (
    // ? box will be flex
    <div className={styles.todoInfoBox}>
      <div className={styles.todoTextBox}>
        <input type="checkbox" id={randomId} onChange={() => props.onComplete()} />
        <label htmlFor={randomId}>{task?.name}</label>
      </div>

      <div className={styles.iconsBox}>
        <HiOutlineTrash onClick={() => props.onDelete()} className="editIcon" />
        <HiPencilAlt onClick={() => props.onEdit()} className="deleteIcon" />
      </div>
    </div>
  )
}

export default TodoInfo