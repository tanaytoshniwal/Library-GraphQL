const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList } = graphql    // destructuring required properties

// dummy data
let books = [
    { name: 'Harry Potter 1', genre: 'Magic', id: '1', authorId: '1' },
    { name: 'Harry Potter 2', genre: 'Magic', id: '2', authorId: '2' },
    { name: 'Harry Potter 3', genre: 'Magic', id: '3', authorId: '3' },
    { name: 'Harry Potter 4', genre: 'Magic', id: '4', authorId: '1' },
    { name: 'Harry Potter 5', genre: 'Magic', id: '5', authorId: '2' },
    { name: 'Harry Potter 6', genre: 'Magic', id: '6', authorId: '3' }
]
let authors = [
    { name: 'Tony 1', age: 69, id: '1' },
    { name: 'Tony 2', age: 69, id: '2' },
    { name: 'Tony 3', age: 69, id: '3' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',   // name of the type
    fields: () => ({    // fields of the type
        id: { type: GraphQLID },    // GraphQLString is String for GraphQL
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({   // end points of data graph
    name: 'RootQueryType',
    fields: {
        book: {    // end point for book
            type: BookType,
            args: { id: { type: GraphQLID } },   // expect this argument to be passed by user
            resolve(parent, args){
                // code to get data from database/any other source

                // lodash finds the required data from given data array
                return _.find(books, { id: args.id });
            }
        }, 
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})

// export schema
module.exports = new GraphQLSchema({
    query: RootQuery
})