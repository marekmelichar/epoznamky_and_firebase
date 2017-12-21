import React, {Component} from 'react';

import Header from '../header/Header';

import { fetchNotes, noteDelete } from '../../actions';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import _ from 'lodash'

import Modal from 'react-modal';

import IconTrash from '../../components/icons/IconTrash'
import IconTag from '../../components/icons/IconTag'

class TagsList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      openDeleteModal: false,
      titleOfModal: ''
    }
  }

  componentWillMount() {
    this.props.fetchNotes()
  }

  onNoteRemove = (note) => {

    this.props.noteDelete(note.uid, note.title)

    this.setState({ openDeleteModal: false })
  }

  renderTags = (tags) => {
    if ( tags ) {
      return <div className="tags">
        {tags.map((tag) => {
          return <a className="tag" href={ `/tags/${tag}` } key={tag}><span className="icon-wrapper"><IconTag fill="#2DB5CF" /></span><span className="tag-wrapper">{ tag }</span></a>;
        })}
      </div>;
    }
  }

  openDeleteModal = (note) => {

    this.setState({
      openDeleteModal: true,
      note
    })
  }

  renderNotes = () => {

    const {notes} = this.props
    const {id} = this.props.match.params

    let objects = _.filter(notes, function(o) {
      return _.some(o.tags, function(tag) { //some
        return tag === id;
      });
    });

    if ( objects ) {
      return objects.map(note => {
        return (
          <li className="item" key={note.uid}>
            <Link to={`/notes/${note.uid}`}><h3 className="head">{note.title}</h3></Link>
            { this.renderTags(note.tags) }

            <span className="float-right">
              <a onClick={() => this.openDeleteModal(note)} className="icon-wrapper"><IconTrash fill="#2DB5CF" /></a>
            </span>
          </li>
        );
      });

    } else if (!objects) {
      return <div>No posts found.</div>;
    } else {
      return <div>Loading...</div>
    }
  }

  render() {
    return(
      <div>
        <Header />
        <div className="row">
          <div className="column size_75 float-none centered">
              <h1 className="head margin-top-2">Všechny poznámky se štítkem "{this.props.match.params.id}"</h1>
              <ul className="list-of-posts">
                {this.renderNotes()}
              </ul>
          </div>
        </div>
        {this.state.openDeleteModal && <Modal
          isOpen={this.state.openDeleteModal}
          contentLabel="Delete Modal"
          style={customStyles}
        >
          <a className="close-modal" onClick={() => this.setState({openDeleteModal: false, titleOfModal: ''})}>X</a>
          <div className="confirm-text"><h3>{`Opravdu vymazat poznamku ${this.state.note.title}?`}</h3></div>
          <div className="confirm-buttons">
            <button className="confirm-button danger" onClick={() => this.onNoteRemove(this.state.note)}>Ano</button>
            <button className="confirm-button bare" onClick={() => this.setState({openDeleteModal: false, titleOfModal: ''})}>Ne</button>
          </div>
        </Modal>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log('state', state);

  const notes = _.map(state.notes, (val, uid) => {
    return { ...val, uid } // { title: '', content: '', tags: [], id: 'a564dsa654d6as' }
  })

  return {
    // authorized: state.auth.payload
    notes
  };
}

export default connect(mapStateToProps, { fetchNotes, noteDelete })(TagsList)

const customStyles = {
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
    top                        : '20%',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '20%',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px'

  }
}
