import React, {Component} from 'react';

import {logOut, createNote, addNotification} from '../../actions';

import { connect } from 'react-redux';

import Logo from '../../components/logo/Logo';
import IconPencil from '../../components/icons/IconPencil';
import Modal from 'react-modal';

import NotificationContainer from '../notification/Notification';

class Header extends Component {
  constructor () {
    super();

    this.state = {
      open: false,
      title: '',
      content: '',
      tags: []
    }

    this.addPost = this.addPost.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleTags = this.handleTags.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  logout(event) {
    event.preventDefault();

    this.props.logOut()
  }

  addPost(event){
    event.preventDefault();

    const {title, content, tags} = this.state

    if (title && content) {

      this.props.createNote({title, content,tags})

      // reset the form
      return this.setState({
        title: '',
        content: '',
        tags: [],
        open: false
      });

    } else {
      this.props.addNotification('You have to provide title and content', 'error')
    }
  }

  handleTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  handleTags(event) {
    let arr = [];

    if (event.target.value !== '') {
      event.target.value.split( ',' ).map( string => arr.push(string.trim()))
    }

    return this.setState({
      tags: arr
    });
  }

  render() {
    return (
      <header className="header">
        <div className="">
          <div className="row">
            <div className="column size_25 position-relative for-logo">
              <Logo />
            </div>
            <div className="column size_50 for-button">
              <button onClick={() => this.setState({open: true})} type="button" className="btn btn-custom">Nová poznámka<IconPencil fill="#FFF" /></button>
            </div>
            <div className="column size_25 for-nav">
              <nav className="nav inline navbar-right text-right">
                <ul>
                  <li role="presentation"><a onClick={this.logout.bind(this)}>Odhlásit se</a></li>
                </ul>
              </nav>
            </div>

            <Modal
              isOpen={this.state.open}
              contentLabel="Add new note Modal"
              style={customStyles}
            >
              <a className="close-modal" onClick={() => this.setState({open: false})}>X</a>
              <div className="confirm-text"><h3>Nová poznámka</h3></div>
              <form onSubmit={this.addPost}>
                <div className="form-group">
                  <input type="text" className="form-control" id="title" placeholder="Nadpis" onChange={this.handleTitle} />
                </div>
                <div className="form-group">
                  <textarea className="form-control" id="body" cols="61" rows="8" placeholder="Poznámka" onChange={this.handleContent}></textarea>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" id="tags" placeholder="Štítky" onChange={this.handleTags} />
                </div>
                <button type="submit" className="confirm-button blue">Přidat poznámku</button>
              </form>
            </Modal>
          </div>
        </div>
        <NotificationContainer />
      </header>
    );
  }
}

const customStyles =
  {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.5)'
  },
  content : {
    position                   : 'absolute',
    top                        : '20px',
    left                       : '20px',
    right                      : '20px',
    bottom                     : '20px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
}

export default connect(null, {logOut, createNote, addNotification})(Header)
