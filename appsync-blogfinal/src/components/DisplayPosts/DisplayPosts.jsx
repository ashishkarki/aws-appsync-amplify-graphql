import React, { Component } from 'react'
import { listPosts } from '../../graphql/queries'
import { API, Auth, graphqlOperation } from 'aws-amplify'

import styles from './DisplayPosts.module.scss'
import DeletePost from '../DeletePost/DeletePost'
import EditPost from '../EditPost/EditPost'
import {
  onCreatePost,
  onDeletePost,
  onUpdatePost,
} from '../../graphql/subscriptions'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import { deletePost } from '../../graphql/mutations'
import ToastDisplayer from '../ToastDisplayer/ToastDisplayer'
import CreatePostComment from '../CreatePostComment/CreatePostComment'

export class DisplayPosts extends Component {
  createPostListener = null
  deletePostListener = null
  updatePostListener = null

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
      postOwnerUserId: '', // who created this post
    }
  }

  componentDidMount = async () => {
    // get and store the post owner id
    await Auth.currentUserInfo().then((currentUser) =>
      this.setState({
        ...this.state,
        postOwnerUserId: currentUser.attributes.sub,
      }),
    )

    // get all posts
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

    this.updatePostListener = await API.graphql(
      graphqlOperation(onUpdatePost),
    ).subscribe((observerOrNext) => {
      const postThatGotUpdated = observerOrNext.value.data.onUpdatePost
      const existingListOfPosts = this.state.posts

      const updatedListOfPosts = existingListOfPosts.map((post) => {
        if (post.id === postThatGotUpdated.id) {
          return postThatGotUpdated
        }
        return post
      })

      this.setState({
        ...this.state,
        posts: updatedListOfPosts,
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

    if (this.updatePostListener !== null) {
      this.updatePostListener.unsubscribe()
    }
  }

  getPosts = async () => {
    this.setLoadingState(true)

    this.setState({
      ...this.state,
      toast: {
        show: true,
        message: 'Please wait, loading your posts',
        type: 'primary',
      },
    })
    const postResult = await API.graphql(graphqlOperation(listPosts))

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
                <label htmlFor="">
                  {this.state.postOwnerUserId}---{post.postOwnerId}
                </label>
                {this.state.postOwnerUserId === post.postOwnerId && (
                  <div className={styles.actionBtns}>
                    <EditPost
                      postId={post.id}
                      postTitle={post.postTitle}
                      postBody={post.postBody}
                    />
                    <DeletePost
                      deletedPost={post}
                      handlePostDeletion={(deletedPost) =>
                        this.handlePostDeletionParent(deletedPost)
                      }
                    />
                  </div>
                )}

                <div className={styles.comment}>
                  <CreatePostComment postId={post.id} />
                </div>
              </div>
            ))
          ) : (
            <div>
              <LoadingIndicator />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default DisplayPosts
