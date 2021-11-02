import React, { Component } from 'react'
import { listPosts } from '../../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'

import styles from './DisplayPosts.module.scss'
import DeletePost from '../DeletePost/DeletePost'
import EditPost from '../EditPost/EditPost'
import { onCreatePost, onDeletePost } from '../../graphql/subscriptions'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import { deletePost } from '../../graphql/mutations'
import ToastDisplayer from '../ToastDisplayer/ToastDisplayer'

export class DisplayPosts extends Component {
  createPostListener = null
  deletePostListener = null

  constructor() {
    super()

    this.state = {
      posts: [],
      loading: false,
      toast: {
        show: false,
        message: 'Please check console',
        type: 'info',
      },
    }
  }

  componentDidMount = async () => {
    // console.log(`DisplayPosts component: componentDidMount called..`)
    this.getPosts()

    this.createPostListener = await API.graphql(
      graphqlOperation(onCreatePost),
    ).subscribe((observerOrNext) => {
      const newPost = observerOrNext.value.data.onCreatePost

      this.setState({
        ...this.state,
        posts: [newPost, ...this.state.posts],
      })
    })

    this.deletePostListener = await API.graphql(graphqlOperation(onDeletePost))
      // .subscribe((observerOrNext) => observerOrNext)
      .subscribe((observerOrNext) => {
        const deletedPost = observerOrNext.value.data.onDeletePost
        const updatedPosts = this.state.posts.filter(
          (post) => post.id !== deletedPost.id,
        )

        this.setState({
          ...this.state,
          posts: updatedPosts,
        })
      })
  }

  componentWillUnmount = () => {
    if (this.createPostListener !== null) {
      this.createPostListener.unsubscribe()
    }

    if (this.deletePostListener !== null) {
      this.deletePostListener.unsubscribe()
    }
  }

  getPosts = async () => {
    this.setLoadingState(true)
    const postResult = await API.graphql(graphqlOperation(listPosts))
    // console.log(`All posts: ${postResult.data.listPosts.items}`)
    this.setLoadingState(false)

    this.setState({
      ...this.state,
      posts: postResult.data.listPosts.items.filter(
        (postItem) => !postItem._deleted,
      ),
    })
  }

  setLoadingState = (loadingState = false) => {
    this.setState({
      ...this.state,
      loading: loadingState,
    })
  }

  handlePostDeletionParent = async (deletedPost) => {
    this.setLoadingState(true)

    const input = {
      id: deletedPost.id,
      _version: deletedPost._version,
    }
    console.log(`input for deletion is ${JSON.stringify(input)}`)

    try {
      await API.graphql(graphqlOperation(deletePost, { input }))
    } catch (error) {
      console.log(`error: ${JSON.stringify(error)}`)

      this.setState({
        ...this.state,
        toast: {
          show: true,
          message: 'This post is already scheduled to be deleted!!',
          type: 'error',
        },
      })
    }
    this.setLoadingState(false)
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />
    }

    const { posts } = this.state

    return (
      <div>
        {this.state.toast.show && (
          <ToastDisplayer
            message={this.state.toast.message}
            toastType={this.state.toast.type}
          />
        )}

        <div className={styles.header}> List of Posts</div>
        <div className={styles.posts}>
          {!this.state.loading ? (
            posts.map((post, idx) => (
              <div className={styles.post} key={idx}>
                <h2 className={styles.postTitle}> {post.postTitle} </h2>
                <p className={styles.postSub}>
                  Written by: {post.postOwnerUsername} on:
                  {new Date(post.createdAt).toDateString()}
                </p>

                <p className={styles.postBody}>{post.postBody}</p>

                <div className={styles.actionBtns}>
                  <EditPost />
                  <DeletePost
                    deletedPost={post}
                    handlePostDeletion={(deletedPost) =>
                      this.handlePostDeletionParent(deletedPost)
                    }
                  />
                </div>
              </div>
            ))
          ) : (
            <LoadingIndicator />
          )}
        </div>
      </div>
    )
  }
}

export default DisplayPosts
