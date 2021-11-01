import { API, graphqlOperation, Auth } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
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

  // [] as dependencies mean load only first time and
  // so this construct is equivalent to componentDidMount
  // useEffect(() => {
  //   console.log(`CreatePost: useEffect with no deps at all!!`)
  // })
  useEffect(() => {
    async function fetchUser() {
      await Auth.currentUserInfo().then((user) => {
        // console.log(`CreatePost: current User is ${user.attributes.sub}`)

        // setPost({
        //   ...post,
        //   postOwnerId: user.attributes.sub,
        //   postOwnerUsername: user.username,
        // })
        setPost((prevPost) => {
          // console.log(`CreatePost: prevPost: ${JSON.stringify(prevPost)}`)
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

    // console.log(`CreatePost::input is ${JSON.stringify(input)}`)

    setLoading(true)
    const graphqlResult = await API.graphql(
      graphqlOperation(createPost, { input }),
    )
    setLoading(false)
    console.log(`result: ${JSON.stringify(graphqlResult)}`)

    setPost(EMPTY_POST)
  }

  const handleChangePost = (event) => {
    // console.log(
    //   `handlechange, name: ${[event.target.name]}, value: ${
    //     event.target.value
    //   }`,
    // )
    setPost({
      ...post,
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
