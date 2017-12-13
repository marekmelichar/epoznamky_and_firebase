import React, { Component } from 'react';

import * as actions from '../actions';
import { connect } from 'react-redux';


import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import * as firebase from 'firebase';

import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';
import PostsList from './posts_list/PostsList';
import Spinner from '../components/spinner/Spinner';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/posts' />}
    />
  )
}

class App extends Component {

  constructor() {
    super()

    this.state = {
      authed: false,
      loading: true
    }
  }

  userAuthorized() {
    return (
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({
            authed: true,
            loading: false,
          })
        } else {
          this.setState({
            authed: false,
            loading: false
          })
        }
      })
    )
  }

  componentDidMount() {
    this.userAuthorized()
  }

  componentWillUnmount() {
    this.userAuthorized()
  }

  render() {
    // console.log(this.state);

    return this.state.loading === true ? <Spinner /> : (
      <BrowserRouter>
        <Switch>
          <PublicRoute authed={this.state.authed} path='/' exact component={SignIn} />
          <PublicRoute authed={this.state.authed} path='/signup' component={SignUp} />
          <PrivateRoute authed={this.state.authed} path='/posts' component={PostsList}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

function mapStateToProps(state) {
  // console.log('state', state);
  return {
    // authorized: state.auth.payload
  };
}

export default connect(mapStateToProps, actions)(App);
