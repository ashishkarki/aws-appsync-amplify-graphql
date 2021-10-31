import React, { Component } from 'react'
import { listPosts } from '../../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import Loader from 'react-loader-spinner'

import styles from './DisplayPosts.module.scss'
import DeletePost from '../DeletePost/DeletePost'
import EditPost from '../EditPost/EditPost'

export class DisplayPosts extends Component {
  constructor() {
    super()

    this.state = {
      posts: [],
    }
  }

  componentDidMount = async () => {
    this.getPosts()
  }

  getPosts = async () => {
    const postResult = await API.graphql(graphqlOperation(listPosts))
    // console.log(`All posts: ${postResult.data.listPosts.items}`)

    this.setState({
      posts: postResult.data.listPosts.items,
    })
  }

  render() {
    const { posts } = this.state

    return (
      <div>
        <div className={styles.header}> List of Posts</div>
        <div className={styles.posts}>
          {posts && posts.length ? (
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
                  <DeletePost />
                </div>
              </div>
            ))
          ) : (
            <Loader
              type="RevolvingDot"
              color="black"
              height={100}
              width={100}
              timeout={3000}
            />
          )}
        </div>
      </div>
    )
  }
}

export default DisplayPosts
