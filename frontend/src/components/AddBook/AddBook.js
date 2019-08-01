import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    }
`

const AddBook = (props)=>{
    const getAuthors = ()=>{
        let data = props.data;
        if(data.loading) return <option>Loading...</option>
        return data.authors.map(data=>{
            return(
                <option key={data.id}>{data.name}</option>
            )
        })
    }
    let data = getAuthors()
    return (
        <div>
            <form id="add-book">
                <div className="field">
                    <label>Book Name:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select>
                        {data}
                    </select>
                </div>
                <button>+</button>
            </form>
        </div>
    )
}

export default graphql(getAuthorsQuery)(AddBook)
