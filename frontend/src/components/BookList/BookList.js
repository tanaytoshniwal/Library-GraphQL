import React from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../../queries/queries'
import BookDetails from '../BookDetails/BookDetails';

class BookList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selected: null
        }
    }
    displayBooks = ()=>{
        let data = this.props.data;
        if(data.loading) return <div>Loading...</div>
        return data.books.map((book) => {
            return (
                <li key={book.id} onClick={(e)=>{this.setState({selected: book.id})}}>{book.name}</li>
            )
        })
    }
    render(){
        return (
            <div>
                <h1>Books:</h1>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetails bookid = {this.state.selected} />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList)
