import React from 'react'
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../../queries/queries'

class AddBook extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          name: '',
          genre: '',
          authorId: ''
        }
      }
      setName = (name)=>{
        this.setState({
          name: name
        })
      }
      setGenre = (genre)=>{
        this.setState({
          genre: genre
        })
      }
      setAuthor = (author)=>{
        this.setState({
          authorId: author
        })
      }
      submitForm = (e)=>{
        e.preventDefault()
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [
              { query: getBooksQuery }
            ]
        })
      }
    getAuthors = ()=>{
        let data = this.props.getAuthorsQuery;
        if(data.loading) return <option disabled>Loading...</option>
        return data.authors.map(data=>{
            return(
                <option key={data.id} value={data.id}>{data.name}</option>
            )
        })
    }
    render(){
        return (
            <div>
                <form id="add-book" onSubmit={(e)=>this.submitForm(e)}>
                    <div className="field">
                        <label>Book Name:</label>
                        <input type="text" onChange={(e)=> this.setName(e.target.value) } />
                    </div>
                    <div className="field">
                        <label>Genre:</label>
                        <input type="text" onChange={(e)=> this.setGenre(e.target.value) } />
                    </div>
                    <div className="field">
                        <label>Author:</label>
                        <select onChange={(e)=> this.setAuthor(e.target.value) }>
                            <option>Select Author</option>
                            {this.getAuthors()}
                        </select>
                    </div>
                    <button>+</button>
                </form>
            </div>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)
