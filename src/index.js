import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:8000/graphql'
})

const client = new ApolloClient({ networkInterface })

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
