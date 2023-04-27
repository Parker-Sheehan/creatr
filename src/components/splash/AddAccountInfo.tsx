import React from 'react'
import styles from './AddAccountInfo.module.css'

const AddAccountInfo = () => {
  return (
    <div className={styles.main}>
        <h1>Show your style</h1>

        <h1>Preach your passion</h1>
        <textarea className={styles.textarea} name="" id="" placeholder='Tell us about your self...'></textarea>
    </div>
  )
}

export default AddAccountInfo