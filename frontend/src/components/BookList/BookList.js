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

const BookList = (props)=>{
    const displayBooks = ()=>{
        let data = props.data;
        if(data.loading) return <div>Loading...</div>
        return data.books.map((book) => {
            return (
                <li key={book.id}>{book.name}</li>
            )
        })
    }
    let data = displayBooks();
    return (
        <div>
            <h1>Books:</h1>
            <ul id="book-list">
                {data}
            </ul>
        </div>
    )
}

export default graphql(getBooksQuery)(BookList)
