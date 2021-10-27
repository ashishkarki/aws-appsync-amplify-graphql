import React from 'react'

import styles from './DeletePost.module.scss'

const DeletePost = () => {
  return (
    <div>
      <button
        className={styles.deleteBtn}
        onClick={() => console.log('delete clicked')}
      >
        Delete Post?
      </button>
    </div>
  )
}

export default DeletePost
