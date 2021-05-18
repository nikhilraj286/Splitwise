import React, { Component } from "react";
import { Provider } from "react-redux";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Store from "./store/store";
import "./App.css";
const client = new ApolloClient({ uri: `http://localhost:3001/graphql` });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={Store}>
          <BrowserRouter>
            <div id="main" style={{ minHeight: "100vh" }}>
              <Main />
            </div>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
