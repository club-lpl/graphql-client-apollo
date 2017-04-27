import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

import AuthorCreateForm from './components/author-create-form'
import AuthorListItem from './components/author-list-item'

const Loading = () => <p>Loading</p>

const query = gql`
query RootQuery {
  authors {
    id
    ...AuthorListItem
  }
}
${AuthorListItem.fragments.authorListItem}
`

@graphql(query, { name: 'authorsQuery' })
class App extends Component {
  static propTypes = {
    authorsQuery: PropTypes.shape({
      authors: PropTypes.array,
      loading: PropTypes.bool.isRequired
    })
  }

  render () {
    const { authors, loading } = this.props.authorsQuery

    if (loading) return <Loading />

    return (
      <div>
        <ul>
          {authors.map(author => (
            <AuthorListItem author={author} key={author.id} />
          ))}
        </ul>
        <AuthorCreateForm />
      </div>
    )
  }
}

export default App
