import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'

import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'

// configure aws amplify to work with this frontend app
Amplify.configure(aws_exports)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
