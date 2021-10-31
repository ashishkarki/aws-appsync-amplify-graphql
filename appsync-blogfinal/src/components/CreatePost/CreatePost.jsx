import { API, graphqlOperation } from 'aws-amplify'
import React, { useState } from 'react'
import Loader from 'react-loader-spinner'
import { createPost } from '../../graphql/mutations'

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

  const handleAddPost = async (event) => {
    event.preventDefault()

    const input = {
      postOwnerId: post.postOwnerId || EMPTY_POST.postOwnerId,
      postOwnerUsername: post.postOwnerUsername || EMPTY_POST.postOwnerUsername,
      postTitle: post.postTitle || EMPTY_POST.postTitle,
      postBody: post.postBody || EMPTY_POST.postBody,
      createdAt: new Date().toISOString(),
    }

    console.log(`input is ${JSON.stringify(input)}`)

    setLoading(true)
    const graphqlResult = await API.graphql(
      graphqlOperation(createPost, { input }),
    )
    setLoading(false)
    console.log(`result: ${JSON.stringify(graphqlResult)}`)

    setPost(EMPTY_POST)
  }

  const handleChangePost = (event) => {
    console.log(
      `handlechange, name: ${[event.target.name]}, value: ${
        event.target.value
      }`,
    )
    setPost({
      [event.target.name]: event.target.value,
    })
  }

  return loading ? (
    <Loader
      type="RevolvingDot"
      color="black"
      height={100}
      width={100}
      timeout={3000}
    />
  ) : (
    <form className={styles.createPost} onSubmit={handleAddPost}>
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
  )
}

export default CreatePost
