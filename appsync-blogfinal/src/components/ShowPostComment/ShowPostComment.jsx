import React from 'react'

import styles from './ShowPostComment.module.scss'

const ShowPostComment = ({ commentOwnerUsername, content, createdAt }) => {
  console.log('ShowPostComment::', commentOwnerUsername, content, createdAt)
  return (
    <div className={styles.showPostComment}>
      <span
        style={{
          fontStyle: 'italic',
          color: '#999',
        }}
      >
        Comment by: {commentOwnerUsername} <br />
        on: {createdAt}
      </span>
      <p>{content}</p>
    </div>
  )
}

export default ShowPostComment
