import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main'
import Store from './store/store'
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;