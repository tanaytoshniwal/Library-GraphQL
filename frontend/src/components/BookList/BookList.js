import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    }
`

function BookList(props) {
    console.log(props)
    return (
        <div>
            <ul id="book-list">
                <li>Book</li>
            </ul>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList)
