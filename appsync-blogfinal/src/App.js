import './App.scss'
import CreatePost from './components/CreatePost/CreatePost'
import DisplayPosts from './components/DisplayPosts/DisplayPosts'

import Amplify, { Auth } from 'aws-amplify'
import aws_exports from './aws-exports'
import { withAuthenticator } from '@aws-amplify/ui-react'

Amplify.configure(aws_exports)

Auth.configure(aws_exports)

function App() {
  return (
    <div className="App">
      <CreatePost />

      <DisplayPosts />
    </div>
  )
}

export default withAuthenticator(App)
