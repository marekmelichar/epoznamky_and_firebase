import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import ReduxThunk from 'redux-thunk'
// import promise from "redux-promise";

import * as firebase from 'firebase';

import reducers from "./reducers";

import App from "./containers/app";

import registerServiceWorker from './registerServiceWorker';

import './style/style.css'

const config = {
    apiKey: "AIzaSyAyfqXQZQUAOAA8kvyUphsglrgvRiNgK8c",
    authDomain: "epoznamky-68d48.firebaseapp.com",
    databaseURL: "https://epoznamky-68d48.firebaseio.com",
    projectId: "epoznamky-68d48",
    storageBucket: "",
    messagingSenderId: "355304474876"
  };

firebase.initializeApp(config);

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
