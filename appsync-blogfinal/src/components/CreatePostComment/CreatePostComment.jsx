import { API, Auth, graphqlOperation } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createComment } from '../../graphql/mutations'

const CreatePostComment = ({ commentPostId = uuidv4() }) => {
  const EMPTY_COMMENT = {
    commentOwnerId: '',
    commentOwnerUsername: '',
    content: '',
    commentPostId: '',
    createdAt: '',
  }

  const [state, setState] = useState(EMPTY_COMMENT)

  useEffect(() => {
    async function getUser() {
      const user = await Auth.currentAuthenticatedUser()
      setState((prevState) => ({
        ...prevState,
        commentOwnerId: user.attributes.sub,
        commentOwnerUsername: user.username,
      }))
    }
    getUser()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(state)

    const input = {
      commentPostId: commentPostId,
      commentOwnerId: state.commentOwnerId,
      commentOwnerUsername: state.commentOwnerUsername,
      content: state.content,
      createdAt: new Date().toISOString(),
    }

    await API.graphql(graphqlOperation(createComment, { input }))

    // clear the content field
    setState((prevState) => ({
      ...prevState,
      content: '',
    }))
  }

  return (
    <div className="create-post-comment">
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
          padding: '0.25rem',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <textarea
          name="content"
          cols="30"
          rows="3"
          required
          placeholder="add comment to this post.."
          value={state.content}
          onChange={handleChange}
        />

        <input type="submit" value="Add Comment" onClick={handleSubmit} />
      </form>
    </div>
  )
}

export default CreatePostComment
