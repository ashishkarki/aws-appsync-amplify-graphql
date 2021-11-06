import { API, Auth, graphqlOperation } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { createComment } from '../../graphql/mutations'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'

const CreatePostComment = ({ commentPostId = uuidv4() }) => {
  const EMPTY_COMMENT = {
    commentOwnerId: '',
    commentOwnerUsername: '',
    content: '',
    commentPostId: '',
    createdAt: '',
  }

  const [state, setState] = useState(EMPTY_COMMENT)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      commentPostId,
      createdAt: new Date().toISOString(),
    }))
  }, [commentPostId])

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

    const input = {
      commentPostId: commentPostId,
      commentOwnerId: state.commentOwnerId,
      commentOwnerUsername: state.commentOwnerUsername,
      content: state.content,
      createdAt: new Date().toISOString(),
    }

    setLoading(true)
    await API.graphql(graphqlOperation(createComment, { input }))
    setLoading(false)

    console.log(`CreatePostComment, updated state:`, state)
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

        <button type="submit" onClick={handleSubmit}>
          {loading ? <LoadingIndicator /> : 'Add Comment'}
        </button>
      </form>
    </div>
  )
}

export default CreatePostComment
