import React, { Component } from 'react'
import { gql } from 'react-apollo'
import { filter } from 'graphql-anywhere'

import LiteratureListItem from './literature-list-item'

export default class AuthorListItem extends Component {
  static fragments = {
    authorListItem: gql`
    fragment AuthorListItem on Author {
      id
      fullName
      literature {
        title
        ...LiteratureListItem
      }
    }
    ${LiteratureListItem.fragments.literature}
  `
  }

  render () {
    const { fullName, literature } = this.props.author
    const litFragment = LiteratureListItem.fragments.literature
    return (
      <li>
        <p>{fullName}</p>

        <ul>
          {literature.map(lit => (
            <LiteratureListItem
              key={lit.id}
              literature={filter(litFragment, lit)}
            />
          ))}
        </ul>
      </li>
    )
  }
}
