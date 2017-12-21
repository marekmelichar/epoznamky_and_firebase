import React, {Component} from 'react';

// import * as firebase from 'firebase';

import {signUpUser, addNotification} from '../../actions';
import { connect } from "react-redux";

import { Link } from "react-router-dom";

// import { browserHistory } from 'react-router';
// import Header from '../components/Header.jsx';

import NotificationContainer from '../notification/Notification';

import IconNotes from '../../components/icons/IconNotes';
import IconMail from '../../components/icons/IconMail';
import IconLock from '../../components/icons/IconLock';


class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    // document.body.classList.toggle('main-page', this.props.mainPageClass);
    document.body.classList.toggle('main-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('main-page');
  }

  onSubmit(event) {
    event.preventDefault();

    const {email, password, confirmPassword} = this.state

    if (email && password === confirmPassword) {
      this.props.signUpUser({email, password})
    }

    if (password === "" || confirmPassword === "" || password !== confirmPassword) {
      this.props.addNotification('Passwords do not match, also can not be empty', 'error')
    }
  }

  render() {
    return(
      <div>
        <div className="row">
          <div className="column size_100">
            <div className="icon-wrapper"><IconNotes fill="#2DB5CF" /></div>
            <h1>epoznamky.cz</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <div className="icon-wrapper"><IconMail fill="#707680" /></div>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Heslo"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <div className="icon-wrapper"><IconLock fill="#707680" /></div>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password-confirm"
                  placeholder="Potvrdit heslo"
                  onChange={e => this.setState({ confirmPassword: e.target.value })}
                />
                <div className="icon-wrapper"><IconLock fill="#707680" /></div>
              </div>
              <button type="submit" className="btn btn-default">Registrovat se</button>
            </form>
            <div className="margin-bottom-1">nebo</div>
            <Link className="margin-bottom-1" to="/">Zpět na hlavní stranu</Link>
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
// SignUp = connect(mapStateToProps, actions)(SignUp)
// export default withRouter(SignUp)
export default connect(null, {signUpUser, addNotification})(SignUp)
