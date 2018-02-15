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
    apiKey: "AIzaSyAY5VD1tee8fWbSPM1qvNN0AKo8y-tzJE8",
    authDomain: "epoznamky-collaborative.firebaseapp.com",
    databaseURL: "https://epoznamky-collaborative.firebaseio.com",
    projectId: "epoznamky-collaborative",
    storageBucket: "",
    messagingSenderId: "992119666669"
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
