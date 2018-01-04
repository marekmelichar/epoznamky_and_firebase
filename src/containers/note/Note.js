import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from 'lodash'

import Modal from 'react-modal';

import { fetchNotes } from '../../actions';

import Header from '../header/Header';
import IconTrash from '../../components/icons/IconTrash'
import IconTag from '../../components/icons/IconTag'
import NotificationContainer from '../notification/Notification';

class Note extends Component {

  constructor (props) {
    super(props);

    this.state = {
      open: false,
      title: '',
      content: '',
      tags: []
    }
  }

  componentWillMount() {
    this.props.fetchNotes()
  }

  handleEditNote = (e) => {
    e.preventDefault()

    console.log(this.state);

    // return(
    //
    // )
  }

  render() {
    const { notes } = this.props;
    const { id } = this.props.match.params;

    const note = _.find(notes, itm => itm.uid === id)

    if (!note) {
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
            <div className="row">
              <div className="column size_100 post-title">
                <h1>
                  {note.title}
                  <span className="edit-delete">
                    <a className="edit-button" onClick={() => this.setState({ open: true })}>Editovat</a>
                    <a className="icon-wrapper">
                      <IconTrash fill="#2DB5CF" />
                    </a>
                  </span>
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="column size_100 margin-bottom-1_5">
                <div className="post-content word-break-all">
                  {note.content}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="column size_100 margin-bottom-1">
                <div className="tags">
                  <span className="heading">
                    <h3 className="head margin-bottom-1">Štítky:</h3>
                  </span>
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
              <div className="column size_100 margin-bottom-1">
                <footer className="post-share">
                  <div className="row">
                    <div className="column size_100">
                      <h3 className="head">Sdílet:</h3>
                      <div className="form-wrapper">
                        <form>
                          <input type="email" className="share-input" placeholder="emailová adresa:" value="" required="" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" />
                          <button className="confirm-button blue">poslat</button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="column size_100">
                      <div className="shared-with">
                        <h3 className="head">Sdíleno s:</h3>
                      </div>
                      <ul className="emails-group"></ul>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.open}
          contentLabel="Add new note Modal"
          style={customStyles}
        >
          <a className="close-modal" onClick={() => this.setState({open: false})}>X</a>
          <div className="confirm-text"><h3>Editovat poznámku</h3></div>
          <form onSubmit={this.handleEditNote}>
            <div className="form-group">
              <input type="text" className="form-control" id="title" placeholder="Nadpis" onChange={this.handleTitle} />
            </div>
            <div className="form-group">
              <textarea className="form-control" id="body" cols="61" rows="8" placeholder="Poznámka" onChange={this.handleContent}></textarea>
            </div>
            <div className="form-group">
              <input type="text" className="form-control" id="tags" placeholder="Štítky" onChange={this.handleTags} />
            </div>
            <button type="submit" className="confirm-button blue">Editovat poznámku</button>
          </form>
        </Modal>
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

  return {
    // note: state.notes[ownProps.match.params.id]
    notes
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

export default connect(mapStateToProps, { fetchNotes })(Note);
