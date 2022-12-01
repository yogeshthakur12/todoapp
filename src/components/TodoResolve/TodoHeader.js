import React from 'react'
import styles from './styles.module.css';

const Header = (props) => {
  // ? 0 is the initial value of the tasksNumber
  const { tasksNumber = 0 } = props;

  return (
    <div className={styles.todoHeader}>
      <h2>Todos({tasksNumber})</h2>
    </div>
  )
}

export default Header