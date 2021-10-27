import React from 'react'

import styles from './EditPost.module.scss'

const EditPost = () => {
  return (
    <div>
      <button
        className={styles.editBtn}
        onClick={() => console.log('edit clicked')}
      >
        Edit Post!
      </button>
    </div>
  )
}

export default EditPost
