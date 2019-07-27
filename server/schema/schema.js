const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql    // destructuring required properties

const BookType = new GraphQLObjectType({
    name: 'Book',   // name of the type
    fields: () => ({    // fields of the type
        id: { type: GraphQLString },    // GraphQLString is String for GraphQL
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({   // end points of data graph
    name: 'RootQueryType',
    fields: {
        book: {    // end point for book
            type: BookType,
            args: { id: { type: GraphQLString } },   // expect this argument to be passed by user
            resolve(parent, args){
                // code to get data from database/any other source
            }
        }
    }
})

// export schema
module.exports = new GraphQLSchema({
    query: RootQuery
})