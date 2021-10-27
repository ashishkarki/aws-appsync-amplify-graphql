import React, { Component } from 'react'
import { listPosts } from '../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import Loader from 'react-loader-spinner'

import styles from './DisplayPosts.module.scss'

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
    console.log(`All posts: ${postResult.data.listPosts.items}`)

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
                <h2> {post.postTitle} </h2>
              </div>
            ))
          ) : (
            <Loader
              type="RevolvingDot"
              color="black"
              height={100}
              width={100}
            />
          )}
        </div>
      </div>
    )
  }
}

export default DisplayPosts
