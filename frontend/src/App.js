import React from 'react';
import './App.css';
import BookList from './components/BookList/BookList';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import AddBook from './components/AddBook/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends React.Component {
  render(){
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Books List</h1>
          <BookList />
          <AddBook 
            setName = {this.setName} 
            setGenre = {this.setGenre}
            setAuthor = {this.setAuthor}
            submitForm = {this.submitForm} />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
