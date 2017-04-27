import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'react-apollo'

export default class LiteratureListItem extends Component {
  static fragments = {
    literature: gql`
      fragment LiteratureListItem on Literature {
        id
        title
      }
    `
  }

  static propTypes = {
    literature: PropTypes.shape({
      title: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    const { title } = this.props.literature
    return <li>{title}</li>
  }
}
