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
  constructor(){
    super();
  }
  render(){
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
