import { API, graphqlOperation, Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { createPost } from '../../graphql/mutations'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'

import styles from './CreatePost.module.scss'

const CreatePost = () => {
  const EMPTY_POST = {
    postOwnerId: 'dummyOwnerId129',
    postOwnerUsername: 'dummyOwnerUsername128',
    postTitle: 'dummyPostTitle234',
    postBody: 'dummyPostBody564',
  }
  const [post, setPost] = useState(EMPTY_POST)
  const [loading, setLoading] = useState(false)

  // [] as dependencies mean load only first time and
  // so this construct is equivalent to componentDidMount
  // useEffect(() => {
  //   console.log(`CreatePost: useEffect with no deps at all!!`)
  // })
  useEffect(() => {
    async function fetchUser() {
      await Auth.currentUserInfo().then((user) => {
        // setPost({
        //   ...post,
        //   postOwnerId: user.attributes.sub,
        //   postOwnerUsername: user.username,
        // })
        setPost((prevPost) => {
          return {
            ...prevPost,
            postOwnerId: user.attributes.sub,
            postOwnerUsername: user.username,
          }
        })
      })
    }

    fetchUser()
  }, [])

  const handleAddPost = async (event) => {
    event.preventDefault()
    console.log(`CreatePost::state.post is ${JSON.stringify(post)}`)

    const input = {
      postOwnerId: post.postOwnerId || EMPTY_POST.postOwnerId,
      postOwnerUsername: post.postOwnerUsername || EMPTY_POST.postOwnerUsername,
      postTitle: post.postTitle || EMPTY_POST.postTitle,
      postBody: post.postBody || EMPTY_POST.postBody,
      createdAt: new Date().toISOString(),
    }

    setLoading(true)
    const graphqlResult = await API.graphql(
      graphqlOperation(createPost, { input }),
    )
    setLoading(false)
    console.log(`result: ${JSON.stringify(graphqlResult)}`)

    setPost(EMPTY_POST)
  }

  const handleChangePost = (event) => {
    setPost({
      ...post,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className={styles.createPost}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <form className={styles.createPostForm} onSubmit={handleAddPost}>
          <input
            type="text"
            name="postTitle"
            onChange={handleChangePost}
            value={post.postTitle}
            placeholder="post title"
            required
          />

          <textarea
            name="postBody"
            cols="40"
            rows="3"
            onChange={handleChangePost}
            value={post.postBody}
            placeholder="Post Body"
            required
          />

          <input
            type="submit"
            value="Create Post"
            className={styles.submitBtn}
            onClick={handleAddPost}
          />
        </form>
      )}
    </div>
  )
}

export default CreatePost
