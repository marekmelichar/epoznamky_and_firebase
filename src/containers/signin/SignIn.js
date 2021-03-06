import React, { Component } from "react";

import {loginUser} from '../../actions';
import { connect } from "react-redux";

// import { browserHistory } from 'react-router'
// import { Link, withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

// import * as firebase from 'firebase';

// import SignUp from './signup/SignUp';

// import NotificationSystem from 'react-notification-system'

import NotificationContainer from '../notification/Notification';

import IconNotes from '../../components/icons/IconNotes';
import IconMail from '../../components/icons/IconMail';
import IconLock from '../../components/icons/IconLock';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    this.props.loginUser({ email, password })
  }

  render() {
    return(
      <div className="main-page">
        <div className="row">
          <div className="column size_100">
            <div className="icon-wrapper"><IconNotes fill="#2DB5CF" /></div>
            <h1>epoznamky.cz</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input type="email" className="form-control" id="email" placeholder="Email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" />
                <div className="icon-wrapper"><IconMail fill="#707680" /></div>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" id="password" placeholder="Heslo" />
                <div className="icon-wrapper"><IconLock fill="#707680" /></div>
              </div>
              <button type="submit" className="btn btn-default">Přihlásit se</button>
            </form>
            <div className="margin-bottom-1">nebo</div>
            <Link className="margin-bottom-1" to="/signup">Registrovat se</Link>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   // console.log('state', state);
//   return {
//
//   };
// }

// because of combination of connect and withRouter:
// SignIn = connect(mapStateToProps, actions)(SignIn)
// export default withRouter(SignIn)

export default connect(null, {loginUser})(SignIn)
