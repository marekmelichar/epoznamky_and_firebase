import React, {Component} from 'react';
import { withRouter } from "react-router-dom";

import * as firebase from 'firebase';

import uuidv4 from 'uuid/v4'

// import { browserHistory } from 'react-router';

import Logo from '../../components/logo/Logo';
import IconPencil from '../../components/icons/IconPencil';
import Modal from 'react-modal';
// import { Posts } from '../../api/Posts.js';

// import LoginButtons from './LoginButtons.jsx';


class Header extends Component {
  constructor () {
    super();

    this.state = {
      open: false,
      title: '',
      content: '',
      tags: []
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

    firebase.auth().signOut().then(() => {
      console.log('Signed Out')
      this.props.history.push('/')
    }).catch( error => {
      console.error('Sign Out Error', error);
    })
  }

  // contacts(event) {
  //   event.preventDefault();
  //
  //   browserHistory.push('/kontakty');
  // }

  openModal () { this.setState({open: true}); }

  closeModal () { this.setState({open: false}); }

  addPost(event){
    event.preventDefault();

    let id = uuidv4()

    if (this.state.title !== '' && this.state.content !== '') {
      // Meteor.call('posts.insert', this.state.title, this.state.content, this.state.tags);

      const database = firebase.database()

      database.ref(`posts/${id}`).set({
        title: this.state.title,
        content: this.state.content,
        tags: this.state.tags
      })

      this.setState({
        title: '',
        content: ''
      });

      return this.closeModal();
    } else {
      console.log('you have to provide title and content');
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
    // let tagss = {
    //   tags: (event.target.value).split( ',' ).map( ( string ) => { return arr.push(string.trim());
    // })}

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
              <button onClick={this.openModal} type="button" className="btn btn-custom">Nová poznámka<IconPencil fill="#FFF" /></button>
            </div>
            <div className="column size_25 for-nav">
              <nav className="nav inline navbar-right text-right">
                <ul>
                  {/* <li role="presentation"><a onClick={this.contacts.bind(this)}>Kontakty</a></li> */}
                  <li role="presentation"><a onClick={this.logout.bind(this)}>Odhlásit se</a></li>
                </ul>
              </nav>
            </div>

            <Modal
              isOpen={this.state.open}
              contentLabel="Add new note Modal"
              style={customStyles}
            >
              <a className="close-modal" onClick={this.closeModal}>X</a>
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

export default withRouter(Header)
