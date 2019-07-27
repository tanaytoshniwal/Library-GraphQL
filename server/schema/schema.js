const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull } = graphql    // destructuring required propertiess

const BookType = new GraphQLObjectType({
    name: 'Book',   // name of the type
    fields: () => ({    // fields of the type
        id: { type: GraphQLID },    // GraphQLString is String for GraphQL
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                // return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId)
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
                // return _.filter(books, { authorId: parent.id })
                return Book.find({ authorId: parent.id })
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
                // return _.find(books, { id: args.id });
                return Book.findById(args.id)
            }
        }, 
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors
                return Author.find({})
            }
        }
    }
})

// allows us to add, delete, edit, etc. data
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {    // defining each functions of mutation
            type: AuthorType,
            args: {     // arguments for new author type
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({   // creating instance of mongoose schema
                    name: args.name,
                    age: args.age
                })
                return author.save()   // mongoose function
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            } 
        }
    }
})

// export schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})