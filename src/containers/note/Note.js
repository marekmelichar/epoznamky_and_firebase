import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from 'lodash'
import * as firebase from 'firebase';

import Modal from 'react-modal';

import { fetchNotes, noteUpdate, noteDelete, addNotification, fetchUsersEmails } from '../../actions';

import Header from '../header/Header';
import IconTrash from '../../components/icons/IconTrash'
import IconTag from '../../components/icons/IconTag'
import NotificationContainer from '../notification/Notification';

class Note extends Component {

  constructor (props) {
    super(props);

    this.state = {
      // when Editing of note, handle the values for actions request
      openEditModal: false,
      title: '',
      content: '',
      tags: [],
      // this is original note, consist of data from api call - this.props.fetchNotes()
      note: {
        uid: '',
        title: '',
        content: '',
        tags: [],
        sharedWith: []
      },
      openDeleteModal: false,
      titleOfModal: '',
      shareEmailValue: '',
      showTableOfUsers: false
    }
  }

  componentWillMount() {
    // when somebody comes to the URL, go and fetch data
    this.props.fetchNotes()

    this.props.fetchUsersEmails()
  }

  componentWillReceiveProps(nextProps) {

    // every new data will get processed

    const { notes } = nextProps;

    const { id } = this.props.match.params;

    const note = _.find(notes, itm => itm.uid === id)

    if (note) {
      return this.setState({
        title: note.title,
        content: note.content,
        tags: note.tags,
        note: {
          uid: id,
          title: note.title,
          content: note.content,
          tags: note.tags,
          sharedWith: note.sharedWith
        }
      })
    }
  }

  handleTitle = event => {
    this.setState({
      title: event.target.value
    });
  }

  handleContent = event => {
    this.setState({
      content: event.target.value
    });
  }

  handleTags = event => {
    let arr = [];

    if (event.target.value !== '') {
      event.target.value.split( ',' ).map( string => arr.push(string.trim()))
    }

    return this.setState({
      tags: arr
    });
  }

  handleEditNote = (e) => {
    e.preventDefault()

    const {note, title, content, tags} = this.state

    this.props.noteUpdate(note.uid, title, content, tags, note.sharedWith)

    this.setState({ openEditModal: false })
  }

  onNoteRemove = (note) => {

    this.props.noteDelete(note.uid, note.title)

    this.setState({ openDeleteModal: false })

    this.props.history.push("/notes")
  }

  openDeleteModal = (note) => {

    return this.setState({
      openDeleteModal: true,
      note
    })
  }

  handleShareEmailValue = e => {
    return this.setState({ shareEmailValue: e.target.value })
  }

  handleShareFormSubmit = e => {
    e.preventDefault()

    let {note, shareEmailValue} = this.state

    let emailsArray = note.sharedWith ? [...note.sharedWith] : []

    if (_.includes(emailsArray, shareEmailValue)) {
      this.props.addNotification('This email is already in the list.', 'error')
    } else {
      emailsArray.push(shareEmailValue)
      this.props.noteUpdate(note.uid, note.title, note.content, note.tags, emailsArray)
    }

    return this.setState({
      shareEmailValue: '',
      showTableOfUsers: false
    })
  }

  removeFromSharedList = item => {

    const {note, title, content, tags} = this.state

    const copySharedWith = [...note.sharedWith]

    let newSharedWith = copySharedWith.filter(i => i !== item)

    this.props.noteUpdate(note.uid, title, content, tags, newSharedWith)
  }

  render() {

    const { currentUser } = firebase.auth()

    const {title, content, tags, openEditModal, openDeleteModal, note, shareEmailValue, showTableOfUsers} = this.state

    const {users} = this.props

    if (!note.title) {
      return (
        <div>
          <Header />
          Loading...
        </div>
      )
    }

    return (
      <div>
        <Header />
        <div className = "row post-full">
          <div className="column size_75 float-none centered padding_top_1">
            <div className="row post-main-content">
              <div className="column size_100">
                <h1 className="post-title">
                  {note.title}
                  <span className="edit-delete">
                    <a className="edit-button" onClick={() => this.setState({ openEditModal: true })}>Editovat</a>
                    <a className="icon-wrapper" onClick={() => this.openDeleteModal(note)}>
                      <IconTrash fill="#2DB5CF" />
                    </a>
                  </span>
                </h1>
                <div className="post-content word-break-all">
                  {note.content}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="column size_100 margin-bottom-1">
                <div className="tags">
                  <span className="tags-wrap">
                    {note.tags.map(tag => {
                      return(
                        <Link className="tag" to={ `/tags/${tag}` } key={tag}>
                          <span className="icon-wrapper">
                            <IconTag fill="#2DB5CF" />
                          </span>
                          <span className="tag-wrapper">{tag}
                          </span>
                        </Link>
                      )
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="column size_100">
                <footer className="post-share">
                  <div className="row">
                    <div className="column size_50">
                      <h3 className="head">Sdílet:</h3>
                      <div className="form-wrapper">
                        <form onSubmit={e => this.handleShareFormSubmit(e)}>
                          <input
                            type="email"
                            className="share-input"
                            placeholder="emailová adresa:"
                            value={shareEmailValue}
                            required=""
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                            onChange={e => this.handleShareEmailValue(e)}
                            onFocus={e => this.setState({ showTableOfUsers: true })}
                          />
                          {showTableOfUsers && <ul className="list-of-users">
                            {users.map(user => {
                              if (currentUser.email === user.email) {
                                return ''
                              } else {
                                return <li key={user.uid} onClick={() => this.setState({ shareEmailValue: user.email, showTableOfUsers: false })}>{user.email}</li>
                              }
                            })}
                            <span className="close" onClick={e => this.setState({ showTableOfUsers: false })}>X</span>
                          </ul>}
                          <button className="confirm-button blue">poslat</button>
                        </form>
                      </div>
                    </div>
                    <div className="column size_50">
                      <div className="shared-with">
                        <h3 className="head">Sdíleno s:</h3>
                        <ul>
                          {this.state.note.sharedWith && this.state.note.sharedWith.map(item => {
                            return <li key={item}>{item} <span onClick={() => this.removeFromSharedList(item)}>X</span></li>
                          })}
                        </ul>
                      </div>
                      <ul className="emails-group"></ul>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
        {openEditModal && <Modal
          isOpen={openEditModal}
          contentLabel="Add new note Modal"
          style={customStyles}
        >
          <a className="close-modal" onClick={() => this.setState({openEditModal: false})}>X</a>
          <div className="confirm-text"><h3>Editovat poznámku</h3></div>
          <form onSubmit={this.handleEditNote}>
            <div className="form-group">
              <input type="text" className="form-control" id="title" placeholder="Nadpis" onChange={this.handleTitle} value={title} />
            </div>
            <div className="form-group">
              <textarea className="form-control" id="body" cols="61" rows="8" placeholder="Poznámka" onChange={this.handleContent} value={content}></textarea>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="tags" placeholder="Štítky" onChange={this.handleTags} value={tags} />
            </div>
            <button type="submit" className="confirm-button blue">Editovat poznámku</button>
          </form>
        </Modal>}
        {openDeleteModal && <Modal
          isOpen={openDeleteModal}
          contentLabel="Delete Modal"
          style={customStyles}
        >
          <a className="close-modal" onClick={() => this.setState({openDeleteModal: false, titleOfModal: ''})}>X</a>
          <div className="confirm-text"><h3>{`Opravdu vymazat poznamku ${note.title}?`}</h3></div>
          <div className="confirm-buttons">
            <button className="confirm-button danger" onClick={() => this.onNoteRemove(note)}>Ano</button>
            <button className="confirm-button bare" onClick={() => this.setState({openDeleteModal: false, titleOfModal: ''})}>Ne</button>
          </div>
        </Modal>}
        <NotificationContainer />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {

  // get Array from Firebase response object
  const notes = _.map(state.notes, (val, uid) => {
    return { ...val, uid } // { title: '', content: '', tags: [], id: 'a564dsa654d6as' }
  })

  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid }
  })

  return {
    // note: state.notes[ownProps.match.params.id]
    notes,
    users
  };
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
    left                       : '10%',
    right                      : '10%',
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

export default connect(mapStateToProps, { fetchNotes, noteUpdate, noteDelete, addNotification, fetchUsersEmails })(Note);
