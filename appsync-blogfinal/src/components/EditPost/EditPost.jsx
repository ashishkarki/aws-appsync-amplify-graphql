import { API, graphqlOperation } from 'aws-amplify'
import Auth from '@aws-amplify/auth'
import React, { useEffect, useState } from 'react'
import { updatePost } from '../../graphql/mutations'

import styles from './EditPost.module.scss'

const EditPost = ({ postId, postTitle, postBody }) => {
  const [editPostState, setEditPostState] = useState({
    showModal: false,
    id: '',
    postOwnerId: '',
    postOwnerUsername: '',
    postTitle: '',
    postBody: '',
    editedPostInfo: {
      postTitle: postTitle,
      postBody: postBody,
    },
  })

  // console.log('EditPost:: state', JSON.stringify(editPostState))

  useEffect(() => {
    let cancel = false

    async function getUserInfo() {
      await Auth.currentUserInfo().then((userInfo) => {
        if (cancel) return

        setEditPostState((prevState) => {
          return {
            ...prevState,
            postOwnerId: userInfo.attributes.sub,
            postOwnerUsername: userInfo.username,
          }
        })
      })
    }

    getUserInfo()

    return () => {
      cancel = true
    }
  }, [])

  // show the form when Edit button is clicked
  const handleEditClick = () => {
    setEditPostState({
      ...editPostState,
      showModal: !editPostState.showModal,
    })

    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  // handle changes in the edit form fields
  const handleChange = (event) => {
    setEditPostState({
      ...editPostState,
      editedPostInfo: {
        ...editPostState.editedPostInfo,
        [event.target.name]: event.target.value,
      },
    })
  }

  // handle the final submission of the edit form
  const handleEditSubmit = async (event) => {
    event.preventDefault()
    // console.log(`EditPost:: handleSubmit:`, JSON.stringify(editPostState))
    const input = {
      id: postId,
      postOwnerId: editPostState.postOwnerId,
      postOwnerUsername: editPostState.postOwnerUsername,
      postTitle: editPostState.editedPostInfo.postTitle,
      postBody: editPostState.editedPostInfo.postBody,
      _version: editPostState.editedPostInfo._version,
    }

    await API.graphql(graphqlOperation(updatePost, { input }))

    // hide the edit form
    setEditPostState({
      ...editPostState,
      showModal: !editPostState.showModal,
    })
  }

  return (
    <div>
      {editPostState.showModal && (
        <div
          style={{
            border: '2px solid beige',
            margin: '0.5rem auto',
            padding: '0.5rem',
          }}
        >
          <form className={styles.editPost} onSubmit={handleEditSubmit}>
            <input
              type="text"
              placeholder="post title"
              name="postTitle"
              value={editPostState.editedPostInfo?.postTitle}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="post body"
              name="postBody"
              value={editPostState.editedPostInfo?.postBody}
              onChange={handleChange}
            />

            <button type="submit" onClick={handleEditSubmit}>
              Done
            </button>
          </form>
        </div>
      )}

      <button className={styles.editBtn} onClick={handleEditClick}>
        Edit Post!
      </button>
    </div>
  )
}

export default React.memo(EditPost)
