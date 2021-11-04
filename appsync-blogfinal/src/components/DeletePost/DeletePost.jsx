import React from 'react'

import styles from './DeletePost.module.scss'

const DeletePost = ({ deletedPost, handlePostDeletion }) => {
  return (
    <div>
      <button
        className={styles.deleteBtn}
        onClick={() => handlePostDeletion(deletedPost)}
      >
        Delete Post?
      </button>
    </div>
  )
}

export default DeletePost
