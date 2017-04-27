import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql, graphql } from 'react-apollo'

import AuthorListItem from './author-list-item'

const mutation = gql`
mutation CreateAuthor($firstName: String!, $lastName: String!) {
  createAuthor(firstName: $firstName, lastName: $lastName) {
    ...AuthorListItem
  }
}
${AuthorListItem.fragments.authorListItem}
`

@graphql(mutation, {
  name: 'createAuthor'
})
export default class AuthorCreateForm extends Component {
  static propTypes = {
    createAuthor: PropTypes.func
  }

  handleFormSubmit = evt => {
    evt.preventDefault()

    this.props.createAuthor({
      variables: {
        firstName: this.refs.firstName.value,
        lastName: this.refs.lastName.value
      },
      updateQueries: {
        RootQuery: (previousQueryResult, { mutationResult }) => {
          return {
            ...previousQueryResult,
            authors: [
              ...previousQueryResult.authors,
              mutationResult.data.createAuthor
            ]
          }
        }
      }
    })
  }

  render () {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label>
          First Name:
          <input ref='firstName' />
        </label>

        <label>
          Last Name:
          <input ref='lastName' />
        </label>

        <input type='submit' />
      </form>
    )
  }
}
