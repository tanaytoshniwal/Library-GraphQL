const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema/schema')

const app = express()

mongoose.connect('mongodb://tanay:test123@ds255857.mlab.com:55857/library')
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('server started on port 4000')
})